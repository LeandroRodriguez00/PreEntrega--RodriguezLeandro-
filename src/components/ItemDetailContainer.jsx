import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Spinner } from '@chakra-ui/react';
import ItemCount from './ItemCount';

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/productos.json');

        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON.');
        }

        const data = await response.json();

        if (Array.isArray(data.productos)) {
          const selectedProduct = data.productos.find((product) => product.id === parseInt(id, 10));

          if (selectedProduct) {
            setProduct(selectedProduct);
          } else {
            throw new Error(`No se encontró un producto con ID ${id}`);
          }
        } else {
          throw new Error('Los datos cargados no contienen un array de productos.');
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="4"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      // Eliminar las propiedades relacionadas con la animación
    >
      {!product ? (
        <Spinner size="md" thickness="3px" speed="0.55s" emptyColor="gray.200" color="pink.500" />
      ) : (
        <>
          <Heading as="h2" mb="2" fontSize="xl" fontWeight="bold" color="teal.500">
            {product.nombre}
          </Heading>
          <Image
            src={product.imagen}
            alt={product.nombre}
            borderRadius="md"
            mb="2"
            boxShadow="md"
          />
          <Box>
            <Text fontSize="sm" mb="1" color="gray.700">
              <strong>Precio:</strong> ${product.precio.toFixed(2)}
            </Text>
            <Text fontSize="sm" mb="1" color="gray.700">
              <strong>Cantidad:</strong> {product.cantidad}
            </Text>
            <Text fontSize="sm" mb="1" color="gray.700">
              <strong>Categoría:</strong> {product.categoria}
            </Text>
          </Box>
        </>
      )}
      <ItemCount />
    </Box>
  );
}

export default ItemDetailContainer;
