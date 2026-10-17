import { Link } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard.jsx';
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback.jsx';
import { useCourses } from '../hooks/useCourses.js';

const steps = [
  {
    title: 'Explora',
    text: 'Consulta las capacitaciones presenciales por categoría, fecha y ubicación.',
  },
  {
    title: 'Inscríbete',
    content: '',
    text: 'Regístrate en la sesión que más te convenga y realiza un pago simulado.',
  },
  {
    title: 'Aprende',
    text: 'Asiste a la capacitación presencial con instructores especializados del sector agrícola.',
  },
];

export function HomePage() {
  const { courses, status, error, reload } = useCourses();
  const featured = courses.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">Capacitaciones presenciales para el campo</p>
          <h1 className="hero__title">
            Formación en contabilidad, finanzas y administración para el sector agrícola
          </h1>
          <p className="hero__lead">
            AgroForma conecta a agricultores, productores y emprendedores con instructores que imparten
            capacitaciones presenciales para hacer crecer sus negocios.
          </p>
          <div className="hero__actions">
            <Link to="/cursos" className="btn btn--primary">
              Ver capacitaciones
            </Link>
            <Link to="/cursos?categoria=Finanzas" className="btn btn--outline">
              Explorar finanzas
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__header">
            <h2 className="section__title">Capacitaciones destacadas</h2>
            <Link to="/cursos" className="link">
              Ver todas
            </Link>
          </header>

          {status === 'loading' ? <Loading /> : null}
          {status === 'error' ? <ErrorMessage message={error.message} onRetry={reload} /> : null}
          {status === 'success' && featured.length === 0 ? (
            <EmptyState message="Todavía no hay capacitaciones publicadas." />
          ) : null}
          {status === 'success' && featured.length > 0 ? (
            <div className="course-grid">
              {featured.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <h2 className="section__title">¿Cómo funciona?</h2>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title} className="steps__item">
                <span className="steps__number">{index + 1}</span>
                <h3 className="steps__item-title">{step.title}</h3>
                <p className="steps__item-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
