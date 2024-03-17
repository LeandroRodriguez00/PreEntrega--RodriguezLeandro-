import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Spinner } from '@chakra-ui/react';
import ItemCount from './ItemCount';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useCart } from '../contexts/CartContext';


function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const productRef = doc(db, 'Merchandising', id);

      try {
        const docSnapshot = await getDoc(productRef);

        if (docSnapshot.exists()) {
          setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          throw new Error(`No se encontró un producto con ID ${id}`);
        }
      } catch (error) {
        console.error('Error al cargar productos desde Firebase:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleAddToCart = () => {
    
    if (product) {
      
      console.log(`Agregado al carrito: ${selectedQuantity} unidades de ${product.nombre}`);
      
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          cantidadDisponible: product.cantidad,
          quantity: selectedQuantity,
        },
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="4" p="4" borderWidth="1px" borderRadius="lg">
      {!product ? (
        <Spinner size="md" thickness="3px" speed="0.55s" emptyColor="gray.200" color="pink.500" />
      ) : (
        <>
          <Heading as="h2" mb="2" fontSize="xl" fontWeight="bold" color="teal.500">
            {product.nombre}
          </Heading>
          <Image src={product.imagen} alt={product.nombre} borderRadius="md" mb="2" boxShadow="md" />
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
      <ItemCount onCountChange={handleQuantityChange} />
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </Box>
  );
}

export default ItemDetailContainer;
