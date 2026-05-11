export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/v1/api';

export const ENABLE_LOGS = import.meta.env.DEV || import.meta.env.VITE_ENABLE_LOGS === 'true';

export const APP_MODE = import.meta.env.MODE;
