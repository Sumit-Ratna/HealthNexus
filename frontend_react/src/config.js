// Central API configuration
// In development, falls back to localhost:8080
// In production, set VITE_API_URL environment variable on your hosting platform
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
