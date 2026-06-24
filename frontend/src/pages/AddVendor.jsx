import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createVendor } from '../services/api'
import { ChevronRight } from 'lucide-react'

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'GL'
}

export default function AddVendor() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    vendorName: '', companyName: '', email: '', contactNumber: '', businessAddress: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.vendorName) newErrors.vendorName = 'Vendor name is required'
    if (!form.companyName) newErrors.companyName = 'Company name is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.contactNumber) newErrors.contactNumber = 'Contact number is required'
    if (!form.businessAddress) newErrors.businessAddress = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    try {
      await createVendor(form)
      navigate('/vendors')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => navigate('/vendors')}>Vendors</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Add New Vendor</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Vendor Profile</h1>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-4">
        {/* Avatar + Vendor Name */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-500">
            {getInitials(form.vendorName || form.companyName)}
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Global Logistics Corp"
              value={form.vendorName}
              onChange={(e) => setForm({ ...form, vendorName: e.target.value })}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.vendorName ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.vendorName && <p className="text-xs text-red-500 mt-1">⚠ {errors.vendorName}</p>}
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-8 pb-8 border-b border-gray-100">
          <h2 className="text-base font-semibold text-orange-500 mb-4 flex items-center gap-2">
            📋 Contact Details
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ahmed Supplies Co"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.companyName ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.companyName && <p className="text-xs text-red-500 mt-1">⚠ {errors.companyName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="contact@vendor.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">⚠ {errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="03001234567"
                value={form.contactNumber}
                onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.contactNumber ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.contactNumber && <p className="text-xs text-red-500 mt-1">⚠ {errors.contactNumber}</p>}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Physical Address</label>
            <textarea
              placeholder="Enter headquarters address..."
              value={form.businessAddress}
              onChange={(e) => setForm({ ...form, businessAddress: e.target.value })}
              rows={3}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none ${errors.businessAddress ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.businessAddress && <p className="text-xs text-red-500 mt-1">⚠ {errors.businessAddress}</p>}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3">
            <span className="text-orange-500 text-xl">🔒</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Data Privacy</p>
              <p className="text-xs text-gray-500 mt-1">This vendor's information will be stored securely in the system.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
            <span className="text-gray-500 text-xl">📄</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Quotation Terms</p>
              <p className="text-xs text-gray-500 mt-1">Vendor can be assigned quotation requests after registration.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-xl border border-gray-200 px-8 py-4 flex items-center justify-between">
        <p className="text-xs text-red-500">* Required fields must be completed before saving.</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/vendors')}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
          >
            💾 Save Vendor
          </button>
        </div>
      </div>
    </div>
  )
}