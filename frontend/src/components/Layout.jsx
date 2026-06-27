import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, GitCompare, Bell, History, Settings, HelpCircle, X } from 'lucide-react'

export default function Layout() {
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const notifications = [
    { id: 1, title: 'New Quotation Submitted', desc: 'Sara Khan submitted a quote for Office Renovation RFQ', time: 'Just now', unread: true },
    { id: 2, title: 'Vendor Added', desc: 'Ali Ahmed Khan was added to the system', time: '2 hours ago', unread: true },
    { id: 3, title: 'Quotation Approved', desc: 'Office Chairs Required was approved', time: 'Yesterday', unread: false },
  ]

  const recentHistory = [
    { id: 1, action: 'Viewed Quotation', detail: 'Office Renovation RFQ', time: '5 min ago', icon: '📄' },
    { id: 2, action: 'Added Vendor', detail: 'Sara Khan — Khan Traders', time: '2 hours ago', icon: '👤' },
    { id: 3, action: 'Compared RFQ', detail: 'Office Chairs Required', time: 'Yesterday', icon: '📊' },
    { id: 4, action: 'Updated Status', detail: 'Approved Office Chairs RFQ', time: '2 days ago', icon: '✅' },
  ]

  const handleGlobalSearch = (e) => {
    const val = e.target.value
    setGlobalSearch(val)
    if (val.trim().length > 1) {
      setShowSearchResults(true)
      setSearchResults([
        { label: 'Dashboard', path: '/', icon: '🏠' },
        { label: 'Vendors', path: '/vendors', icon: '👥' },
        { label: 'Quotations', path: '/quotations', icon: '📄' },
        { label: 'Compare RFQs', path: '/compare', icon: '📊' },
        { label: 'Add New Vendor', path: '/vendors/add', icon: '➕' },
        { label: 'Add New Quotation', path: '/quotations/add', icon: '➕' },
        { label: 'Settings', path: '/settings', icon: '⚙️' },
        { label: 'Support', path: '/support', icon: '❓' },
      ].filter(r => r.label.toLowerCase().includes(val.toLowerCase())))
    } else {
      setShowSearchResults(false)
      setSearchResults([])
    }
  }

  const closeAll = () => {
    setShowNotifications(false)
    setShowHistory(false)
    setShowSearchResults(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">VF</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">VendorFlow</h1>
              <p className="text-xs text-gray-400">ENTERPRISE ADMIN</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs text-gray-400 font-semibold uppercase mb-2 px-2">General</p>
          {[
            { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={17} />, end: true },
            { to: '/vendors', label: 'Vendors', icon: <Users size={17} /> },
            { to: '/quotations', label: 'Quotations', icon: <FileText size={17} /> },
            { to: '/compare', label: 'Compare', icon: <GitCompare size={17} /> },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 space-y-2 border-t border-gray-200">
          <NavLink
            to="/vendors/add"
            className="w-full bg-black text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            + Add New Vendor
          </NavLink>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg w-full"
            >
              <Settings size={15} />
              Settings
            </button>
            <button
              onClick={() => navigate('/support')}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg w-full"
            >
              <HelpCircle size={15} />
              Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between relative z-50">
          <div className="flex-1 max-w-xl relative">
            <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search vendors, contracts, or risk profiles..."
              value={globalSearch}
              onChange={handleGlobalSearch}
              onFocus={() => globalSearch.length > 1 && setShowSearchResults(true)}
              className="w-full bg-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-orange-300"
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-10 left-0 right-0 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
                {searchResults.map((result, i) => (
                  <div
                    key={i}
                    onClick={() => { navigate(result.path); closeAll(); setGlobalSearch('') }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                  >
                    <span>{result.icon}</span>
                    <p className="text-sm font-medium text-gray-900">{result.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 ml-6">
            {/* Bell */}
            <div className="relative">
              <button
                onClick={() => { closeAll(); setShowNotifications(!showNotifications) }}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-10 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">Notifications</p>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-gray-100 last:border-0 ${n.unread ? 'bg-orange-50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                        </div>
                        {n.unread && <span className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0"></span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            <div className="relative">
              <button
                onClick={() => { closeAll(); setShowHistory(!showHistory) }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <History size={18} />
              </button>
              {showHistory && (
                <div className="absolute right-0 top-10 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">Recent Activity</p>
                    <button onClick={() => setShowHistory(false)}>
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>
                  {recentHistory.map(h => (
                    <div key={h.id} className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <span className="text-lg">{h.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{h.action}</p>
                        <p className="text-xs text-gray-500">{h.detail}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{h.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200"></div>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Saliqa Arshad</p>
                <p className="text-xs text-gray-400">Full Stack Intern</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto p-6"
          onClick={() => { setShowSearchResults(false); setShowNotifications(false); setShowHistory(false) }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}