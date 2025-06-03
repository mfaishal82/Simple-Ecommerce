import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LoadingSpinner from '../components/LoadingSpinner';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/users/1');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="py-8 flex flex-col items-center">
        <LoadingSpinner />
        <p className="text-gray-600 mt-3">Loading profile details...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!profile) {
    return <p className="text-center text-gray-700">Profile not found</p>;
  }  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gray-50 relative z-0">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <div className="w-12 h-12 rounded-full bg-[#BB1724] flex items-center justify-center text-white text-xl font-semibold">
            {profile.name.firstname[0]}{profile.name.lastname[0]}
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#BB1724]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-2">Full Name</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">
                  {profile.name.firstname[0]}
                </span>
                {profile.name.firstname} {profile.name.lastname}
              </p>
            </div>            <div>
              <p className="text-sm text-gray-600 mb-2">Username</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm">@</span>
                {profile.username}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Email</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                {profile.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Phone</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                {profile.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#BB1724]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">            <div>
              <p className="text-sm text-gray-600 mb-2">Street</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                  </svg>
                </span>
                {profile.address.street}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Number</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">#</span>
                {profile.address.number}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">City</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                {profile.address.city}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Zipcode</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v3H5V2zm9 4H6v10h8V6z" clipRule="evenodd" />
                  </svg>
                </span>
                {profile.address.zipcode}
              </p>
            </div>
          </div>
        </div>

        {/* Map Location */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#BB1724]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">Location</h2>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Latitude</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {profile.address.geolocation.lat}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Longitude</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {profile.address.geolocation.long}
                </p>
              </div>
            </div>
          </div>          {/* Leaflet Map */}
          <div className="mt-6 h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-100 relative z-10">
            <MapContainer 
              center={[parseFloat(profile.address.geolocation.lat), parseFloat(profile.address.geolocation.long)]} 
              zoom={14} 
              scrollWheelZoom={true}
              className="h-full w-full relative z-10"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker 
                position={[parseFloat(profile.address.geolocation.lat), parseFloat(profile.address.geolocation.long)]}
              >
                <Popup>
                  <div className="text-center p-3">
                    <div className="w-8 h-8 rounded-full bg-[#BB1724] text-white font-medium flex items-center justify-center mx-auto mb-2">
                      {profile.name.firstname[0]}{profile.name.lastname[0]}
                    </div>
                    <p className="font-medium text-gray-800">{profile.name.firstname} {profile.name.lastname}</p>
                    <p className="text-sm text-gray-600 mt-1">{profile.address.street} {profile.address.number}</p>
                    <p className="text-sm text-gray-600">{profile.address.city}, {profile.address.zipcode}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
