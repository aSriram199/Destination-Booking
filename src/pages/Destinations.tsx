import { useState, useEffect } from 'react';
import { getDestinationsFromFirestore, type Destination } from '../utils/firestore';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinationsFromFirestore();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchDestinations();
  }, []);



  return (
    <div className="min-h-screen text-white relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614088459293-5669fadc3448?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-2 sm:px-4 py-10 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center">Popular Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:scale-105 transition-all duration-300 flex flex-col">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
              />
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{destination.name}</h3>
                <p className="text-gray-300 mb-2 text-sm sm:text-base">{destination.location}</p>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{destination.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{destination.rating}</span>
                    <span className="text-gray-400 ml-2">({destination.reviews})</span>
                  </div>
                  <p className="text-yellow-400 font-bold">${destination.price}/night</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-auto">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                    onClick={() => navigate(`/explore/${destination.id}`)}
                  >
                    Explore
                  </button>
                  <button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                    onClick={() => window.location.href = '/bookingdetails'}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
