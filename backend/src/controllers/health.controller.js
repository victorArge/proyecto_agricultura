import { config } from '../config/env.js';

export function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'agroforma-api',
    env: config.env,
    timestamp: new Date().toISOString(),
  });
}
