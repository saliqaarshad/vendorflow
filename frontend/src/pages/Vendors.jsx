import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getVendors, updateVendor, deleteVendor } from '../services/api'
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react'

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'V'
}

const getAvatarColor = (name) => {
  const colors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700']
  const index = name?.charCodeAt(0) % colors.length || 0
  return colors[index]
}

export default function Vendors() {
  const navigate = useNavigate()
  const [vendors, setVendors] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVendor, setEditingVendor] = useState(null)
  const [form, setForm] = useState({
    vendorName: '', companyName: '', email: '', contactNumber: '', businessAddress: ''
  })

  const fetchVendors = async () => {
    try {
      const res = await getVendors(search)
      setVendors(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [search])

  const openEditModal = (vendor) => {
    setEditingVendor(vendor)
    setForm({
      vendorName: vendor.vendorName,
      companyName: vendor.companyName,
      email: vendor.email,
      contactNumber: vendor.contactNumber,
      businessAddress: vendor.businessAddress
    })
    setShowModal(true)
  }

  const handleUpdate = async () => {
    try {
      await updateVendor(editingVendor._id, form)
      setShowModal(false)
      fetchVendors()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteVendor(id)
        fetchVendors()
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-sm text-gray-500 mt-1">Manage third-party relationships and vendor information.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300 w-72"
            />
          </div>
          <button
            onClick={() => navigate('/vendors/add')}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Add New Vendor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Address</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : vendors.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-400">No vendors found.</td></tr>
            ) : (
              vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${getAvatarColor(vendor.vendorName)}`}>
                        {getInitials(vendor.vendorName)}
                      </div>
                      <div>
                        <p
                          className="font-medium text-gray-900 cursor-pointer hover:text-orange-500 transition-colors"
                          onClick={() => navigate(`/vendors/${vendor._id}`)}
                        >
                          {vendor.vendorName}
                        </p>
                        <p className="text-xs text-gray-500">{vendor.companyName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{vendor.email}</td>
                  <td className="px-6 py-4 text-gray-600">{vendor.contactNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{vendor.businessAddress}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(vendor)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(vendor._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Bottom Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Total Vendors</p>
          <p className="text-3xl font-bold text-gray-900">{vendors.length}</p>
          <p className="text-xs text-gray-400 mt-1">Registered in system</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Search Results</p>
          <p className="text-3xl font-bold text-gray-900">{vendors.length}</p>
          <p className="text-xs text-gray-400 mt-1">{search ? `For "${search}"` : 'All vendors'}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Last Updated</p>
          <p className="text-lg font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
          <p className="text-xs text-gray-400 mt-1">Today</p>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Edit Vendor</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Vendor Name', key: 'vendorName', placeholder: 'Ali Ahmed' },
                { label: 'Company Name', key: 'companyName', placeholder: 'Ahmed Supplies Co' },
                { label: 'Email', key: 'email', placeholder: 'ali@example.com' },
                { label: 'Contact Number', key: 'contactNumber', placeholder: '03001234567' },
                { label: 'Business Address', key: 'businessAddress', placeholder: 'Blue Area, Islamabad' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800"
              >
                Update Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}