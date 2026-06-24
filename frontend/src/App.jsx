import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Vendors from './pages/Vendors'
import Quotations from './pages/Quotations'
import Compare from './pages/Compare'
import AddVendor from './pages/AddVendor'
import VendorDetail from './pages/VendorDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="vendors/add" element={<AddVendor />} />
        <Route path="vendors/:id" element={<VendorDetail />} />
        <Route path="quotations" element={<Quotations />} />
        <Route path="compare" element={<Compare />} />
      </Route>
    </Routes>
  )
}

export default App