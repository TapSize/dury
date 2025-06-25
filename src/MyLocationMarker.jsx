import { useEffect, useState, useMemo } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

const MyLocationMarker = ({ locationMode }) => {
  const map = useMap()
  const [position, setPosition] = useState(null)
  const [heading, setHeading] = useState(0)
  const [deviceHeading, setDeviceHeading] = useState(0)

  // Отслеживаем геолокацию
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

  // Отслеживаем поворот телефона
  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        setDeviceHeading(event.alpha)
      }
    }

    window.addEventListener('deviceorientation', handleOrientation, true)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  // 👉 Вот этот useEffect для кнопки
  useEffect(() => {
    if (locationMode === 1 && position) {
      map.setView(position)
    }

    if (locationMode === 2 && position) {
      map.setView(position, map.getZoom(), {
        animate: true,
        pan: { duration: 1 }
      })
      // Здесь пока не вращаем карту (Leaflet по умолчанию не поддерживает поворот)
    }

    if (locationMode === 0 && position) {
      map.setView(position)
    }
  }, [locationMode, position, map])

  // Создаём иконку
  const myLocationIcon = useMemo(() => {
    return L.divIcon({
      className: 'myMarker_Glow',
      html: `<div style="
        width: 30px;
        height: 30px;
        background: url('https://i.ibb.co/rKb5ctpv/My-Marker-1.png') no-repeat center center;
        background-size: contain;
        transform: rotate(${deviceHeading || heading}deg);
        transition: transform 0.2s ease;
      "></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    })
  }, [heading, deviceHeading])

  return position ? <Marker position={position} icon={myLocationIcon} /> : null
}

export default MyLocationMarker
