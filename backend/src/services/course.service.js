import { courses } from '../data/courses.js';

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const matchesSearch = (course, term) => {
  if (!term) return true;
  const haystack = [course.title, course.description, course.category, course.instructor.name]
    .map(normalize)
    .join(' ');
  return haystack.includes(term);
};

export function getAllCourses({ category, search } = {}) {
  const normalizedCategory = normalize(category);
  const normalizedSearch = normalize(search);

  return courses.filter((course) => {
    if (course.status !== 'published') return false;
    if (normalizedCategory && normalize(course.category) !== normalizedCategory) return false;
    return matchesSearch(course, normalizedSearch);
  });
}

export function getCourseById(id) {
  return courses.find((course) => course.id === id) ?? null;
}

export function getCategories() {
  const published = courses.filter((course) => course.status === 'published');
  return [...new Set(published.map((course) => course.category))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
}
