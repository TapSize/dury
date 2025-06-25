import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-rotate'
import MyLocationMarker from './MyLocationMarker'
import MapContextMenu from './MapContextMenu'
import 'leaflet/dist/leaflet.css'

const MainPage = ({ user }) => {
  const [mapStyle, setMapStyle] = useState('dark')
  const [menuVisible, setMenuVisible] = useState(false)
  const [locationMode, setLocationMode] = useState(0)

  // Ссылки на иконки для каждого режима
  const icons = [
    'https://i.ibb.co/jLkbT7D/return-icon.png',       // Режим 0 — свободный
    'https://i.ibb.co/10JRDz8/center-icon.png',       // Режим 1 — центрировать
    'https://i.ibb.co/MPt2mhY/follow-icon.png',       // Режим 2 — слежение
    'https://i.ibb.co/6g6n4ch/follow-rotate-icon.png' // Режим 3 — слежение + поворот
  ]

  const tile = mapStyle === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : mapStyle === 'streets'
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 1000 }}>{user.user_id}</div>
      <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => setMenuVisible(!menuVisible)} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', backgroundImage: "url('https://i.ibb.co/tTSG976d/Map-Change-removebg-preview-1.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
        <button onClick={() => setLocationMode((locationMode + 1) % 4)} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', backgroundImage: `url(${icons[locationMode]})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
      </div>
      <MapContextMenu onSelect={style => { setMapStyle(style); setMenuVisible(false) }} isVisible={menuVisible} />
      <MapContainer center={[49.95, 23.2]} zoom={10} style={{ width: '100%', height: '100%' }}>
        <TileLayer url={tile} attribution="&copy; CARTO" />
        <MyLocationMarker locationMode={locationMode} />
      </MapContainer>
    </div>
  )
}

export default MainPage