// src/utils/api.ts
import { mockApiService } from './mockData'

export type PlainObject = Record<string, any>

export interface AuthResponse {
  token: string
  restaurant: {
    id: number
    name: string
    email: string
  }
}

/* ================= BASE URL ================= */

const stripTrailingSlash = (s = '') => s.replace(/\/+$/, '')

const rawApiBase =
  import.meta.env?.VITE_API_URL || ''

export const API_BASE = stripTrailingSlash(rawApiBase)
const USE_MOCK_DATA = !import.meta.env?.VITE_API_URL || import.meta.env?.VITE_USE_MOCK === 'true'

/* ================= API SERVICE ================= */

class ApiService {
  private token: string | null =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('token')
  }

  private async safeParseJSON(res: Response) {
    const text = await res.text()
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`

    const isFormData = options.body instanceof FormData

    const headers: HeadersInit = {
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    })

    const data = await this.safeParseJSON(response)

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        this.clearToken()
      }
      throw new Error((data as any)?.error || `HTTP ${response.status}`)
    }

    return data as T
  }

  /* ================= AUTH ================= */

  async login(email: string, password: string) {
    if (USE_MOCK_DATA) {
      const res = await mockApiService.login(email, password)
      if (res?.token) this.setToken(res.token)
      return res
    }
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(res => {
      if (res?.token) this.setToken(res.token)
      return res
    })
  }

  async register(name: string, email: string, password: string) {
    if (USE_MOCK_DATA) {
      throw new Error('Registration not available in demo mode')
    }
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }).then(res => {
      if (res?.token) this.setToken(res.token)
      return res
    })
  }

  /* ================= RESTAURANT (PUBLIC) ================= */

  async getRestaurantInfo(restaurantId: number) {
    if (USE_MOCK_DATA) return mockApiService.getRestaurantInfo(restaurantId)
    return this.request(`/api/restaurants/${restaurantId}`)
  }

  /* ================= TABLES ================= */

  async getTablesForRestaurant(restaurantId: number) {
    if (USE_MOCK_DATA) return mockApiService.getTablesForRestaurant(restaurantId)
    return this.request(`/api/restaurants/${restaurantId}/tables`)
  }

  async addTable(payload: {
    number: string
    seats: number
    restaurant_id: number
  }) {
    if (USE_MOCK_DATA) return mockApiService.addTable(payload)
    return this.request('/api/tables', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async deleteTable(tableId: number) {
    if (USE_MOCK_DATA) return mockApiService.deleteTable(tableId)
    return this.request(`/api/tables/${tableId}`, {
      method: 'DELETE',
    })
  }

  /* ================= MENU ================= */
  // BACKEND: /api/menu/<restaurant_id>

  async getMenu(restaurantId: number) {
    if (USE_MOCK_DATA) return mockApiService.getMenu(restaurantId)
    return this.request(`/api/menu/${restaurantId}`)
  }

  async addMenuItem(payload: PlainObject) {
    if (USE_MOCK_DATA) return mockApiService.addMenuItem(payload as any)
    return this.request('/api/menu/', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async updateMenuItem(menuItemId: number, payload: PlainObject) {
    if (USE_MOCK_DATA) return mockApiService.updateMenuItem(menuItemId, payload)
    return this.request(`/api/menu/${menuItemId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  async deleteMenuItem(menuItemId: number) {
    if (USE_MOCK_DATA) return mockApiService.deleteMenuItem(menuItemId)
    return this.request(`/api/menu/${menuItemId}`, {
      method: 'DELETE',
    })
  }
  async reclassifyMenu(restaurantId: number) {
    if (USE_MOCK_DATA) return mockApiService.reclassifyMenu(restaurantId)
    return this.request(`/api/menu/${restaurantId}/reclassify`, {
      method: 'POST',
    })
  }

  /* ================= ORDERS (ADMIN) ================= */

  async getOrders(restaurantId: number) {
    if (USE_MOCK_DATA) return mockApiService.getOrders(restaurantId)
    return this.request(`/api/orders?restaurant_id=${restaurantId}/orders`)
  }

  async updateOrderStatus(orderId: number, status: string) {
    if (USE_MOCK_DATA) return mockApiService.updateOrderStatus(orderId, status)
    return this.request(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }


  /* ================= CUSTOMER ORDERS ================= */
  // BACKEND: customer_order_bp → /api/customer/orders

  async createOrder(payload: {
    restaurant_id: number
    table_number: number
    customerName: string
    customerPhone: string
    amount: number
    payment_method: 'upi' | 'razorpay'
    items: {
      id: number
      name: string
      price: number
      quantity: number
    }[]
  }) {
    if (USE_MOCK_DATA) return mockApiService.createOrder(payload)
    return this.request('/api/customer-order/create-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }


  /* ================= ANALYTICS ================= */

  async getAnalytics(
    restaurantId: number,
    params?: {
      timeRange?: '7days' | '30days' | 'custom'
      startDate?: string
      endDate?: string
    }
  ) {
    if (USE_MOCK_DATA) return mockApiService.getAnalytics(restaurantId)
    
    const query = new URLSearchParams()

    if (params?.timeRange) query.append('timeRange', params.timeRange)
    if (params?.startDate) query.append('startDate', params.startDate)
    if (params?.endDate) query.append('endDate', params.endDate)

    const qs = query.toString()

    return this.request(
      `/api/analytics/${restaurantId}${qs ? `?${qs}` : ''}`
    )
  }

  /* ================= SETTINGS ================= */

  async getRestaurantSettings(restaurantId: number) {
    if (USE_MOCK_DATA) return mockApiService.getRestaurantSettings(restaurantId)
    return this.request(`/api/settings/${restaurantId}`)
  }

  async updateRestaurantSettings(restaurantId: number, payload: PlainObject) {
    if (USE_MOCK_DATA) return mockApiService.updateRestaurantSettings(restaurantId, payload)
    return this.request(`/api/settings/${restaurantId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }
}

export const apiService = new ApiService()
