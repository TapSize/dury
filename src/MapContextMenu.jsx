import React from 'react'

const MapContextMenu = ({ onSelect, isVisible }) => {
  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '70px',
        left: '80px',
        background: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0',
        zIndex: 1100,
        minWidth: '160px'
      }}
    >
      <button
        onClick={() => onSelect('dark')}
        style={{
          background: 'none',
          border: 'none',
          padding: '10px',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        Темна
      </button>
      <button
        onClick={() => onSelect('streets')}
        style={{
          background: 'none',
          border: 'none',
          padding: '10px',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        Вулиці
      </button>
      <button
        onClick={() => onSelect('satellite')}
        style={{
          background: 'none',
          border: 'none',
          padding: '10px',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        Супутник
      </button>
    </div>
  )
}

export default MapContextMenu
