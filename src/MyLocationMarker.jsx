import { useEffect, useState, useMemo } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

const MyLocationMarker = () => {
  const map = useMap()
  const [position, setPosition] = useState(null)
  const [heading, setHeading] = useState(0)

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Геолокація не підтримується')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, heading } = pos.coords
        const latlng = [latitude, longitude]
        setPosition(latlng)
        map.setView(latlng)

        if (heading !== null && !isNaN(heading)) {
          setHeading(heading)
        }
      },
      (err) => {
        console.error('Помилка геолокації:', err.message)
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [map])

  // Создаём иконку с поворотом через useMemo
  const myLocationIcon = useMemo(() => {
    return L.divIcon({
      className: 'myMarker_Glow',
      html: `<div style="
        width: 30px;
        height: 30px;
        background: url('https://i.ibb.co/fV5ff57z/My-Marker-1.png') no-repeat center center;
        background-size: contain;
        transform: rotate(${heading}deg);
        transition: transform 0.2s ease;
      "></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    })
  }, [heading])

  return position ? <Marker position={position} icon={myLocationIcon} /> : null
}

export default MyLocationMarker
