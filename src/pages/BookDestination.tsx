import  { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { addBookingToFirestore, getDestinationsFromFirestore } from '../utils/firestore';
import Navbar from '../components/navbar';

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  adults: number;
  children: number;
  accommodation: string;
  roomType: string;
  budget: string;
  promo: string;
  specialRequests: string;
  newsletter: boolean;
  agree: boolean;
  selectedDates?: string[];
};

const BookDestination = () => {
  const auth = getAuth();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, control } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      adults: 2,
      children: 0,
      accommodation: "Hotel",
      roomType: "Double",
      budget: "",
      promo: "",
      specialRequests: "",
      newsletter: false,
      agree: false,
    }
  });

  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();
  const [openPopover, setOpenPopover] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setValue("selectedDates", selectedDates ? selectedDates.map(d => d.toISOString()) : []);
  }, [selectedDates, setValue]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await getDestinationsFromFirestore();
      setDestinations(data.map((d) => d.location));
    };
    fetchDestinations();
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.email) {
        setValue("email", user.email);
      }
    });

    return () => unsubscribe();
  }, [auth, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitError(null);
    setIsSubmittingBooking(true);
    
    // Ensure the booking is associated with the current authenticated user
    if (!currentUser?.email) {
      setSubmitError('You must be logged in to make a booking.');
      setIsSubmittingBooking(false);
      return;
    }

    const niceDates = selectedDates ? selectedDates.map(d => d.toLocaleDateString()) : [];
    const payload = {
      ...data,
      email: currentUser.email, // Ensure we use the authenticated user's email
      travelDates: niceDates,
      userId: currentUser.uid, // Add user ID for additional security
    };
    
    try {
      const bookingId = await addBookingToFirestore(payload);
      console.log('Booking created successfully with ID:', bookingId);
      setBookingSuccess(true);
      setSubmitError(null);
      // Reset form after successful booking
      setTimeout(() => {
        window.location.href = '/bookings';
      }, 2000);
    } catch (err) {
      console.error('Booking error:', err);
      setSubmitError('Failed to book. Please try again.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const selectedDatesLabel = () => {
    if (!selectedDates || selectedDates.length === 0) return "Select travel dates";
    if (selectedDates.length === 1) return selectedDates[0].toLocaleDateString();
    return selectedDates.map(d => d.toLocaleDateString()).join(", ");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1661970131022-714b905f7031?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg mt-24">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Book Destination</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {submitError && <div className="text-red-600 text-sm mb-2">{submitError}</div>}
          {bookingSuccess && <div className="text-green-600 text-sm mb-2">✅ Booking created successfully! Redirecting to bookings page...</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Full name</Label>
              <Input placeholder="Jane Doe" {...register("fullName", { required: "Full name is required" })} />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <Label className="mb-1">Email</Label>
              <Input 
                type="email" 
                placeholder="you@example.com" 
                {...register("email", { required: "Email is required" })} 
                readOnly 
                className="bg-gray-100"
                value={currentUser?.email || ""}
              />
              <p className="text-gray-500 text-xs mt-1">Email will be automatically filled from your account</p>
            </div>

            <div>
              <Label className="mb-1">Phone</Label>
              <Input placeholder="+1 555 555 555" {...register("phone", { required: "Phone is required" })} />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <Label className="mb-1">Destination</Label>
              <Select {...register("destination") }>
                <SelectTrigger aria-label="Destination select">
                  <SelectValue placeholder="Choose a destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-1">Adults</Label>
              <Input type="number" min={1} {...register("adults", { valueAsNumber: true })} />
            </div>

            <div>
              <Label className="mb-1">Children</Label>
              <Input type="number" min={0} {...register("children", { valueAsNumber: true })} />
            </div>

            <div>
              <Label className="mb-1">Accommodation</Label>
              <Select {...register("accommodation") }>
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Hostel">Hostel</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="B&B">B&amp;B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label className="mb-1">Room type</Label>
              <Select {...register("roomType") }>
                <SelectTrigger>
                  <SelectValue placeholder="Room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Twin">Twin</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1">Budget (per person)</Label>
              <Input placeholder="e.g. 1000" {...register("budget")} />
            </div>

            <div>
              <Label className="mb-1">Promo code</Label>
              <Input placeholder="SAVE20" {...register("promo")} />
            </div>
          </div>

          {/* Travel dates with shadcn Calendar in a popover */}
          <div>
            <Label className="mb-2">Travel dates</Label>
            <div className="flex items-center gap-3">
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="truncate">{selectedDatesLabel()}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" className="w-auto p-2">
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={setSelectedDates}
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" {...register("selectedDates")} />
            </div>
          </div>

          <div>
            <Label className="mb-1">Special requests</Label>
            <Textarea placeholder="Any accessibility needs, food preferences, celebration requests, etc." {...register("specialRequests")} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="newsletter"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="newsletter" className="mb-0">Send me travel tips & deals</Label>
            </div>

            <div className="flex items-center gap-3">
              <Controller
                name="agree"
                control={control}
                rules={{ required: "You must agree to the terms" }}
                render={({ field }) => (
                  <Checkbox
                    id="agree"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="agree" className="mb-0">I agree to the terms & conditions</Label>
            </div>
          </div>
          {errors.agree && <p className="text-red-600 text-sm">{errors.agree.message}</p>}

          <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
            <div>
              <Button type="submit" disabled={isSubmitting || isSubmittingBooking} className="w-full sm:w-auto">{isSubmittingBooking ? "Booking..." : isSubmitting ? "Submitting..." : "Book now"}</Button>
            </div>

            <div className="text-sm text-muted-foreground mt-2 sm:mt-0">You will receive a confirmation email after booking.</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDestination;