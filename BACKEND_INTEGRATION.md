# Backend Integration Guide

## Current Setup
The frontend currently runs in **mock data mode** - all features work without a backend using localStorage.

## How to Switch to Real Backend

### Step 1: Update Environment Configuration
When your backend team is ready, simply update the `.env` file:

```bash
# Change from:
VITE_API_URL=

# To (for local development):
VITE_API_URL=http://localhost:5000

# Or for production:
VITE_API_URL=https://api.yourdomain.com
```

### Step 2: Restart the Development Server
```bash
npm run dev
```

That's it! The app will automatically switch from mock data to your real backend.

## Required Backend Endpoints

The backend needs to implement these API endpoints:

### Authentication
- `POST /api/auth/login` - Login
  ```json
  Request: { "email": "string", "password": "string" }
  Response: { "token": "string", "restaurant": { "id": number, "name": "string", "email": "string" } }
  ```

- `POST /api/auth/register` - Register (optional)
  ```json
  Request: { "name": "string", "email": "string", "password": "string" }
  Response: { "token": "string", "restaurant": { "id": number, "name": "string", "email": "string" } }
  ```

### Restaurant
- `GET /api/restaurants/:id` - Get restaurant info

### Menu Management
- `GET /api/menu/:restaurantId` - Get all menu items
- `POST /api/menu/` - Add menu item
  ```json
  Request: {
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "image": "string",
    "available": boolean,
    "restaurant_id": number,
    "dietaryInfo": {
      "isVegetarian": boolean,
      "isVegan": boolean,
      "isGlutenFree": boolean,
      "isNutFree": boolean
    }
  }
  ```
- `PUT /api/menu/:itemId` - Update menu item
- `DELETE /api/menu/:itemId` - Delete menu item
- `POST /api/menu/:restaurantId/reclassify` - Reclassify menu items (optional AI feature)

### Table Management
- `GET /api/restaurants/:restaurantId/tables` - Get all tables
- `POST /api/tables` - Add table
  ```json
  Request: {
    "number": "string",
    "seats": number,
    "restaurant_id": number
  }
  Response: {
    "id": number,
    "number": number,
    "seats": number,
    "status": "available",
    "restaurant_id": number,
    "qr_code": "string" // URL or base64 QR code image
  }
  ```
- `DELETE /api/tables/:tableId` - Delete table

### Order Management
- `GET /api/orders?restaurant_id=:id` - Get all orders for restaurant
  ```json
  Response: [{
    "id": number,
    "restaurant_id": number,
    "table_number": number,
    "customerName": "string",
    "customerPhone": "string",
    "items": [{ "id": number, "name": "string", "price": number, "quantity": number }],
    "amount": number,
    "status": "pending" | "confirmed" | "preparing" | "ready" | "served" | "cancelled",
    "payment_method": "string",
    "created_at": "ISO date string"
  }]
  ```
- `PUT /api/orders/:orderId/status` - Update order status
  ```json
  Request: { "status": "pending" | "preparing" | "ready" | "completed" }
  ```

### Customer Orders
- `POST /api/customer-order/create-order` - Create new order from customer
  ```json
  Request: {
    "restaurant_id": number,
    "table_number": number,
    "customerName": "string",
    "customerPhone": "string",
    "amount": number,
    "payment_method": "upi" | "razorpay" | "cash",
    "items": [{ "id": number, "name": "string", "price": number, "quantity": number }]
  }
  ```

### Analytics
- `GET /api/analytics/:restaurantId?timeRange=7days&startDate=&endDate=` - Get analytics
  ```json
  Response: {
    "total_revenue": number,
    "total_orders": number,
    "average_rating": number,
    "revenue_trend": [{ "date": "YYYY-MM-DD", "revenue": number }],
    "previous_revenue": number,
    "previous_orders": number,
    "previous_rating": number,
    "top_items": ["string"],
    "recent_reviews": ["string"]
  }
  ```

### Settings
- `GET /api/settings/:restaurantId` - Get restaurant settings
  ```json
  Response: {
    "taxRate": number,
    "serviceCharge": number,
    "currency": "string",
    "acceptsOnlinePayment": boolean,
    "acceptsCash": boolean
  }
  ```
- `PUT /api/settings/:restaurantId` - Update settings

## CORS Configuration

Make sure your backend allows requests from the frontend:

```python
# Flask example
from flask_cors import CORS
CORS(app, origins=["http://localhost:5173", "https://yourdomain.com"])
```

```javascript
// Express example
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'https://yourdomain.com']
}));
```

## Authentication

The frontend sends the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Make sure your backend validates this token on protected endpoints.

## Testing

### Test with Mock Data (Current)
```bash
npm run dev
# App uses localStorage mock data
```

### Test with Backend
```bash
# 1. Start your backend server
# 2. Update .env with backend URL
# 3. Restart frontend
npm run dev
```

## Default Credentials (Mock Mode)
- Email: `admin@taptable.com`
- Password: `admin123`

## Support

If you encounter any issues integrating the backend:
1. Check browser console for errors
2. Verify backend URL in `.env`
3. Check CORS configuration
4. Verify API response format matches expected structure

## File Structure Reference

```
src/
├── utils/
│   ├── api.ts           # API service (auto-switches between mock/real)
│   └── mockData.ts      # Mock data service
├── components/          # Admin components
├── customer/           # Customer-facing components
└── pages/              # Main pages
```

The switching logic is in `src/utils/api.ts` - it automatically detects if `VITE_API_URL` is set and uses real backend or mock data accordingly.
