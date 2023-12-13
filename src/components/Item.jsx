
import React, {useContext} from 'react';
import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Item = ({ producto }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      m="2"
      maxW="sm"
      transition="transform 0.3s"
      _hover={{ transform: 'scale(1.05)' }}
      bg="white"
      boxShadow="lg"
    >
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        w="100%"
        h="200px"
        objectFit="cover"
        borderTopRadius="lg"
      />
      <Box p="4">
        <Heading as="h3" size="md" color="pink.500">
          {producto.nombre}
        </Heading>
        <Text fontSize="md" mt="2">
          Precio: ${producto.precio.toFixed(2)}
        </Text>
        <Link to={`/producto/${producto.id}`}>
          <Button colorScheme="pink" mt="2">
            Ver Detalle
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Item;