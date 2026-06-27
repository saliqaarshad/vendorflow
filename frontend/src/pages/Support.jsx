export default function Support() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Center</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <p className="text-sm font-semibold text-gray-900 mb-1">How do I add a new vendor?</p>
                <p className="text-xs text-gray-500">Click the Add New Vendor button in the sidebar or on the Vendors page.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <p className="text-sm font-semibold text-gray-900 mb-1">How do I create a quotation request?</p>
                <p className="text-xs text-gray-500">Go to Quotations page and click Add Quotation. Fill in the details and select vendors.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <p className="text-sm font-semibold text-gray-900 mb-1">How do I compare vendor quotes?</p>
                <p className="text-xs text-gray-500">Go to the Compare page, enter the quotation title and click Compare.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <p className="text-sm font-semibold text-gray-900 mb-1">How do I approve a quotation?</p>
                <p className="text-xs text-gray-500">Open a quotation detail page and use the Update RFQ Status panel on the right.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">How do I export a comparison report?</p>
                <p className="text-xs text-gray-500">After comparing quotations, click the Export PDF button at the top.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4">📖 Quick Guide</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">👥</span>
                <p className="text-sm font-semibold text-gray-900 mt-2 mb-1">Vendor Management</p>
                <p className="text-xs text-gray-500">Add, edit, delete and search vendors.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">📄</span>
                <p className="text-sm font-semibold text-gray-900 mt-2 mb-1">Quotation Requests</p>
                <p className="text-xs text-gray-500">Create RFQs and assign to multiple vendors.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">📊</span>
                <p className="text-sm font-semibold text-gray-900 mt-2 mb-1">Compare RFQs</p>
                <p className="text-xs text-gray-500">Compare vendor quotes side by side.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">🏆</span>
                <p className="text-sm font-semibold text-gray-900 mt-2 mb-1">Finalize Awards</p>
                <p className="text-xs text-gray-500">Use Finalize Award to approve winning vendor.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400 text-xl">⚡</span>
              <div>
                <p className="text-sm font-bold">TEYZIX CORE</p>
                <p className="text-xs text-gray-400">Core of Innovation</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-gray-300">📧 hello@teyzixcore.com</p>
              <p className="text-xs text-gray-300">📱 +92371-4699788</p>
              <p className="text-xs text-gray-300">🌐 www.teyzixcore.com</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">📋 Project Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                <span className="text-gray-400">Task</span>
                <span className="font-semibold text-gray-700">FS-2</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                <span className="text-gray-400">Developer</span>
                <span className="font-semibold text-gray-700">Saliqa Arshad</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                <span className="text-gray-400">Batch</span>
                <span className="font-semibold text-gray-700">June 2026</span>
              </div>
              <div className="flex justify-between text-xs py-1.5">
                <span className="text-gray-400">Domain</span>
                <span className="font-semibold text-gray-700">Full Stack</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">🔗 Quick Links</h3>
            <div className="space-y-2">
              <a href="https://vendorflow-rho.vercel.app" target="_blank" rel="noopener noreferrer"
                className="block py-2 px-3 border border-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                🌐 Live Demo
              </a>
              <a href="https://github.com/saliqaarshad/vendorflow" target="_blank" rel="noopener noreferrer"
                className="block py-2 px-3 border border-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                💻 GitHub Repo
              </a>
              <a href="https://www.teyzixcore.com" target="_blank" rel="noopener noreferrer"
                className="block py-2 px-3 border border-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                🏢 TEYZIX CORE
              </a>
            </div>
          </div>

          <a href="https://wa.me/923714699788" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-600">
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}