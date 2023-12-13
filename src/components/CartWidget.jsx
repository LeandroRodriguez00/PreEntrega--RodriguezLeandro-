import React from 'react';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const CartWidget = () => {
  return (
    <Box
      p={2}
      bg="colon.pink" 
      borderRadius="md"
      boxShadow="sm"
      maxW="sm"
      mx="auto"
      textAlign="center"
    >
      <Flex align="center" justify="center">
        <AiOutlineShoppingCart size={18} color="white" />
        <Text fontSize="sm" fontWeight="bold" color="white" ml={1}>
          Carrito
        </Text>
      </Flex>
      <Flex justify="center" align="center" mt={1}>
        <Badge colorScheme="red" fontSize="0.8em">
          5
        </Badge>
      </Flex>
    </Box>
  );
};

export default CartWidget;
