import React from 'react'

const ItemListContainer = ({greeting}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
      <h2 style={{ textAlign: 'center' }}>{greeting}</h2>
    </div>
  )
}

export default ItemListContainer