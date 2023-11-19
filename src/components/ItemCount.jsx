import { useState } from 'react';
import { Button, Badge, Box, useToast } from '@chakra-ui/react';

const ItemCount = () => {
  const toast = useToast();
  const [count, setCount] = useState(0);

  const addToCart = () => {
    if (count > 0) {
      toast({
        title: 'Felicitaciones',
        description: `Haz agregado ${count} ${
          count === 1 ? 'unidad' : 'unidades'
        } a tu carrito`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        colorScheme: 'pink',
      });
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
    if (count < 10) {
      setCount(count + 1);
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
    if (count > 0) {
      setCount(count - 1);
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
        {count}
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
