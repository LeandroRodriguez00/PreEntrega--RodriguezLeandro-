import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
  IconButton,
  HStack,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import ItemCount from './ItemCount';

const CartItem = ({ item, index, removeFromCart, updateQuantity }) => {
  return (
    <ListItem
      key={index}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Text>{item.name}</Text>
      <HStack>
        <ItemCount
          initial={item.quantity}
          onAddToCart={(quantity) => updateQuantity(index, quantity)}
        />
        <Text>${item.price}</Text>
        <IconButton
          onClick={() => removeFromCart(index)}
          colorScheme="red"
          aria-label="Eliminar"
          icon={<CloseIcon />}
        />
      </HStack>
    </ListItem>
  );
};

const Cart = ({ products }) => {
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();

  const addToCart = ({ productId, quantity }) => {
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd) {
      const newItem = {
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        quantity: quantity,
      };

      setCartItems([...cartItems, newItem]);

      toast({
        title: 'Felicitaciones',
        description: `Haz agregado ${quantity} ${
          quantity === 1 ? 'unidad' : 'unidades'
        } de ${productToAdd.name} a tu carrito`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        colorScheme: 'pink',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Producto no encontrado',
        status: 'error',
        duration: 5000,
        isClosable: true,
        colorScheme: 'red',
      });
    }
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const updateQuantity = (index, newQuantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = newQuantity;
    setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <VStack align="center" spacing={4} p={4}>
      <Heading size="lg">Carrito de Compras</Heading>
      {cartItems.length === 0 ? (
        <Text>El carrito está vacío</Text>
      ) : (
        <List>
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))}
        </List>
      )}
      <Box>
        <Text fontWeight="bold">Total: ${calculateTotal()}</Text>
      </Box>

      {/* Actualizado para pasar la función addToCart */}
      <ItemCount onAddToCart={addToCart} />
    </VStack>
  );
};

export default Cart;
