import { apiGet } from './api.js';

export async function fetchCourses({ category, search } = {}, { signal } = {}) {
  const query = new URLSearchParams();
  if (category) query.set('categoria', category);
  if (search) query.set('search', search);

  const queryString = query.toString();
  const suffix = queryString ? `?${queryString}` : '';
  const body = await apiGet(`/cursos${suffix}`, { signal });

  return {
    courses: body.data,
    categories: body.meta?.categories ?? [],
  };
}

export async function fetchCourseById(id, { signal } = {}) {
  const body = await apiGet(`/cursos/${id}`, { signal });
  return body.data;
}
