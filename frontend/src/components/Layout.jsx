import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, GitCompare, Bell, History, Settings, HelpCircle } from 'lucide-react'

export default function Layout() {
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

        {/* Bottom Buttons */}
        <div className="p-4 space-y-2 border-t border-gray-200">
          <NavLink
            to="/vendors/add"
            className="w-full bg-black text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            + Add New Vendor
          </NavLink>

          <div className="flex items-center gap-2 mt-2">
            <button className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg w-full">
              <Settings size={15} />
              Settings
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg w-full">
              <HelpCircle size={15} />
              Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search vendors, contracts, or risk profiles..."
                className="w-full bg-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-6">
            {/* Icons */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <History size={18} />
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200"></div>

            {/* User Profile */}
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
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}