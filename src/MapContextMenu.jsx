import { useState, useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

const MyLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Геолокація не підтримується вашим браузером');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(newPosition);
        map.setView(newPosition); // Центруем карту за маркером
      },
      (err) => {
        console.error('Помилка при отриманні геолокації', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map]);

  if (!position) return null;

  const customIcon = L.icon({
    iconUrl: 'https://i.ibb.co/Q77Vy011/MyMarker.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return <Marker position={position} icon={customIcon} />;
};

export default MyLocationMarker;
