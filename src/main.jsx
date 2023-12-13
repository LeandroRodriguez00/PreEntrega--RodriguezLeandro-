import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbNR39Frf96GTbHNElhb4qjuohSlUoRyg",
  authDomain: "ladov-store.firebaseapp.com",
  projectId: "ladov-store",
  storageBucket: "ladov-store.appspot.com",
  messagingSenderId: "17319825754",
  appId: "1:17319825754:web:854d3dde3c51d42b096363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
)

