// Mock data service for frontend-only functionality
export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  restaurant_id: number
  dietaryInfo: {
    isVegetarian: boolean
    isVegan: boolean
    isGlutenFree: boolean
    isNutFree: boolean
  }
}

export interface Table {
  id: number
  number: number
  seats: number
  status: 'available' | 'occupied' | 'reserved'
  restaurant_id: number
  qr_code: string
}

export interface Order {
  id: number
  restaurant_id: number
  table_number: number
  customerName: string
  customerPhone: string
  items: {
    id: number
    name: string
    price: number
    quantity: number
  }[]
  amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled'
  payment_method: string
  created_at: string
}

export interface Restaurant {
  id: number
  name: string
  email: string
  phone: string
  address: string
  settings: {
    taxRate: number
    serviceCharge: number
    currency: string
    acceptsOnlinePayment: boolean
    acceptsCash: boolean
  }
}

// Initialize default data
const initializeData = () => {
  if (!localStorage.getItem('restaurants')) {
    const defaultRestaurant: Restaurant = {
      id: 1,
      name: 'TapTable Restaurant',
      email: 'admin@taptable.com',
      phone: '+1234567890',
      address: '123 Main Street, City',
      settings: {
        taxRate: 10,
        serviceCharge: 5,
        currency: 'USD',
        acceptsOnlinePayment: true,
        acceptsCash: true
      }
    }
    localStorage.setItem('restaurants', JSON.stringify([defaultRestaurant]))
  }

  if (!localStorage.getItem('menuItems')) {
    const defaultMenu: MenuItem[] = [
      {
        id: 1,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        price: 12.99,
        category: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
        available: true,
        restaurant_id: 1,
        dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false, isNutFree: true }
      },
      {
        id: 2,
        name: 'Grilled Chicken',
        description: 'Tender grilled chicken with herbs',
        price: 18.99,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop',
        available: true,
        restaurant_id: 1,
        dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true, isNutFree: true }
      },
      {
        id: 3,
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella',
        price: 14.99,
        category: 'Pizzas',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop',
        available: true,
        restaurant_id: 1,
        dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false, isNutFree: true }
      },
      {
        id: 4,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with ganache',
        price: 8.99,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
        available: true,
        restaurant_id: 1,
        dietaryInfo: { isVegetarian: true, isVegan: false, isGlutenFree: false, isNutFree: false }
      },
      {
        id: 5,
        name: 'Fresh Juice',
        description: 'Freshly squeezed orange juice',
        price: 5.99,
        category: 'Drinks & Beverages',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop',
        available: true,
        restaurant_id: 1,
        dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true, isNutFree: true }
      }
    ]
    localStorage.setItem('menuItems', JSON.stringify(defaultMenu))
  }

  if (!localStorage.getItem('tables')) {
    const defaultTables: Table[] = [
      { id: 1, number: 1, seats: 4, status: 'available', restaurant_id: 1, qr_code: 'QR-TABLE-1' },
      { id: 2, number: 2, seats: 2, status: 'occupied', restaurant_id: 1, qr_code: 'QR-TABLE-2' },
      { id: 3, number: 3, seats: 6, status: 'available', restaurant_id: 1, qr_code: 'QR-TABLE-3' }
    ]
    localStorage.setItem('tables', JSON.stringify(defaultTables))
  }

  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]))
  }
}

// Call initialization
initializeData()

