import './App.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
