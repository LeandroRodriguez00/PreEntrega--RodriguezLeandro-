import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Spinner } from '@chakra-ui/react';
import ItemCount from './ItemCount';

const ProductDetail = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductosPorCategoria = async () => {
      try {
       
        const response = await fetch('/productos.json');  
        const data = await response.json();

      
        const productosFiltrados = data.productos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());

        setProductos(productosFiltrados);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Error al obtener productos');
        setLoading(false);
      }
    };

    fetchProductosPorCategoria();
  }, [categoria]);

  return (
    <>
      {loading ? (
        <Spinner size="md" thickness="3px" speed="0.55s" emptyColor="gray.200" color="pink.500" />
      ) : error ? (
        <Text color="red.500">Error: {error}</Text>
      ) : (
        <>
          {productos.length === 0 ? (
            <Text>No hay productos en esta categoría.</Text>
          ) : (
            <div>
              {productos.map((producto) => (
                <Box
                  key={producto.id}
                  maxW="400px"
                  mx="auto"
                  mt="4"
                  mb="8"
                  p="4"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="lg"
                >
                  <Text fontSize="xl" fontWeight="bold" color="teal.500" mb="2">
                    {producto.nombre}
                  </Text>
                  <Text fontSize="md" mb="2">
                    Precio: ${producto.precio}
                  </Text>
                  <Text fontSize="md" mb="2">
                    Cantidad disponible: {producto.cantidad}
                  </Text>
                  <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '100%' }} />

                 
                  <ItemCount/>
                </Box>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetail;
