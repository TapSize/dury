import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import MapContextMenu from './MapContextMenu'
import MyLocationMarker from './MyLocationMarker'
import 'leaflet/dist/leaflet.css'

const MainPage = ({ user }) => {
  const [mapStyle, setMapStyle] = useState('dark')
  const [menuVisible, setMenuVisible] = useState(false)

  // Ссылки на иконки для каждого режима

  const tile = mapStyle === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : mapStyle === 'streets'
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 1000 }}>{user.user_id}</div>
      <MapContextMenu onSelect={style => { setMapStyle(style); setMenuVisible(false) }} isVisible={menuVisible} />
      <MapContainer center={[49.95, 23.2]} zoom={10} style={{ width: '100%', height: '100%' }}>
        <TileLayer url={tile} attribution="&copy; CARTO" />
        <MyLocationMarker />
      </MapContainer>
    </div>
  )
}

export default MainPage