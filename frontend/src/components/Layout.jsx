import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, GitCompare } from 'lucide-react'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">VendorFlow</h1>
          <p className="text-xs text-gray-500 mt-1">VENDOR MANAGEMENT</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs text-gray-400 font-semibold uppercase mb-2">General</p>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/vendors"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Users size={18} />
            Vendors
          </NavLink>

          <NavLink
            to="/quotations"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <FileText size={18} />
            Quotations
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <GitCompare size={18} />
            Compare
          </NavLink>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-200">
          <NavLink
            to="/vendors"
            className="w-full bg-black text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            + Add New Vendor
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search vendors, quotations..."
              className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div className="flex items-center gap-4 ml-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">VendorFlow</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
              V
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