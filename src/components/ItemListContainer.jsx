import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import Item from './Item';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();

      try {
        const querySnapshot = await getDocs(collection(db, 'Merchandising'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos desde Firebase:', error);
        setError(error.message || 'Error al cargar productos desde Firebase');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerDetalle = (producto) => {
    console.log('Ver detalle de producto:', producto);
    
  };

  return (
    <Box p="4">
      <Heading as="h2" size="xl" mb="4" color="pink.500">
        Lista de Productos
      </Heading>
      {loading ? (
        <Spinner size="xl" color="pink.500" />
      ) : error ? (
        <Box color="red.500">{error}</Box>
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
