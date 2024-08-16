import './App.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage/EmployeeDetailsPage';
import AddEmployee from './components/AddEmployee/AddEmployee';
import AddCompany from './components/AddEmployee/AddEmployee';
function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<HomePage />} />
          <Route path="/company/add" element={<AddCompany />} />
          <Route path="/employee" element={<EmployeeDetailsPage />} />
          <Route path="/employee/add" element={<AddEmployee />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
