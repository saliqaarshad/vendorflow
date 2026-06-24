import { useState } from 'react'
import { compareQuotations, getQuotations } from '../services/api'
import { Search, Trophy } from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
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

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quotation Comparison</h1>
        <p className="text-sm text-gray-500 mt-1">Compare quotations from different vendors side by side.</p>
      </div>

      {/* Search Box */}
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

      {/* Results */}
      {loading && (
        <div className="text-center py-10 text-gray-400">Searching...</div>
      )}

      {searched && !loading && results.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No quotations found for "{title}"</p>
          <p className="text-gray-300 text-xs mt-1">Try a different title</p>
        </div>
      )}

      {results.length > 0 && !loading && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Total Quotes</p>
              <p className="text-3xl font-bold text-gray-900">{results.length}</p>
              <p className="text-xs text-gray-400 mt-1">For "{title}"</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Lowest Quote</p>
              <p className="text-3xl font-bold text-green-500">PKR {lowestAmount?.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Most cost-effective</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Highest Quote</p>
              <p className="text-3xl font-bold text-red-400">PKR {Math.max(...results.map(q => q.amount))?.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Most expensive</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Vendor Comparison</h2>
              <p className="text-xs text-gray-400 mt-0.5">🏆 Gold highlight = most cost-effective quote</p>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Company</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Best Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results
                  .sort((a, b) => a.amount - b.amount)
                  .map((q) => {
                    const isCheapest = q.amount === lowestAmount
                    return (
                      <tr
                        key={q._id}
                        className={`transition-colors ${isCheapest ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            {isCheapest && <Trophy size={14} className="text-yellow-500" />}
                            {q.vendor?.vendorName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{q.vendor?.companyName}</td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${isCheapest ? 'text-green-600 text-base' : 'text-gray-900'}`}>
                            PKR {q.amount?.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${statusColors[q.status]}`}>
                            {q.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {new Date(q.submissionDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {isCheapest ? (
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                              🏆 Best Price
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">
                              +PKR {(q.amount - lowestAmount).toLocaleString()} more
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
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