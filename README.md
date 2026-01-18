# 🍽️ TapTable - QR Restaurant Ordering System

A modern restaurant ordering system that allows customers to order via QR codes and restaurant owners to manage their operations through an admin dashboard.

## ✨ Features

### Customer Features
- 📱 Scan QR code to access table-specific menu
- 🍔 Browse menu items by category with images
- 🛒 Add items to cart with quantity selection
- 👤 Enter customer details (name, phone)
- 💳 Place orders with payment processing
- 📄 Generate bill PDF

### Admin Features
- 🔐 Restaurant owner login/authentication
- 📋 Menu management (add, edit, delete items)
- 🪑 Table management with QR code generation
- 📦 Real-time order management
- 📊 Order status tracking (pending → preparing → ready → completed)
- 📈 Analytics dashboard with revenue tracking
- ⚙️ Restaurant settings configuration

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for analytics
- jsPDF for bill generation
- Vite for build tooling

### Backend (Optional - Currently using Mock Data)
- The app currently runs with mock data (localStorage)
- Backend can be integrated later - see [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

## 📦 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amritakumari24/taptable-frontend-.git
cd TapTable
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (optional):
```bash
cp .env.example .env
# Edit .env if you want to connect to a backend
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## 🎮 Usage

### Default Login Credentials (Mock Mode)
- **Email**: `admin@taptable.com`
- **Password**: `admin123`

### Testing the App

1. **Admin Login**: Go to http://localhost:5173/admin/login
2. **Menu Management**: Add, edit, or delete menu items
3. **Table Management**: Create tables with QR codes
4. **Customer View**: Access http://localhost:5173/menu/1/1 to see customer menu
5. **Place Orders**: Add items to cart and complete checkout
6. **Order Management**: View and update order status in admin dashboard
7. **Analytics**: View revenue and sales data

## 🔌 Backend Integration

This app currently uses **mock data** stored in localStorage. When your backend team is ready:

1. Update `.env` file with backend URL:
```bash
VITE_API_URL=http://localhost:5000
```

2. Restart the dev server

For detailed backend integration instructions, see [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

## 📁 Project Structure

```
TapTable/
├── src/
│   ├── components/       # Admin components
│   │   ├── MenuManagement.tsx
│   │   ├── OrderManagement.tsx
│   │   ├── TableManagement.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   └── RestaurantSetting.tsx
│   ├── customer/         # Customer-facing components
│   │   ├── CustomerMenu.tsx
│   │   ├── CartModal.tsx
│   │   └── PaymentModal.tsx
│   ├── pages/           # Main pages
│   │   ├── LandingPage.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── utils/           # Utilities
│   │   ├── api.ts       # API service (auto-switches mock/real)
│   │   └── mockData.ts  # Mock data service
│   └── App.tsx          # Main app component
├── .env.example         # Environment variables template
├── BACKEND_INTEGRATION.md  # Backend integration guide
└── package.json
```

## 🏗️ Architecture

### Current Setup (Mock Data)
- All data stored in browser's localStorage
- No backend server required
- Perfect for frontend development and testing

### With Backend (Future)
- Simply set `VITE_API_URL` in `.env`
- API service automatically switches to real backend
- No code changes needed in components

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📝 Features Included

✅ Complete restaurant admin dashboard  
✅ Menu item management with categories  
✅ Table management with QR codes  
✅ Real-time order tracking  
✅ Customer menu interface  
✅ Shopping cart functionality  
✅ Order placement and payment  
✅ Analytics and reporting  
✅ Restaurant settings  
✅ Responsive design  
✅ Mock data for standalone testing  
✅ Easy backend integration

## 🤝 Contributing

When adding the backend:
1. See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete API specifications
2. Implement the required endpoints
3. Update `.env` with backend URL
4. Test all features

## 📄 License

This project is for educational/portfolio purposes.

## 👥 Team

- Frontend Developer: [Your Name]
- Backend Team: [To be added by other team members]

## 🆘 Support

For issues or questions:
- Check the browser console for errors
- Review [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)
- Verify environment configuration in `.env`
- customer_phone
- items (JSON string)
- total
- status
- created_at

## User Roles

### Restaurant Owner
- Can log in to admin dashboard
- Full access to menu, table, and order management
- Can view all orders and update their status
- Can manage restaurant tables and generate QR codes

### Customer
- Can access menu via QR code scan
- Can browse menu and place orders
- No authentication required
- Limited to viewing menu and placing orders

## Future Enhancements
- Payment gateway integration (Stripe/Razorpay)
- Real-time notifications via WebSocket
- Customer loyalty program
- Discount and promotion system
- Analytics dashboard
- Multi-restaurant support
- Staff role management
 