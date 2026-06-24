import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuotation, getVendors } from '../services/api'
import { Plus, X } from 'lucide-react'

export default function AddQuotation() {
  const navigate = useNavigate()
  const [vendors, setVendors] = useState([])
  const [selectedVendors, setSelectedVendors] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'med',
    dueDate: '',
    deliveryTime: '',
    warranty: '',
    advancePayment: '',
    installation: '',
  })
  const [lineItems, setLineItems] = useState([
    { name: '', qty: '', unit: '', price: '' }
  ])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getVendors().then(res => setVendors(res.data))
  }, [])

  const toggleVendor = (vendorId) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { name: '', qty: '', unit: '', price: '' }])
  }

  const updateLineItem = (index, field, value) => {
    const updated = [...lineItems]
    updated[index][field] = value
    setLineItems(updated)
  }

  const removeLineItem = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index))
  }

  const estimatedTotal = lineItems.reduce((sum, item) => {
    return sum + (parseFloat(item.price) || 0) * (parseFloat(item.qty) || 1)
  }, 0)

  const validate = () => {
    const newErrors = {}
    if (!form.title) newErrors.title = 'Title is required'
    if (!form.description) newErrors.description = 'Description is required'
    if (selectedVendors.length === 0) newErrors.vendors = 'Select at least one vendor'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (status = 'pending') => {
    if (!validate()) return
    try {
      for (const vendorId of selectedVendors) {
        await createQuotation({
          title: form.title,
          description: form.description,
          vendor: vendorId,
          amount: estimatedTotal,
          status: status,
          deliveryTime: form.deliveryTime,
          warranty: form.warranty,
          advancePayment: form.advancePayment,
          installation: form.installation,
          lineItems: lineItems.filter(item => item.name),
        })
      }
      navigate('/quotations')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => navigate('/quotations')}>Quotations</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">New RFQ</span>
      </div>

      <div className="flex gap-6 flex-1">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Title + Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 block">
              Request Title
            </label>
            <input
              type="text"
              placeholder="e.g., Annual Server Infrastructure Renewal 2026"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`w-full text-xl font-medium text-gray-700 outline-none border-b pb-2 focus:border-orange-400 transition-colors ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">⚠ {errors.title}</p>}

            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 block mt-6">
              Description & Requirements
            </label>
            <textarea
              placeholder="Detailed technical specifications, delivery requirements, and service level expectations..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-600 ${errors.description ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">⚠ {errors.description}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-orange-500 mb-4">📋 Terms & Conditions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Delivery Time</label>
                <input
                  type="text"
                  placeholder="e.g. Next day delivery"
                  value={form.deliveryTime}
                  onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Warranty</label>
                <input
                  type="text"
                  placeholder="e.g. 3-year warranty"
                  value={form.warranty}
                  onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Advance Payment</label>
                <input
                  type="text"
                  placeholder="e.g. 50% Advance required"
                  value={form.advancePayment}
                  onChange={(e) => setForm({ ...form, advancePayment: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Installation</label>
                <input
                  type="text"
                  placeholder="e.g. Standard Included"
                  value={form.installation}
                  onChange={(e) => setForm({ ...form, installation: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Line Items</h2>
              <button
                onClick={addLineItem}
                className="flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-600"
              >
                <Plus size={14} />
                ADD ITEM
              </button>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-2 text-xs font-semibold text-gray-400 uppercase">Item Name</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 uppercase">QTY</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Unit</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Price (PKR)</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        placeholder="Item name..."
                        value={item.name}
                        onChange={(e) => updateLineItem(index, 'name', e.target.value)}
                        className="w-full text-sm outline-none text-gray-700 placeholder-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        placeholder="0"
                        value={item.qty}
                        onChange={(e) => updateLineItem(index, 'qty', e.target.value)}
                        className="w-16 text-sm outline-none text-gray-700 placeholder-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Units"
                        value={item.unit}
                        onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                        className="w-20 text-sm outline-none text-gray-700 placeholder-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400 text-sm">PKR</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={item.price}
                          onChange={(e) => updateLineItem(index, 'price', e.target.value)}
                          className="w-24 text-sm outline-none text-gray-700 placeholder-gray-300"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {lineItems.length > 1 && (
                        <button onClick={() => removeLineItem(index)} className="text-gray-300 hover:text-red-400">
                          <X size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="cursor-pointer hover:bg-gray-50" onClick={addLineItem}>
                  <td className="px-6 py-3 text-gray-300 text-sm italic" colSpan={5}>
                    Click to add new item...
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end px-6 py-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estimated Total</span>
                <span className="text-lg font-bold text-gray-900">PKR {estimatedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 space-y-4">
          {/* Select Vendors */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Select Target Vendors
            </h3>
            {errors.vendors && <p className="text-xs text-red-500 mb-2">⚠ {errors.vendors}</p>}
            <div className="space-y-2">
              {vendors.map((vendor) => {
                const isSelected = selectedVendors.includes(vendor._id)
                return (
                  <div
                    key={vendor._id}
                    onClick={() => toggleVendor(vendor._id)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      isSelected ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                        isSelected ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vendor.vendorName}</p>
                        <p className="text-xs text-gray-400">{vendor.businessAddress}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Due Date */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              📅 Quote Due Date
            </h3>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Priority Level */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              ❗ Priority Level
            </h3>
            <div className="flex gap-2">
              {['low', 'med', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setForm({ ...form, priority: level })}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase transition-colors ${
                    form.priority === level
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 bg-white rounded-xl border border-gray-200 px-6 py-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          ℹ RFQ will be sent to <span className="font-semibold text-gray-700">{selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''}</span> on submit
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/quotations')}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit('pending')}
            className="px-6 py-2 border border-orange-400 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit('submitted')}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
          >
            Submit RFQ →
          </button>
        </div>
      </div>
    </div>
  )
}