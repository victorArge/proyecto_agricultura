import { getAllCourses, getCourseById, getCategories } from '../services/course.service.js';
import { validateCourseId } from '../validators/course.validator.js';
import { ApiError } from '../utils/ApiError.js';

export function listCourses(req, res) {
  const { categoria, search } = req.query;
  const courses = getAllCourses({ category: categoria, search });

  res.json({
    data: courses,
    meta: { total: courses.length, categories: getCategories() },
  });
}

export function getCourse(req, res) {
  const id = validateCourseId(req.params.id);
  const course = getCourseById(id);

  if (!course) {
    throw new ApiError(404, `No se encontró el curso con id ${id}.`);
  }

  res.json({ data: course });
}
