import { useEffect, useState } from 'react'
import { getDashboardStats } from '../services/api'
import { Users, FileText, Clock, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

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
    { label: 'TOTAL VENDORS', value: stats?.totalVendors || 0, icon: <Users size={22} />, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'ACTIVE QUOTATIONS', value: stats?.activeQuotations || 0, icon: <FileText size={22} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'PENDING QUOTATIONS', value: stats?.pendingQuotations || 0, icon: <Clock size={22} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'APPROVED QUOTATIONS', value: stats?.approvedQuotations || 0, icon: <CheckCircle size={22} />, color: 'text-green-500', bg: 'bg-green-50' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operational Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time performance metrics and vendor health status.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{card.label}</p>
              <div className={`${card.bg} ${card.color} p-2 rounded-lg`}>
                {card.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
        </div>
        {stats?.recentQuotations?.length === 0 ? (
          <p className="text-sm text-gray-400">No recent activity.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats?.recentQuotations?.map((q) => (
              <div key={q._id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                    <FileText size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{q.title}</p>
                    <p className="text-xs text-gray-500">{q.vendor?.vendorName} • {q.vendor?.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-400">PKR {q.amount?.toLocaleString()}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase
                    ${q.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                    ${q.status === 'submitted' ? 'bg-blue-100 text-blue-600' : ''}
                    ${q.status === 'approved' ? 'bg-green-100 text-green-600' : ''}
                    ${q.status === 'rejected' ? 'bg-red-100 text-red-600' : ''}
                  `}>
                    {q.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}