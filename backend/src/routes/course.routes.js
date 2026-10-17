import { Router } from 'express';
import { listCourses, getCourse } from '../controllers/course.controller.js';

export const courseRouter = Router();

courseRouter.get('/', listCourses);
courseRouter.get('/:id', getCourse);
