import React from 'react';
import { Box, Button, Heading, List, ListItem, Text, VStack, IconButton, HStack, useToast } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const toast = useToast();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast({
      title: 'Producto eliminado',
      description: 'El producto ha sido eliminado del carrito con éxito.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack align="center" spacing={4} p={4}>
      <Heading size="lg">Carrito de Compras</Heading>
      {cartItems.length === 0 ? (
        <Text>El carrito está vacío.</Text>
      ) : (
        <List spacing={3}>
          {cartItems.map(item => (
            <ListItem key={item.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold">
                {item.nombre} - {item.quantity} x ${item.price}
              </Text>
              <IconButton
                aria-label="Eliminar producto"
                icon={<CloseIcon />}
                onClick={() => handleRemoveFromCart(item.id)}
                colorScheme="red"
              />
            </ListItem>
          ))}
        </List>
      )}
      <Box>
        <Text fontWeight="bold">Total: ${calculateTotal()}</Text>
      </Box>
    </VStack>
  );
};

export default Cart;
