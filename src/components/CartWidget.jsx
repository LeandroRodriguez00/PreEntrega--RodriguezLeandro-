import React from 'react'
import { Badge } from '@chakra-ui/react'
const CartWidget = () => {
  return (
    <div>
      <h5 style={{ color: 'white' }}>Carrito</h5>
      <Badge colorScheme='red'>5</Badge>
    </div>
  )
}

export default CartWidget