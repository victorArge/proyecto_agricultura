import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { courseRouter } from './course.routes.js';
import { authRouter } from './auth.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/cursos', courseRouter);
apiRouter.use('/auth', authRouter);
