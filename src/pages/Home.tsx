import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const location = useLocation();

  // Popular destinations 
  const popularDestinations = [
    {
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Paris, France",
      description: "The City of Light awaits with its iconic Eiffel Tower, world-class museums, and charming cafes. Experience romance, culture, and culinary excellence in the heart of Europe.",
      rating: 4.8,
      price: "From $899"
    },
    {
      image: "https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Tokyo, Japan",
      description: "Where tradition meets innovation. Explore ancient temples, cutting-edge technology, and the world's best sushi. A perfect blend of old and new Japan.",
      rating: 4.7,
      price: "From $1,299"
    },
    {
      image: "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "New York, USA",
      description: "The city that never sleeps. From Times Square to Central Park, Broadway to Brooklyn, experience the energy and diversity of America's most iconic city.",
      rating: 4.6,
      price: "From $699"
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1661878915254-f3163e91d870?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Bali, Indonesia",
      description: "Tropical paradise with pristine beaches, lush rice terraces, and spiritual temples. Perfect for relaxation, adventure, and cultural immersion.",
      rating: 4.9,
      price: "From $599"
    }
  ];

  // Handle hash-based scrolling when navigating from other pages
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  // Auto-rotate destinations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestinationIndex((prev) => 
        prev === popularDestinations.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [popularDestinations.length]);

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1661970131022-714b905f7031?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-screen">
        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Welcome to Destinations Booking
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Discover amazing destinations, book flights, hotels, and create unforgettable memories
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="bg-white/100 text-black px-8 py-3 rounded-xl font-semibold hover:bg-white/80 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                onClick={() => window.location.href = '/destinations'}
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <section id="about" className="py-12 md:py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">About Us</h2>
            <p className="text-white/80 max-w-3xl mx-auto text-base md:text-lg">
              Your trusted partner in creating unforgettable travel experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">✈️</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">10+ Years Experience</h3>
              <p className="text-white/70 text-base md:text-lg">
                With over a decade in the travel industry, we've helped millions of travelers create memories that last a lifetime.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">500+ Destinations</h3>
              <p className="text-white/70 text-base md:text-lg">
                From exotic beaches to bustling cities, we offer access to the world's most incredible destinations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">1M+ Happy Travelers</h3>
              <p className="text-white/70 text-base md:text-lg">
                Join our community of satisfied customers who trust us for their dream vacations.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Destinations Section */}
      <section id="destinations" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Popular Destinations</h2>
            <p className="text-white/80 max-w-3xl mx-auto text-base md:text-lg">
              Discover trending destinations that travelers love
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96">
                <img 
                  src={popularDestinations[currentDestinationIndex].image}
                  alt={popularDestinations[currentDestinationIndex].name}
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                        {popularDestinations[currentDestinationIndex].name}
                      </h3>
                      <p className="text-white/90 mb-3 max-w-2xl text-base md:text-lg">
                        {popularDestinations[currentDestinationIndex].description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <span className="text-yellow-400 text-lg">★</span>
                          <span className="text-white ml-1">{popularDestinations[currentDestinationIndex].rating}</span>
                        </div>
                        <span className="text-white font-semibold">{popularDestinations[currentDestinationIndex].price}</span>
                      </div>
                    </div>
                    <button className="bg-white/100 text-black px-6 py-3 rounded-lg hover:bg-white/80 transition-all duration-300 w-full md:w-auto mt-4 md:mt-0"
                      onClick={() => window.location.href = '/bookingdetails'}
                    >
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {popularDestinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDestinationIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentDestinationIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Special Deals Section */}
      <section id="deals" className="py-12 md:py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Special Deals</h2>
            <p className="text-white/80 max-w-3xl mx-auto text-base md:text-lg">
              Limited time offers to make your dream vacation a reality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold w-fit mb-4">
                40% OFF
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Summer Sale</h3>
              <p className="text-white/70 mb-4 text-base md:text-lg">Book your summer vacation now and save big on flights and hotels!</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-white/60 text-sm">Valid until July 31</span>
                <button className="bg-white/100 text-black px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => window.location.href = '/bookingdetails'}
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold w-fit mb-4">
                25% OFF
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Early Bird Special</h3>
              <p className="text-white/70 mb-4 text-base md:text-lg">Book 6 months in advance and get exclusive discounts on premium destinations.</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-white/60 text-sm">Valid until Dec 31</span>
                <button className="bg-white/100 text-black px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => window.location.href = '/bookingdetails'}
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold w-fit mb-4">
                30% OFF
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Family Package</h3>
              <p className="text-white/70 mb-4 text-base md:text-lg">Special rates for family bookings of 4+ people. Perfect for creating lasting memories.</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <span className="text-white/60 text-sm">Valid until Sep 30</span>
                <button className="bg-white/100 text-black px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => window.location.href = '/bookingdetails'}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Us Section & Footer */}
      <section id="contact" className="py-10 md:py-16 bg-transparent mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-white/80 mb-6 text-base md:text-lg">We'd love to hear from you! Reach out to us for any queries, support, or feedback.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <div>
              <div className="text-white text-base md:text-lg font-semibold">Email</div>
              <a href="mailto:support@travelbooking.com" className="text-blue-400 hover:underline text-sm md:text-base">support@mcu.com</a>
            </div>
            <div>
              <div className="text-white text-base md:text-lg font-semibold">Phone</div>
              <a href="tel:+1234567890" className="text-blue-400 hover:underline text-sm md:text-base">1010101010101</a>
            </div>
            <div>
              <div className="text-white text-base md:text-lg font-semibold">Address</div>
              <span className="text-white/80 text-sm md:text-base">Somewhere in some world</span>
            </div>
          </div>
          <footer className="mt-8 border-t border-white/20 pt-6 text-white/60 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Travel Booking. All rights reserved.
          </footer>
        </div>
      </section>
    </div>
  );
};

export default Home;
