// ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import Item from './Item';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./public/productos.json');

        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON.');
        }

        const data = await response.json();

        if (Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          throw new Error('Los datos cargados no contienen un array de productos.');
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerDetalle = (producto) => {
    // Puedes agregar lógica adicional aquí si es necesario.
    console.log('Ver detalle de producto:', producto);
  };

  return (
    <Box p="4">
      <Heading as="h2" size="xl" mb="4" color="pink.500">
        Lista de Productos
      </Heading>
      {loading ? (
        <Spinner size="xl" color="pink.500" />
      ) : (
        <Box display="flex" flexWrap="wrap">
          {productos.map((producto) => (
            <Item key={producto.id} producto={producto} onVerDetalle={handleVerDetalle} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ItemListContainer;