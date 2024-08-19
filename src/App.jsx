import './App.scss'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import AddEmployee from './components/AddEmployee/AddEmployee';
import AddCompany from './components/AddCompany/AddCompany';
import GenerateProposal from './components/GenerateProposal/GenerateProposal';
import { createTheme, Loader } from '@mantine/core';
import { RingLoader } from './utility/RingLoader';
import CompanyProfile from './pages/CompanyProfile/CompanyProfile';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});

function App() {

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<HomePage />} />
          <Route path="/login" element={<HomePage />} />
          <Route path="/companyProfile/addCompany" element={<AddCompany />} />
          <Route path="/companyProfile/editCompany/:company_id" element={<AddCompany />} />
          <Route path="/companyProfile" element={<CompanyProfile />} />
          <Route path="/companyProfile/addEmployee/:company_id" element={<AddEmployee />} />
          <Route path="/companyProfile/:company_id/edit/:employee_id" element={<AddEmployee />} />
          <Route path="/generate" element={<GenerateProposal />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
