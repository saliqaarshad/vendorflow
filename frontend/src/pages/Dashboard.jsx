import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboardStats } from '../services/api'
import { Users, FileText, Clock, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(30)

  useEffect(() => {
    getDashboardStats()
      .then(res => {
        setStats(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>

  const cards = [
    { label: 'TOTAL VENDORS', value: stats?.totalVendors || 0, icon: <Users size={18} />, accent: '#B45309', sub: 'Registered in system' },
    { label: 'ACTIVE QUOTATIONS', value: stats?.activeQuotations || 0, icon: <FileText size={18} />, accent: '#1D4ED8', sub: 'Currently submitted' },
    { label: 'PENDING QUOTATIONS', value: stats?.pendingQuotations || 0, icon: <Clock size={18} />, accent: '#92400E', sub: 'Awaiting response' },
    { label: 'APPROVED QUOTATIONS', value: stats?.approvedQuotations || 0, icon: <CheckCircle size={18} />, accent: '#065F46', sub: 'Finalized awards' },
  ]

  const statusColors = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'PENDING' },
    submitted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'SUBMITTED' },
    approved: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'APPROVED' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'REJECTED' },
  }

  const handleGenerateReport = () => {
    const rows = stats?.recentQuotations?.map(q =>
      `${q.title} | ${q.vendor?.vendorName} | PKR ${q.amount} | ${q.status}`
    ).join('\n')
    const content = `VendorFlow Report — Last ${filter} Days\n\nTotal Vendors: ${stats?.totalVendors}\nActive Quotations: ${stats?.activeQuotations}\nPending Quotations: ${stats?.pendingQuotations}\nApproved Quotations: ${stats?.approvedQuotations}\n\nRecent Activity:\n${rows}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vendorflow-report-${new Date().toLocaleDateString()}.txt`
    a.click()
  }

  const filteredQuotations = stats?.recentQuotations?.filter(q => {
    const date = new Date(q.createdAt)
    const now = new Date()
    const diff = (now - date) / (1000 * 60 * 60 * 24)
    return diff <= filter
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operational Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Real-time performance metrics and vendor health status.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 outline-none cursor-pointer"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
            <option value={365}>Last 1 Year</option>
          </select>
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
          >
            📄 Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5 relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            style={{ borderLeft: `4px solid ${card.accent}` }}
            onClick={() => navigate('/quotations')}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{card.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.accent}15`, color: card.accent }}>
                {card.icon}
              </div>
            </div>
            <p className="text-4xl font-black text-gray-900 mb-1">{card.value}</p>
            <p className="text-xs text-gray-400">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
            <button
              onClick={() => navigate('/quotations')}
              className="text-xs text-amber-700 font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          {filteredQuotations?.length === 0 ? (
            <p className="text-sm text-gray-400 p-6">No activity in the last {filter} days.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredQuotations?.map((q) => {
                const s = statusColors[q.status] || statusColors.pending
                return (
                  <div
                    key={q._id}
                    className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/quotations/${q._id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                        <FileText size={15} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{q.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{q.vendor?.vendorName} • {q.vendor?.companyName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xs font-semibold text-gray-500">PKR {q.amount?.toLocaleString()}</p>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Quotation Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Quotation Distribution</h3>
            <div className="space-y-3">
              {[
                { label: 'Approved', value: stats?.approvedQuotations || 0, color: 'bg-emerald-500' },
                { label: 'Active', value: stats?.activeQuotations || 0, color: 'bg-blue-500' },
                { label: 'Pending', value: stats?.pendingQuotations || 0, color: 'bg-amber-500' },
              ].map((item) => {
                const total = (stats?.activeQuotations || 0) + (stats?.pendingQuotations || 0) + (stats?.approvedQuotations || 0)
                const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-gray-600">{item.label}</p>
                      <p className="text-xs font-bold text-gray-900">{item.value}</p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-2 rounded-full ${item.color} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => navigate('/compare')}
              className="w-full mt-4 border border-gray-200 text-gray-600 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50"
            >
              Detailed Report
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-900 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400 text-lg">⚡</span>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Quick Stats</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Total Vendors</p>
                <p className="text-sm font-bold text-white">{stats?.totalVendors || 0}</p>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Total Quotations</p>
                <p className="text-sm font-bold text-white">
                  {(stats?.activeQuotations || 0) + (stats?.pendingQuotations || 0) + (stats?.approvedQuotations || 0)}
                </p>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Approval Rate</p>
                <p className="text-sm font-bold text-amber-400">
                  {(() => {
                    const total = (stats?.activeQuotations || 0) + (stats?.pendingQuotations || 0) + (stats?.approvedQuotations || 0)
                    return total > 0 ? `${Math.round((stats?.approvedQuotations / total) * 100)}%` : '0%'
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}