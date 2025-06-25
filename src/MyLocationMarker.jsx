// MyLocationMarker.jsx
import { useEffect, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-rotatedmarker'

const MyLocationMarker = ({ locationMode }) => {
  const map = useMap()
  const [pos, setPos] = useState(null)
  const [heading, setHeading] = useState(0)
  const [deviceHeading, setDeviceHeading] = useState(0)
  const [tracking, setTracking] = useState(false)

  useEffect(() => {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(r => {
        if (r !== 'granted') console.warn('Доступ к ориентации не предоставлен')
      })
    }

    const posId = navigator.geolocation.watchPosition(
      pos => {
        const { latitude, longitude, heading } = pos.coords
        const ll = [latitude, longitude]
        setPos(ll)
        if (heading) setHeading(heading)
        if (tracking) map.setView(ll)
      },
      console.error,
      { enableHighAccuracy: true }
    )
    return () => navigator.geolocation.clearWatch(posId)
  }, [map, tracking])

  useEffect(() => {
    const handle = e => {
      if (e.alpha != null) setDeviceHeading(e.alpha)
    }
    window.addEventListener('deviceorientation', handle)
    return () => window.removeEventListener('deviceorientation', handle)
  }, [])

  useEffect(() => {
    if (locationMode === 1 && pos) { map.setView(pos); setTracking(false) }
    if (locationMode === 2 && pos) setTracking(true)
    if (locationMode === 3 && pos) { setTracking(true); map.rotate(map.getBearing ? map.getBearing() : 0) }
    if (locationMode === 0) { setTracking(false); map.rotate(0) }
  }, [locationMode, pos, map])

  if (!pos) return null
  const angle = deviceHeading || heading
  return <Marker position={pos} rotationAngle={angle} rotationOrigin="center center" />
}

export default MyLocationMarker
