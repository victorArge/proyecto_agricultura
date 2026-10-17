import { useSearchParams } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard.jsx';
import { CourseFilters } from '../components/CourseFilters.jsx';
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback.jsx';
import { useCourses } from '../hooks/useCourses.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';

export function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('categoria') ?? '';
  const search = searchParams.get('busqueda') ?? '';
  const debouncedSearch = useDebouncedValue(search, 300);

  const { courses, categories, status, error, reload } = useCourses({
    category,
    search: debouncedSearch,
  });

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <section className="section">
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">Catálogo</p>
          <h1 className="page-title">Capacitaciones disponibles</h1>
          <p className="page-subtitle">
            Busca por tema o filtra por categoría para encontrar la capacitación ideal.
          </p>
        </header>

        <CourseFilters
          categories={categories}
          category={category}
          search={search}
          onCategoryChange={(value) => updateParam('categoria', value)}
          onSearchChange={(value) => updateParam('busqueda', value)}
          resultCount={courses.length}
        />

        {status === 'loading' ? <Loading /> : null}
        {status === 'error' ? <ErrorMessage message={error.message} onRetry={reload} /> : null}
        {status === 'success' && courses.length === 0 ? (
          <EmptyState message="Prueba con otra palabra o selecciona otra categoría." />
        ) : null}
        {status === 'success' && courses.length > 0 ? (
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