// Mock API Service
export const mockApiService = {
  // Auth
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    if (email === 'admin@taptable.com' && password === 'admin123') {
      const token = 'mock-jwt-token-' + Date.now()
      const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
      return {
        token,
        restaurant: {
          id: restaurants[0].id,
          name: restaurants[0].name,
          email: restaurants[0].email
        }
      }
    }
    throw new Error('Invalid credentials')
  },

  // Menu
  getMenu: async (restaurantId: number): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const items = JSON.parse(localStorage.getItem('menuItems') || '[]')
    return items.filter((item: MenuItem) => item.restaurant_id === restaurantId)
  },

  addMenuItem: async (payload: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const items = JSON.parse(localStorage.getItem('menuItems') || '[]')
    const newItem = {
      ...payload,
      id: Date.now()
    }
    items.push(newItem)
    localStorage.setItem('menuItems', JSON.stringify(items))
    return newItem
  },

  updateMenuItem: async (menuItemId: number, payload: Partial<MenuItem>): Promise<MenuItem> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const items = JSON.parse(localStorage.getItem('menuItems') || '[]')
    const index = items.findIndex((item: MenuItem) => item.id === menuItemId)
    if (index !== -1) {
      items[index] = { ...items[index], ...payload }
      localStorage.setItem('menuItems', JSON.stringify(items))
      return items[index]
    }
    throw new Error('Item not found')
  },

  deleteMenuItem: async (menuItemId: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const items = JSON.parse(localStorage.getItem('menuItems') || '[]')
    const filtered = items.filter((item: MenuItem) => item.id !== menuItemId)
    localStorage.setItem('menuItems', JSON.stringify(filtered))
  },

  reclassifyMenu: async (_restaurantId: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // Mock reclassification - just return success
  },

  // Tables
  getTablesForRestaurant: async (restaurantId: number): Promise<Table[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const tables = JSON.parse(localStorage.getItem('tables') || '[]')
    return tables.filter((table: Table) => table.restaurant_id === restaurantId)
  },

  addTable: async (payload: { number: string; seats: number; restaurant_id: number }): Promise<Table> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const tables = JSON.parse(localStorage.getItem('tables') || '[]')
    const newTable = {
      id: Date.now(),
      number: parseInt(payload.number),
      seats: payload.seats,
      status: 'available' as const,
      restaurant_id: payload.restaurant_id,
      qr_code: `QR-TABLE-${payload.number}`
    }
    tables.push(newTable)
    localStorage.setItem('tables', JSON.stringify(tables))
    return newTable
  },

  deleteTable: async (tableId: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const tables = JSON.parse(localStorage.getItem('tables') || '[]')
    const filtered = tables.filter((table: Table) => table.id !== tableId)
    localStorage.setItem('tables', JSON.stringify(filtered))
  },

  // Orders
  getOrders: async (restaurantId: number): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    return orders.filter((order: Order) => order.restaurant_id === restaurantId)
  },

  createOrder: async (payload: {
    restaurant_id: number
    table_number: number
    customerName: string
    customerPhone: string
    amount: number
    payment_method: string
    items: { id: number; name: string; price: number; quantity: number }[]
  }): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const newOrder: Order = {
      id: Date.now(),
      ...payload,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    orders.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(orders))
    return newOrder
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const index = orders.findIndex((order: Order) => order.id === orderId)
    if (index !== -1) {
      orders[index].status = status
      localStorage.setItem('orders', JSON.stringify(orders))
      return orders[index]
    }
    throw new Error('Order not found')
  },

  // Restaurant
  getRestaurantInfo: async (restaurantId: number): Promise<Restaurant> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
    const restaurant = restaurants.find((r: Restaurant) => r.id === restaurantId)
    if (!restaurant) throw new Error('Restaurant not found')
    return restaurant
  },

  getRestaurantSettings: async (restaurantId: number) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
    const restaurant = restaurants.find((r: Restaurant) => r.id === restaurantId)
    return restaurant?.settings || {}
  },

  updateRestaurantSettings: async (restaurantId: number, payload: any) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
    const index = restaurants.findIndex((r: Restaurant) => r.id === restaurantId)
    if (index !== -1) {
      restaurants[index].settings = { ...restaurants[index].settings, ...payload }
      localStorage.setItem('restaurants', JSON.stringify(restaurants))
      return restaurants[index].settings
    }
    throw new Error('Restaurant not found')
  },

  // Analytics
  getAnalytics: async (restaurantId: number) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const restaurantOrders = orders.filter((o: Order) => o.restaurant_id === restaurantId)
    
    const totalRevenue = restaurantOrders.reduce((sum: number, order: Order) => sum + order.amount, 0)
    const totalOrders = restaurantOrders.length
    
    // Generate mock daily data for chart
    const revenueTrend = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 1000) + 500
      }
    })

    return {
      total_revenue: totalRevenue > 0 ? totalRevenue : 5847,
      total_orders: totalOrders > 0 ? totalOrders : 142,
      average_rating: 4.5,
      revenue_trend: revenueTrend,
      previous_revenue: totalRevenue > 0 ? totalRevenue * 0.85 : 4980,
      previous_orders: totalOrders > 0 ? totalOrders - 12 : 130,
      previous_rating: 4.3,
      top_items: ['Margherita Pizza', 'Grilled Chicken', 'Caesar Salad', 'Chocolate Cake'],
      recent_reviews: []
    }
  }
}
