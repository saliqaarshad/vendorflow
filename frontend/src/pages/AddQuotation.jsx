import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuotation, getVendors } from '../services/api'
import { ChevronRight } from 'lucide-react'

export default function AddQuotation() {
  const navigate = useNavigate()
  const [vendors, setVendors] = useState([])
  const [form, setForm] = useState({
    title: '', description: '', vendor: '', amount: '', status: 'pending'
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getVendors().then(res => setVendors(res.data))
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!form.title) newErrors.title = 'Title is required'
    if (!form.description) newErrors.description = 'Description is required'
    if (!form.vendor) newErrors.vendor = 'Please select a vendor'
    if (!form.amount) newErrors.amount = 'Amount is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    try {
      await createQuotation(form)
      navigate('/quotations')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => navigate('/quotations')}>Quotations</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Add New Quotation</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Quotation Request</h1>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-4">

        {/* Title */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Quotation Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Office Chairs Required"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">⚠ {errors.title}</p>}
        </div>

        {/* Quotation Details */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-orange-500 mb-4">📋 Quotation Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Describe what you need..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">⚠ {errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Assign Vendor <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.vendor}
                  onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.vendor ? 'border-red-400' : 'border-gray-200'}`}
                >
                  <option value="">Select a vendor...</option>
                  {vendors.map(v => (
                    <option key={v._id} value={v._id}>{v.vendorName} — {v.companyName}</option>
                  ))}
                </select>
                {errors.vendor && <p className="text-xs text-red-500 mt-1">⚠ {errors.vendor}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Quotation Amount (PKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 ${errors.amount ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.amount && <p className="text-xs text-red-500 mt-1">⚠ {errors.amount}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Initial Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3">
            <span className="text-orange-500 text-xl">📊</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Quotation Tracking</p>
              <p className="text-xs text-gray-500 mt-1">Track the status of this quotation from pending to approved.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
            <span className="text-gray-500 text-xl">🔔</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Vendor Notification</p>
              <p className="text-xs text-gray-500 mt-1">The assigned vendor will be linked to this quotation request.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-xl border border-gray-200 px-8 py-4 flex items-center justify-between">
        <p className="text-xs text-red-500">* Required fields must be completed before saving.</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/quotations')}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
          >
            💾 Save Quotation
          </button>
        </div>
      </div>
    </div>
  )
}