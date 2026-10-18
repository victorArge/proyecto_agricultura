import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      name: 'AgroForma API',
      version: '0.1.0',
      endpoints: ['/api/health', '/api/cursos', '/api/cursos/:id', '/api/auth/register', '/api/auth/login', '/api/auth/logout', '/api/auth/me'],
    });
  });

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
