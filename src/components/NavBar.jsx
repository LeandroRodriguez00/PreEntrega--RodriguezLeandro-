import React from 'react';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, Flex, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <div>
      <Flex alignItems="center" justifyContent="space-between" bg="pink.500" p="2" boxShadow="lg">
        <Box p="2">
          <Link to="/">
            <h3 style={{ color: 'white', fontSize: '1.5rem' }}>Lado V</h3>
          </Link>
        </Box>

        <Menu>
          <MenuButton as={motion.button} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} p="2" bg="pink.500" color="white">
            <h2 style={{ color: 'white' }}>Categorias</h2>
          </MenuButton>
          <MenuList p="2" bg="pink.500">
            <Link to="/productos/remeras">
              <MenuItem>Remeras</MenuItem>
            </Link>
            <Link to="/productos/medias">
              <MenuItem>Medias</MenuItem>
            </Link>
            <Link to="/productos/gorros">
              <MenuItem>Gorros</MenuItem>
            </Link>
            <Link to="/productos/buzos">
              <MenuItem>Buzos</MenuItem>
            </Link>
            <Link to="/productos/llaveros-y-stickers">
              <MenuItem>Llaveros-y-Stickers</MenuItem>
            </Link>
          </MenuList>
        </Menu>

        <Box p="2" bg="pink.500">
          <Link to="/Cart">
            <CartWidget />
          </Link>
        </Box>
      </Flex>
    </div>
  );
}

export default NavBar;
