import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuotation, updateQuotation, compareQuotations } from '../services/api'
import { ChevronRight, Trophy } from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const priorityColors = {
  low: 'text-green-500',
  med: 'text-orange-500',
  high: 'text-red-500',
}

export default function QuotationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quotation, setQuotation] = useState(null)
  const [relatedQuotations, setRelatedQuotations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await getQuotation(id)
      setQuotation(res.data)
      const related = await compareQuotations(res.data.title)
      setRelatedQuotations(related.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleStatusUpdate = async (status) => {
    try {
      await updateQuotation(id, { status })
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>
  if (!quotation) return <div className="text-center py-10 text-gray-400">Quotation not found.</div>

  const lowestAmount = relatedQuotations.length > 0
    ? Math.min(...relatedQuotations.map(q => q.amount))
    : null

  const statuses = ['pending', 'submitted', 'approved', 'rejected']

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => navigate('/quotations')}>Quotations</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{quotation.title}</span>
      </div>

      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Main Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{quotation.title}</h1>
                <p className="text-sm text-gray-500">{quotation.description}</p>
              </div>
              <div className="text-right ml-6">
                <p className="text-xs text-gray-400 uppercase font-semibold">Submission Date</p>
                <p className="text-base font-bold text-gray-900 mt-1">
                  {new Date(quotation.submissionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Amount</p>
                <p className="text-sm font-bold text-gray-900">PKR {quotation.amount?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Status</p>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${statusColors[quotation.status]}`}>
                  {quotation.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Vendor</p>
                <p className="text-sm font-medium text-gray-900">{quotation.vendor?.vendorName}</p>
                <p className="text-xs text-gray-400">{quotation.vendor?.companyName}</p>
              </div>
            </div>
          </div>

          {/* Vendor Responses */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                Vendor Responses ({relatedQuotations.length})
              </h2>
              <button
                onClick={() => navigate(`/compare?title=${quotation.title}`)}
                className="text-xs font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1"
              >
                Open Comparison View →
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {relatedQuotations
                .sort((a, b) => a.amount - b.amount)
                .map((q) => {
                  const isLowest = q.amount === lowestAmount
                  return (
                    <div
                      key={q._id}
                      className={`flex items-center justify-between px-6 py-4 ${isLowest ? 'bg-green-50' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                          {q.vendor?.vendorName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900">{q.vendor?.vendorName}</p>
                            {isLowest && <Trophy size={14} className="text-yellow-500" />}
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase ${statusColors[q.status]}`}>
                            {q.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-semibold">Quoted Amount</p>
                        <p className={`text-lg font-bold mt-0.5 ${isLowest ? 'text-green-600' : 'text-gray-900'}`}>
                          PKR {q.amount?.toLocaleString()}
                        </p>
                        {isLowest && <p className="text-xs text-green-500 font-semibold">LOWEST BID</p>}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <span className="text-green-500 text-xs">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Quotation Created</p>
                  <p className="text-xs text-gray-400">{new Date(quotation.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <span className="text-blue-500 text-xs">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-xs text-gray-400">{new Date(quotation.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              {quotation.status === 'approved' && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quotation Approved</p>
                    <p className="text-xs text-gray-400">Status marked as approved</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 space-y-4">
          {/* Update Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Update RFQ Status</h3>
            <div className="space-y-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm font-semibold uppercase transition-colors ${
                    quotation.status === status
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {status}
                  {quotation.status === status && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metadata */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick Metadata</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Vendor Email</p>
                <p className="text-xs font-medium text-gray-700">{quotation.vendor?.email}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Total Bids</p>
                <p className="text-xs font-medium text-gray-700">{relatedQuotations.length}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Lowest Bid</p>
                <p className="text-xs font-medium text-green-600">PKR {lowestAmount?.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-xs font-medium text-gray-700">{new Date(quotation.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* View RFQ Log */}
          <button
            onClick={() => navigate(`/compare`)}
            className="w-full bg-white rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            🔍 View Full Comparison
          </button>
        </div>
      </div>
    </div>
  )
}