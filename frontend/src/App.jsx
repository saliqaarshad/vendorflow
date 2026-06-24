import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Vendors from './pages/Vendors'
import Quotations from './pages/Quotations'
import Compare from './pages/Compare'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="quotations" element={<Quotations />} />
        <Route path="compare" element={<Compare />} />
      </Route>
    </Routes>
  )
}

export default App