import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api, { authApi } from '../services/api';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'helper' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'user' | 'helper') => Promise<{ success: boolean; error?: string }>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return false;
    }
    
    try {
      const result = await authApi.refreshToken(refreshToken);
      
      if (result.data) {
        localStorage.setItem('token', result.data.token);
        if (result.data.refreshToken) {
          localStorage.setItem('refreshToken', result.data.refreshToken);
        }
        return true;
      } else {
        // Refresh token is invalid, logout user
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  }, []);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      
      if (token) {
        try {
          const result = await authApi.getMe(token);
          
          if (result.data) {
            setUser({
              id: result.data._id,
              name: result.data.name,
              email: result.data.email,
              role: result.data.role,
              avatar: result.data.avatar,
              phone: result.data.phone,
              location: result.data.location,
              createdAt: result.data.createdAt,
            });
          } else if (result.error?.status === 401) {
            // Token might be expired, try to refresh
            const refreshed = await refreshToken();
            if (!refreshed) {
              // If refresh failed, remove token
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('rememberMe');
            }
          } else {
            // Other error, remove tokens
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('rememberMe');
          }
        } catch (error) {
          console.error('Error checking auth status:', error);
          // Only remove tokens if not in remember me mode
          const rememberMe = localStorage.getItem('rememberMe') === 'true';
          if (!rememberMe) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('rememberMe');
          }
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, [refreshToken]);

  // Set up token refresh interval
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Decode token to check expiration (simplified)
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiration = payload.exp * 1000;
          const now = Date.now();
          
          // If token expires in less than 5 minutes, refresh it
          if (expiration - now < 5 * 60 * 1000) {
            await refreshToken();
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }, 60 * 1000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, refreshToken]);

  // Login function
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const result = await authApi.login(email, password);
      
      if (result.data) {
        // Save token and refresh token to localStorage
        localStorage.setItem('token', result.data.token);
        if (result.data.refreshToken) {
          localStorage.setItem('refreshToken', result.data.refreshToken);
        }
        localStorage.setItem('rememberMe', rememberMe.toString());
        
        // Set user data
        setUser({
          id: result.data.data._id,
          name: result.data.data.name,
          email: result.data.data.email,
          role: result.data.data.role,
          avatar: result.data.data.avatar,
          phone: result.data.data.phone,
          location: result.data.data.location,
          createdAt: result.data.data.createdAt,
        });
        
        return { success: true };
      } else {
        return { success: false, error: result.error?.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('rememberMe');
    setUser(null);
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: 'user' | 'helper') => {
    try {
      const result = await authApi.register(name, email, password, role);
      
      if (result.data) {
        // Save token and refresh token to localStorage
        localStorage.setItem('token', result.data.token);
        if (result.data.refreshToken) {
          localStorage.setItem('refreshToken', result.data.refreshToken);
        }
        localStorage.setItem('rememberMe', 'false'); // Default to not remember for registration
        
        // Set user data
        setUser({
          id: result.data.data._id,
          name: result.data.data.name,
          email: result.data.data.email,
          role: result.data.data.role,
          avatar: result.data.data.avatar,
          phone: result.data.data.phone,
          location: result.data.data.location,
          createdAt: result.data.data.createdAt,
        });
        
        return { success: true };
      } else {
        return { success: false, error: result.error?.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};