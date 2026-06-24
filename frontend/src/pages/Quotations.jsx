import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuotations, deleteQuotation, updateQuotation } from '../services/api'
import { Plus, Trash2, ChevronDown } from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function Quotations() {
  const navigate = useNavigate()
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchQuotations = async () => {
    try {
      const res = await getQuotations()
      setQuotations(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchQuotations()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      try {
        await deleteQuotation(id)
        fetchQuotations()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateQuotation(id, { status })
      fetchQuotations()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all quotation requests and responses.</p>
        </div>
        <button
          onClick={() => navigate('/quotations/add')}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Add Quotation
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : quotations.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-400">No quotations found.</td></tr>
            ) : (
              quotations.map((q) => (
                <tr key={q._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 cursor-pointer hover:text-orange-500 transition-colors"  onClick={() => navigate(`/quotations/${q._id}`)}>{q.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{q.description?.slice(0, 50)}...</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-700">{q.vendor?.vendorName}</p>
                    <p className="text-xs text-gray-400">{q.vendor?.companyName}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    PKR {q.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(q.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q._id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full uppercase cursor-pointer outline-none appearance-none pr-6 ${statusColors[q.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="submitted">Submitted</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <ChevronDown size={10} className="absolute right-1 top-2 pointer-events-none" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {quotations.length} quotation{quotations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Bottom Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: quotations.length, color: 'text-gray-900' },
          { label: 'Pending', value: quotations.filter(q => q.status === 'pending').length, color: 'text-yellow-500' },
          { label: 'Submitted', value: quotations.filter(q => q.status === 'submitted').length, color: 'text-blue-500' },
          { label: 'Approved', value: quotations.filter(q => q.status === 'approved').length, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}