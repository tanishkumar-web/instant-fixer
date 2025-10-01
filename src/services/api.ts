// API service for handling all HTTP requests
import { handleApiError, ApiError } from '../utils/errorHandler';

// API base URL - in production, this should be an environment variable
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T; error: null } | { data: null; error: ApiError }> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    const response = await fetch(url, config);
    
    // Handle successful responses
    if (response.ok) {
      const data = await response.json();
      return { data, error: null };
    }
    
    // Handle error responses
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'An error occurred' };
    }
    
    const error: ApiError = {
      message: errorData.message || 'An error occurred',
      status: response.status,
    };
    
    return { data: null, error };
  } catch (error) {
    const apiError = handleApiError(error);
    return { data: null, error: apiError };
  }
};

// Auth API functions
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ token: string; refreshToken: string; data: any }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (name: string, email: string, password: string, role: string) => {
    return apiRequest<{ token: string; refreshToken: string; data: any }>('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  },
  
  refreshToken: async (refreshToken: string) => {
    return apiRequest<{ token: string; refreshToken: string }>('/users/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
  
  getMe: async (token: string) => {
    return apiRequest<any>('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Service API functions
export const servicesApi = {
  getAll: async (token?: string) => {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    return apiRequest<any[]>('/services', { headers });
  },
  
  getById: async (id: string, token?: string) => {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    return apiRequest<any>(`/services/${id}`, { headers });
  },
  
  create: async (serviceData: any, token: string) => {
    return apiRequest<any>('/services', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });
  },
};

// Booking API functions
export const bookingsApi = {
  getAll: async (token: string) => {
    return apiRequest<any[]>('/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  
  getById: async (id: string, token: string) => {
    return apiRequest<any>(`/bookings/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  
  create: async (bookingData: any, token: string) => {
    return apiRequest<any>('/bookings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
  },
};

// Helper API functions
export const helpersApi = {
  getAll: async (token?: string) => {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    return apiRequest<any[]>('/helpers', { headers });
  },
  
  getById: async (id: string, token?: string) => {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    return apiRequest<any>(`/helpers/${id}`, { headers });
  },
};

export default {
  authApi,
  servicesApi,
  bookingsApi,
  helpersApi,
};