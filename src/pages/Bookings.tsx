import { useEffect, useState } from 'react';
import { getBookingsFromFirestore, deleteBookingFromFirestore } from '../utils/firestore';
import Navbar from '../components/navbar';

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsFromFirestore();
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings.');
      } 
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteBookingFromFirestore(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError('Failed to delete booking.');
    } finally {
      setDeletingId(null);
    }
  };



  if (error) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-2 sm:px-4 py-10 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center">My Bookings</h1>
        <div className="max-w-4xl mx-auto">
          {bookings.length === 0 ? (
            <div className="text-center text-base sm:text-xl text-white/80">No bookings found.</div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 mb-4 sm:mb-6 hover:scale-105 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">{booking.destination}</h3>
                    <p className="text-black text-sm sm:text-base">Booking ID: {booking.id}</p>
                    <p className="text-black text-sm sm:text-base">Name: {booking.fullName}</p>
                    <p className="text-black text-sm sm:text-base">Email: {booking.email}</p>
                    <p className="text-black text-sm sm:text-base">Date: {booking.travelDates ? `${booking.travelDates[0]} - ${booking.travelDates[1]}` : ''}</p>
                    <p className="text-black text-sm sm:text-base">Type: {booking.roomType}</p>
                  </div>
                  <div className="text-right flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
                      onClick={() => handleDelete(booking.id)}
                      disabled={deletingId === booking.id}
                    >
                      {deletingId === booking.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
