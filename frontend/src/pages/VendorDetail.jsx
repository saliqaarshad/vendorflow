import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getVendor, getQuotations } from '../services/api'
import { ChevronRight, Phone, Mail, MapPin, FileText } from 'lucide-react'

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'V'
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function VendorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vendor, setVendor] = useState(null)
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorRes = await getVendor(id)
        setVendor(vendorRes.data)
        const quotationsRes = await getQuotations()
        const vendorQuotations = quotationsRes.data.filter(
          q => q.vendor._id === id
        )
        setQuotations(vendorQuotations)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>
  if (!vendor) return <div className="text-center py-10 text-gray-400">Vendor not found.</div>

  const totalAmount = quotations.reduce((sum, q) => sum + (q.amount || 0), 0)
  const approvedCount = quotations.filter(q => q.status === 'approved').length
  const activeCount = quotations.filter(q => q.status === 'submitted').length

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => navigate('/vendors')}>Vendors</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{vendor.vendorName}</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="col-span-1 space-y-4">
          {/* Vendor Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(vendor.vendorName)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{vendor.vendorName}</h2>
                <p className="text-sm text-gray-500">{vendor.companyName}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <Phone size={15} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-700">{vendor.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={15} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-700">{vendor.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Physical Address</p>
                  <p className="text-sm font-medium text-gray-700">{vendor.businessAddress}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-xs font-semibold text-gray-500 uppercase">Total Volume</p>
                <p className="text-sm font-bold text-orange-500">PKR {totalAmount.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-xs font-semibold text-gray-500 uppercase">Active RFQs</p>
                <p className="text-sm font-bold text-gray-900">{activeCount}</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <p className="text-xs font-semibold text-gray-500 uppercase">Approved</p>
                <p className="text-sm font-bold text-green-500">{approvedCount}</p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              📋 Vendor Info
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {new Date(vendor.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs text-gray-400 mt-2">Last Updated · {new Date(vendor.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Active Quotations</h2>
              <span className="text-xs text-gray-400">{quotations.length} total</span>
            </div>

            {quotations.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FileText size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No quotations found for this vendor.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quotations.map((q) => (
                    <tr key={q._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{q.title}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{q.description}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">PKR {q.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${statusColors[q.status]}`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {quotations.length} quotation{quotations.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}