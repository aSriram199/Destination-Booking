import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestinationById, type Destination } from '../utils/firestore';
import Navbar from '../components/navbar';

const Explore = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) {
        setError('No destination ID provided.');
        setLoading(false);
        return;
      }
      try {
        const data = await getDestinationById(id);
        if (!data) {
          setError('Destination not found.');
        } else {
          setDestination(data);
        }
      } catch (err) {
        setError('Error fetching destination details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]);

  const handleImageClick = (img: string) => {
    setModalImage(img);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div>Loading destination details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div>{error}</div>
      </div>
    );
  }

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white relative" style={{ backgroundImage: `url('${destination.image}')` }}>
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-2 sm:px-4 py-10 md:py-32 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="w-full md:w-1/2 bg-black/60 rounded-2xl p-4 sm:p-8 backdrop-blur-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{destination.name}</h1>
          <p className="text-base sm:text-lg mb-2 text-purple-200">{destination.location}</p>
          <div className="flex items-center gap-2 sm:gap-4 mb-4">
            <span className="text-yellow-400 text-xl sm:text-2xl">★</span>
            <span className="text-lg sm:text-xl">{destination.rating}</span>
            <span className="text-gray-300 text-sm sm:text-base">({destination.reviews} reviews)</span>
          </div>
          <p className="mb-6 text-white/90 text-base sm:text-lg">{destination.description}</p>
          <div className="mb-4">
            <span className="font-semibold">Price: </span>
            <span className="text-yellow-400 text-lg sm:text-xl font-bold">${destination.price}/night</span>
          </div>
          {destination.amenities && destination.amenities.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Amenities:</span>
              <ul className="list-disc list-inside ml-4">
                {destination.amenities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {destination.activities && destination.activities.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Activities:</span>
              <ul className="list-disc list-inside ml-4">
                {destination.activities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Book Now Button (moved inside card) */}
          <div className="w-full flex justify-center mt-8">
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg text-base sm:text-lg w-full sm:w-auto"
              onClick={() => navigate('/bookingdetails')}
            >
              Book Now
            </button>
          </div>
        </div>
        {destination.location_images && destination.location_images.length > 0 && (
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destination.location_images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Location ${i + 1}`}
                className="rounded-xl object-cover w-full h-56 sm:h-72 md:h-80 border border-white/20 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        )}
      </div>
      {/* Modal for image preview */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-2"
          onClick={handleCloseModal}
        >
          <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={modalImage}
              alt="Preview"
              className="w-full h-64 sm:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
            <button
              className="absolute top-2 right-2 bg-transparent text-white rounded-full p-2 hover:bg-cyan-500 transition"
              onClick={handleCloseModal}
              aria-label="Close preview"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
