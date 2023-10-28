import React from 'react';
import CartWidget from './CartWidget';
import { Menu, MenuButton, MenuList, MenuItem, Flex, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <div>
      <Flex alignItems="center" justifyContent="space-between" bg="pink.500" p="2" boxShadow="lg">
        <Box p="2">
          <h3 style={{ color: 'white', fontSize: '1.5rem' }}>Brand</h3>
        </Box>

        <Menu>
          <MenuButton as={motion.button} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} p="2" bg="pink.500" color="white">
            <h2 style={{ color: 'white' }}>Categorias</h2>
          </MenuButton>
          <MenuList p="2" bg="pink.500">
            <MenuItem>Remeras</MenuItem>
            <MenuItem>Medias</MenuItem>
            <MenuItem>Gorros</MenuItem>
            <MenuItem>Buzos</MenuItem>
            <MenuItem>Llaveros y stikers</MenuItem>
          </MenuList>
        </Menu>

        <Box p="2" bg="pink.500">
          <CartWidget />
        </Box>
      </Flex>
    </div>
  );
}

export default NavBar;
