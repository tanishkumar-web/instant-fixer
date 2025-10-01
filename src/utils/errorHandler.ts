// Utility functions for handling errors consistently across the application

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.response.data?.error || error.response.data?.message || 'An error occurred',
      status: error.response.status,
      code: error.response.data?.code
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'Network error. Please check your connection and try again.',
      code: 'NETWORK_ERROR'
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
};

export const getErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Please check your internet connection and try again.';
    case 'UNAUTHORIZED':
      return 'Your session has expired. Please log in again.';
    case 'FORBIDDEN':
      return 'You do not have permission to perform this action.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'SERVER_ERROR':
      return 'A server error occurred. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};