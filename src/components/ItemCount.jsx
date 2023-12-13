import { useState } from 'react';
import { Button, Badge, Box, useToast } from '@chakra-ui/react';

const ItemCount = ({ id, nombre, precio, cantidadDisponible, onAddToCart }) => {
  const toast = useToast();

  
  const [quantities, setQuantities] = useState({ [id]: 0 });

  const addToCart = () => {
    const count = quantities[id] || 0;
    
    if (count > 0) {
      
      if (onAddToCart) {
        onAddToCart({
          id,
          nombre,
          precio,
          cantidadDisponible,
          quantity: count,
        });
      }

      toast({
        title: 'Felicitaciones',
        description: `Haz agregado ${count} ${
          count === 1 ? 'unidad' : 'unidades'
        } de ${nombre} a tu carrito`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        colorScheme: 'pink',
      });

      
      setQuantities({ ...quantities, [id]: 0 });
    } else {
      toast({
        title: 'Error',
        description: 'La cantidad debe ser mayor que 0',
        status: 'error',
        duration: 5000,
        isClosable: true,
        colorScheme: 'red',
      });
    }
  };

  const incrementCount = () => {
    const count = (quantities[id] || 0) + 1;
    
    if (count <= 10) {
      setQuantities({ ...quantities, [id]: count });
    } else {
      toast({
        title: 'Error',
        description: 'No puedes agregar más de 10 unidades',
        status: 'error',
        duration: 5000,
        isClosable: true,
        colorScheme: 'red',
      });
    }
  };

  const decrementCount = () => {
    const count = (quantities[id] || 0) - 1;
    
    if (count >= 0) {
      setQuantities({ ...quantities, [id]: count });
    } else {
      toast({
        title: 'Error',
        description: 'La cantidad no puede ser negativa',
        status: 'error',
        duration: 5000,
        isClosable: true,
        colorScheme: 'red',
      });
    }
  };

  return (
    <Box position="absolute" top="100px" left="30" p="0">
      <Button colorScheme="pink" variant="outline" onClick={decrementCount}>
        -
      </Button>
      <Badge colorScheme="pink" fontSize="xl" mx="2">
        {quantities[id] !== undefined ? quantities[id] : 0} {}
      </Badge>
      <Button colorScheme="pink" variant="outline" onClick={incrementCount}>
        +
      </Button>
      <Button colorScheme="pink" size="sm" mt="2" onClick={addToCart}>
        Agregar al carrito
      </Button>
    </Box>
  );
};

export default ItemCount;
