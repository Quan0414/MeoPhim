import { ENABLE_LOGS } from '../config/env.js';

const LOG_PREFIX = '[meophim-frontend]';

function write(method, scope, message, details) {
  if (!ENABLE_LOGS) return;

  const text = `${LOG_PREFIX} ${scope}: ${message}`;
  if (details === undefined) {
    console[method](text);
    return;
  }

  console[method](text, details);
}

export const logger = {
  info(scope, message, details) {
    write('info', scope, message, details);
  },
  warn(scope, message, details) {
    write('warn', scope, message, details);
  },
  error(scope, message, details) {
    write('error', scope, message, details);
  },
};
