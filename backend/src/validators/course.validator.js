import { ApiError } from '../utils/ApiError.js';

export function validateCourseId(rawId) {
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, 'El identificador del curso debe ser un número entero positivo.');
  }

  return id;
}
