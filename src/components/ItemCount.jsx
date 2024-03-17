import { useState } from 'react';
import { Button, Badge, Box, useToast } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext'; // Asegúrate de ajustar la ruta al contexto correctamente

const ItemCount = ({ id, nombre, precio, cantidadDisponible }) => {
  const toast = useToast();
  const { addToCart } = useCart(); // Usando el hook personalizado
  const [quantities, setQuantities] = useState({ [id]: 0 });

  const handleAddToCart = () => {
    const count = quantities[id] || 0;
    if (count > 0) {
      addToCart({
        id,
        nombre,
        precio,
        cantidadDisponible,
        quantity: count,
      });

      toast({
        title: 'Felicitaciones',
        description: `Haz agregado ${count} ${count === 1 ? 'unidad' : 'unidades'} de ${nombre} a tu carrito`,
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
    if (count <= 10) setQuantities({ ...quantities, [id]: count });
    else toastError('No puedes agregar más de 10 unidades');
  };

  const decrementCount = () => {
    const count = (quantities[id] || 0) - 1;
    if (count >= 0) setQuantities({ ...quantities, [id]: count });
    else toastError('La cantidad no puede ser negativa');
  };

  // Función auxiliar para mostrar errores con toast
  const toastError = (message) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      colorScheme: 'red',
    });
  };

  return (
    <Box position="absolute" top="100px" left="30" p="0">
      <Button colorScheme="pink" variant="outline" onClick={decrementCount}>-</Button>
      <Badge colorScheme="pink" fontSize="xl" mx="2">{quantities[id] || 0}</Badge>
      <Button colorScheme="pink" variant="outline" onClick={incrementCount}>+</Button>
      <Button colorScheme="pink" size="sm" mt="2" onClick={handleAddToCart}>Agregar al carrito</Button>
    </Box>
  );
};

export default ItemCount;
