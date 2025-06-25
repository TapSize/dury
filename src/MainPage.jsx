import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import MyLocationMarker from './MyLocationMarker'
import MapContextMenu from './MapContextMenu'
import 'leaflet/dist/leaflet.css'

const MainPage = ({ user }) => {
  const locationIcons = [
  'https://i.ibb.co/jLkbT7D/return-icon.png', // режим 0 — свободный
  'https://i.ibb.co/10JRDz8/center-icon.png', // режим 1 — центрировать
  'https://i.ibb.co/MPt2mhY/follow-icon.png', // режим 2 — слежение
  'https://i.ibb.co/6g6n4ch/follow-rotate-icon.png' // режим 3 — слежение + поворот
]
  const [mapType, setMapType] = useState('dark')
  const [menuVisible, setMenuVisible] = useState(false)
  const [locationMode, setLocationMode] = useState(0)

  const handleMapStyleSelect = (style) => {
    setMapType(style)
    setMenuVisible(false)
  }

  const getTileLayer = () => {
    if (mapType === 'dark') return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    if (mapType === 'streets') return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    if (mapType === 'satellite') return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* User ID в правом верхнем углу */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        color: 'white',
        fontSize: '16px'
      }}>
        {user.user_id}
      </div>

      {/* Кнопки */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Кнопка подложки */}
        <button
          onClick={() => setMenuVisible(!menuVisible)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            backgroundImage: "url('https://i.ibb.co/tTSG976d/Map-Change-removebg-preview-1.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
          title="Підложка карти"
        ></button>

        {/* Кнопка возврата */}
        <button
          onClick={() => setLocationMode((locationMode + 1) % 4)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            backgroundImage: `url(${locationIcons[locationMode]})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
          title="Режим слеження"
        ></button>
      </div>

      {/* Меню подложки */}
      <MapContextMenu onSelect={handleMapStyleSelect} isVisible={menuVisible} />

      {/* Карта */}
      <MapContainer
        center={[49.95, 23.2]}
        zoom={10}
        minZoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url={getTileLayer()} attribution="&copy; CARTO" />
        <MyLocationMarker locationMode={locationMode} />
      </MapContainer>
    </div>
  )
}

export default MainPage
