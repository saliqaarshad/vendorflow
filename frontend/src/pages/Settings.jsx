import { useState } from 'react'
import { User, Bell, Shield, Globe, Moon, Save } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const { darkMode, setDarkMode } = useTheme()
  const [form, setForm] = useState({
    name: 'Saliqa Arshad',
    email: 'saliqa@teyzixcore.com',
    role: 'Full Stack Intern',
    organization: 'TEYZIX CORE',
    notifications: true,
    emailAlerts: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your account and application preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            saved ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">

          {/* Profile */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-gray-900">Profile Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Your name' },
                { label: 'Email Address', key: 'email', placeholder: 'your@email.com' },
                { label: 'Role', key: 'role', placeholder: 'Your role' },
                { label: 'Organization', key: 'organization', placeholder: 'Organization name' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Push Notifications', desc: 'Receive notifications in the app', key: 'notifications' },
                { label: 'Email Alerts', desc: 'Receive email alerts for important updates', key: 'emailAlerts' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setForm({ ...form, [item.key]: !form[item.key] })}
                    className={`w-11 h-6 rounded-full transition-colors ${form[item.key] ? 'bg-amber-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow mx-1 transition-transform ${form[item.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Moon size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-gray-900">Appearance</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDarkMode(false)}
                className={`p-4 rounded-xl border-2 text-sm font-medium transition-colors ${
                  !darkMode
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                ☀️ Light Mode
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={`p-4 rounded-xl border-2 text-sm font-medium transition-colors ${
                  darkMode
                    ? 'border-amber-500 bg-gray-800 text-amber-300'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-gray-900">Security</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
                Update Password
              </button>
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              SA
            </div>
            <p className="text-base font-bold text-gray-900">{form.name}</p>
            <p className="text-xs text-gray-400 mt-1">{form.role}</p>
            <p className="text-xs text-gray-400">{form.organization}</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">● Active</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-amber-600" />
              <h3 className="text-sm font-bold text-gray-900">System Info</h3>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Version', value: 'v1.0.0' },
                { label: 'Stack', value: 'MERN' },
                { label: 'Database', value: 'MongoDB Atlas' },
                { label: 'Deployed', value: 'Vercel' },
                { label: 'Task', value: 'FS-2' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 rounded-xl border border-red-200 p-5">
            <h3 className="text-sm font-bold text-red-700 mb-3">⚠ Danger Zone</h3>
            <p className="text-xs text-red-500 mb-3">These actions cannot be undone.</p>
            <button className="w-full border border-red-300 text-red-600 py-2 rounded-lg text-xs font-medium hover:bg-red-100">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}