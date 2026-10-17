import { config } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const isServerError = statusCode >= 500;

  if (isServerError) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  }

  const message =
    isServerError && config.env === 'production'
      ? 'Ocurrió un error interno en el servidor.'
      : err.message;

  res.status(statusCode).json({
    error: {
      message,
      ...(err.details ? { details: err.details } : {}),
    },
  });
}
