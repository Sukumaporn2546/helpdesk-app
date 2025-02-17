import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import HomePage from './pages/HomePage'
import CreateTicket from './pages/CreateTicket'
import Navbar from './components/Navbar'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Box w="100vw" minH="100vh" bg="#f5eef9">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTicket />} />
      </Routes>
    </Box>
  );
}

export default App
