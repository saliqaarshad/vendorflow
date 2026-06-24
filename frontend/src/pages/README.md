# VendorFlow — Vendor Management & Quotation System

A full-stack web application for managing vendors, creating quotation requests, receiving vendor responses, and comparing proposals through a centralized platform.

## 🚀 Live Demo
[Add your deployment link here]

## 📌 Features

### Vendor Management
- Add, edit, delete vendors
- Search and filter vendors
- View vendor detail page with their quotations

### Quotation Management
- Create RFQ (Request for Quotation) with line items
- Assign to multiple vendors at once
- Update quotation status (Pending → Submitted → Approved/Rejected)
- View quotation detail with vendor responses

### Dashboard
- Total vendors count
- Active, pending, and approved quotations
- Recent activity feed

### Quotation Comparison
- Compare quotes from multiple vendors side by side
- Highlight most cost-effective quote automatically
- Show lowest and highest bids

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (icons)

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- CORS + dotenv

## 📁 Project Structure
vendorflow/

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   │   └── Layout.jsx

│   │   ├── pages/

│   │   │   ├── Dashboard.jsx

│   │   │   ├── Vendors.jsx

│   │   │   ├── AddVendor.jsx

│   │   │   ├── VendorDetail.jsx

│   │   │   ├── Quotations.jsx

│   │   │   ├── AddQuotation.jsx

│   │   │   ├── QuotationDetail.jsx

│   │   │   └── Compare.jsx

│   │   └── services/

│   │       └── api.js

└── backend/

├── config/

│   └── db.js

├── models/

│   ├── Vendor.js

│   └── Quotation.js

├── controllers/

│   ├── vendorController.js

│   └── quotationController.js

├── routes/

│   ├── vendorRoutes.js

│   └── quotationRoutes.js

└── server.js

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
PORT=5000

MONGO_URI=your_mongodb_connection_string

Run the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📡 API Endpoints

### Vendors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/vendors | Get all vendors (with search) |
| GET | /api/vendors/:id | Get single vendor |
| POST | /api/vendors | Create vendor |
| PUT | /api/vendors/:id | Update vendor |
| DELETE | /api/vendors/:id | Delete vendor |

### Quotations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/quotations | Get all quotations |
| GET | /api/quotations/:id | Get single quotation |
| POST | /api/quotations | Create quotation |
| PUT | /api/quotations/:id | Update quotation |
| DELETE | /api/quotations/:id | Delete quotation |
| GET | /api/quotations/dashboard | Get dashboard stats |
| GET | /api/quotations/compare | Compare by title |

## 🗄️ Database Schema

### Vendor
```json
{
  "vendorName": "String (required)",
  "companyName": "String (required)",
  "email": "String (required, unique)",
  "contactNumber": "String (required)",
  "businessAddress": "String (required)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Quotation
```json
{
  "title": "String (required)",
  "description": "String (required)",
  "vendor": "ObjectId (ref: Vendor)",
  "amount": "Number",
  "submissionDate": "Date",
  "status": "pending | submitted | approved | rejected",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 👩‍💻 Developer
## 👩‍💻 Developer
**Saliqa Arshad**
TEYZIX CORE Internship Program — June Batch 2026
Task ID: FS-2 | Full Stack Web Development