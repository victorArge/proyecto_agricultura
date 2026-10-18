import { getAllCourses, getCourseById, getCategories } from '../services/course.service.js';
import { validateCourseId } from '../validators/course.validator.js';
import { ApiError } from '../utils/ApiError.js';

export async function listCourses(req, res) {
  const { categoria, search } = req.query;

  const [courses, categories] = await Promise.all([
    getAllCourses({ category: categoria, search }),
    getCategories(),
  ]);

  res.json({
    data: courses,
    meta: { total: courses.length, categories },
  });
}

export async function getCourse(req, res) {
  const id = validateCourseId(req.params.id);
  const course = await getCourseById(id);

  if (!course) {
    throw new ApiError(404, `No se encontró el curso con id ${id}.`);
  }

  res.json({ data: course });
}
