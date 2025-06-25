// MyLocationMarker.jsx
import { useEffect, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-rotatedmarker'

const MyLocationMarker = ({ locationMode }) => {
  const map = useMap()
  const [pos, setPos] = useState(null)

  useEffect(() => {

    const posId = navigator.geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        const ll = [latitude, longitude]
        setPos(ll)
      },
      console.error,
      { enableHighAccuracy: true }
    )
    return () => navigator.geolocation.clearWatch(posId)
  }, [map, tracking])

  if (!pos) return null
  const angle = deviceHeading || heading
  return <Marker position={pos} rotationAngle={angle} rotationOrigin="center center" />
}

export default MyLocationMarker
