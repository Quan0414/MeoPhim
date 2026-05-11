import { joinUrl } from '../utils/url.js';
import { logger } from '../utils/logger.js';
import { API_BASE_URL } from '../config/env.js';

export async function apiGet(path, params = {}) {
  const startedAt = performance.now();
  const url = new URL(joinUrl(API_BASE_URL, path));
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && `${value}`.trim() !== '') {
      url.searchParams.set(key, value);
    }
  });

  logger.info('api', 'GET started', { path, params, url: url.toString() });

  try {
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    const data = await response.json().catch(() => null);
    const durationMs = Math.round(performance.now() - startedAt);

    if (!response.ok) {
      const error = new Error(data?.message || `Request failed: ${response.status}`);
      logger.error('api', 'GET failed', { path, status: response.status, durationMs, error: error.message });
      throw error;
    }
    if (data?.status === 'error') {
      const error = new Error(data.message || 'Khong the tai du lieu');
      logger.error('api', 'GET returned API error', { path, status: response.status, durationMs, error: error.message });
      throw error;
    }

    logger.info('api', 'GET completed', { path, status: response.status, durationMs });
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      logger.error('api', 'GET network error', { path, url: url.toString(), error: error.message });
    }
    throw error;
  }
}
