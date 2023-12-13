
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Spinner } from '@chakra-ui/react';
import ItemCount from './ItemCount';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const ProductDetail = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductosPorCategoria = async () => {
      const db = getFirestore();
      const categoriaLower = categoria.toLowerCase();

      try {
        const merchandisingCollection = collection(db, 'Merchandising');
        const categoriasQuery = query(
          merchandisingCollection,
          where('categoria', '==', categoriaLower)
        );

        const querySnapshot = await getDocs(categoriasQuery);

        if (querySnapshot.empty) {
          console.log('No hay productos en esta categoría.');
          setLoading(false);
          return;
        }

        const productosFiltrados = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id || data['id '],
            nombre: data.nombre,
            precio: data.precio,
            cantidad: data.cantidad,
            categoria: data.categoria || data['categoria '],
            imagen: data['imagen '] || data['imagen'],
          };
        });

        setProductos(productosFiltrados);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setError(error.message || 'Error al obtener productos');
        setLoading(false);
      }
    };

    fetchProductosPorCategoria();
  }, [categoria]);

  const handleAddToCart = ({ id, nombre, precio, cantidadDisponible, quantity }) => {
    
    console.log(`Agregado al carrito: ${quantity} unidades de ${nombre}`);
  };

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

                  <ItemCount
                    id={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    cantidadDisponible={producto.cantidad}
                    onAddToCart={handleAddToCart}
                  />
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
