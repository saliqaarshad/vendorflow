import { useState } from 'react'
import { compareQuotations } from '../services/api'
import { Search, Trophy } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const getBadgeColor = (value) => {
  if (!value) return 'bg-gray-100 text-gray-500'
  const v = value.toLowerCase()
  if (v.includes('next day') || v.includes('standard incl') || v.includes('0%')) return 'bg-green-100 text-green-700'
  if (v.includes('50%') || v.includes('excluded') || v.includes('limited')) return 'bg-orange-100 text-orange-700'
  return 'bg-blue-100 text-blue-700'
}

export default function Compare() {
  const [title, setTitle] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    if (!title.trim()) return
    setLoading(true)
    try {
      const res = await compareQuotations(title)
      setResults(res.data)
      setSearched(true)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const lowestAmount = results.length > 0 ? Math.min(...results.map(q => q.amount)) : null
  const highestAmount = results.length > 0 ? Math.max(...results.map(q => q.amount)) : null
  const winner = results.find(q => q.amount === lowestAmount)
  const sorted = [...results].sort((a, b) => a.amount - b.amount)

  const chartData = results.map(q => ({
    name: q.vendor?.vendorName?.split(' ')[0] || 'Vendor',
    amount: q.amount,
    isLowest: q.amount === lowestAmount
  }))

  // Get all unique line item names across all quotations
  const allLineItemNames = [...new Set(
    results.flatMap(q => (q.lineItems || []).map(item => item.name)).filter(Boolean)
  )]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RFQ Comparison</h1>
          <p className="text-sm text-gray-500 mt-1">Compare and manage quotes from different vendors.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Search by Quotation Title</h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Office Chairs Required"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <button
            onClick={handleCompare}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Compare
          </button>
        </div>
      </div>

      {loading && <div className="text-center py-10 text-gray-400">Searching...</div>}

      {searched && !loading && results.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No quotations found for "{title}"</p>
        </div>
      )}

      {results.length > 0 && !loading && (
        <>
          {/* RFQ Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">RFQ / {title.toUpperCase()}</p>
              <h2 className="text-lg font-bold text-gray-900 mt-1">Response Comparison</h2>
              <p className="text-sm text-gray-500">{results[0]?.description}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                📥 Export PDF
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                🏆 Finalize Award
              </button>
            </div>
          </div>

          {/* Vendor Cards Side by Side */}
          <div className="grid mb-6" style={{ gridTemplateColumns: `repeat(${Math.min(results.length + 1, 4)}, 1fr)`, gap: '16px' }}>
            {/* Terms Row Labels */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
              <div className="h-16 mb-4"></div>
              {['Delivery', 'Warranty', 'Advance', 'Installation'].map((label) => (
                <div key={label} className="py-3 border-t border-gray-100 flex items-center">
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                </div>
              ))}
            </div>

            {/* Vendor Columns */}
            {sorted.map((q) => {
              const isWinner = q.amount === lowestAmount
              return (
                <div
                  key={q._id}
                  className={`rounded-xl border p-5 ${isWinner ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200'}`}
                >
                  {/* Vendor Header */}
                  <div className="mb-4">
                    {isWinner && (
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 w-fit mb-2">
                        <Trophy size={10} /> TROPHY WINNER
                      </span>
                    )}
                    <p className={`text-base font-bold ${isWinner ? 'text-white' : 'text-gray-900'}`}>
                      {q.vendor?.vendorName}
                    </p>
                    <p className={`text-xs ${isWinner ? 'text-gray-400' : 'text-gray-400'}`}>
                      ID: {q._id?.slice(-8).toUpperCase()}
                    </p>
                    <p className={`text-xl font-bold mt-2 ${isWinner ? 'text-green-400' : 'text-gray-900'}`}>
                      PKR {q.amount?.toLocaleString()}
                    </p>
                    {isWinner && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">Lowest Price</span>
                    )}
                  </div>

                  {/* Terms */}
                  {[
                    { key: 'deliveryTime', label: 'Delivery' },
                    { key: 'warranty', label: 'Warranty' },
                    { key: 'advancePayment', label: 'Advance' },
                    { key: 'installation', label: 'Installation' },
                  ].map((field) => (
                    <div key={field.key} className="py-3 border-t border-gray-700/20">
                      {q[field.key] ? (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isWinner ? 'bg-gray-700 text-gray-200' : getBadgeColor(q[field.key])
                        }`}>
                          {q[field.key]}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Not specified</span>
                      )}
                    </div>
                  ))}

                  <button className={`w-full mt-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    isWinner
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}>
                    VIEW DETAILS
                  </button>
                </div>
              )
            })}

            {/* Awaiting if only 1 vendor */}
            {results.length === 1 && (
              <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-5 flex flex-col items-center justify-center">
                <div className="text-gray-300 text-4xl mb-2">⏰</div>
                <p className="text-sm font-medium text-gray-400">Awaiting</p>
                <p className="text-xs text-gray-300">No response yet</p>
              </div>
            )}
          </div>

          {/* Itemized Price Comparison */}
          {allLineItemNames.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">Itemized Price Comparison</h2>
                <div className="flex items-center gap-3">
                  {sorted.map((q, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-sm ${q.amount === lowestAmount ? 'bg-gray-900' : 'bg-gray-300'}`}></div>
                      <span className="text-xs text-gray-500">{q.vendor?.vendorName?.split(' ')[0]?.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Item Description</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Quantity</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Relative Pricing</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allLineItemNames.map((itemName) => {
                    const itemPrices = results.map(q => {
                      const item = (q.lineItems || []).find(li => li.name === itemName)
                      return {
                        vendor: q.vendor?.vendorName,
                        price: item ? (item.price * item.qty) : 0,
                        qty: item ? `${item.qty} ${item.unit}` : '-',
                        isWinner: q.amount === lowestAmount
                      }
                    })
                    const prices = itemPrices.map(i => i.price).filter(p => p > 0)
                    const minPrice = Math.min(...prices)
                    const maxPrice = Math.max(...prices)
                    const delta = maxPrice - minPrice

                    return (
                      <tr key={itemName} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{itemName}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {itemPrices[0]?.qty}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            {itemPrices.map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-100 rounded-full h-2 relative">
                                  <div
                                    className={`h-2 rounded-full ${item.isWinner ? 'bg-gray-900' : 'bg-gray-300'}`}
                                    style={{ width: maxPrice > 0 ? `${(item.price / maxPrice) * 100}%` : '0%' }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500 w-16 text-right">
                                  {item.price > 0 ? `${(item.price / 1000).toFixed(0)}k` : '-'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {delta > 0 ? (
                            <span className="text-sm font-bold text-green-500">-PKR {delta.toLocaleString()}</span>
                          ) : (
                            <span className="text-sm font-bold text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                {/* Total Quote Variance */}
                <tfoot>
                  <tr className="bg-blue-50">
                    <td colSpan={3} className="px-6 py-4 font-semibold text-gray-900">Total Quote Variance</td>
                    <td className="px-6 py-4 text-right font-bold text-green-500 text-base">
                      -PKR {(highestAmount - lowestAmount).toLocaleString()}
                      <p className="text-xs text-gray-400 font-normal">FAVOURING {winner?.vendor?.vendorName?.toUpperCase()}</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Bottom Row: Risk Assessment + Bar Chart */}
          <div className="grid grid-cols-2 gap-6">
            {/* Risk Assessment */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">⚠ Risk Assessment Note</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">{winner?.vendor?.vendorName}</span> provides
                the most competitive quote at{' '}
                <span className="font-semibold text-orange-500">PKR {lowestAmount?.toLocaleString()}</span>.
                {results.length > 1 && highestAmount !== lowestAmount && (
                  <> This represents a saving of{' '}
                    <span className="font-semibold text-green-600">
                      PKR {(highestAmount - lowestAmount).toLocaleString()}
                    </span>{' '}
                    compared to the highest quote. Consider evaluating delivery timelines and warranty terms before finalizing the award.
                  </>
                )}
                {highestAmount === lowestAmount && (
                  <> All vendors have submitted equal quotes. Consider evaluating delivery timelines, warranty, and payment terms to make the final decision.</>
                )}
              </p>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Relative Pricing</h3>
              <p className="text-xs text-gray-400 mb-4">Visual comparison of vendor quotes</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.isLowest ? '#1f2937' : '#d1d5db'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {!searched && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search size={40} className="mx-auto mb-4 text-gray-200" />
          <p className="text-gray-400 text-sm">Enter a quotation title above to compare vendor quotes</p>
          <p className="text-gray-300 text-xs mt-1">e.g. "Office Chairs Required"</p>
        </div>
      )}
    </div>
  )
}