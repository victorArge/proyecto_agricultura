import { Link, useParams } from 'react-router-dom';
import { ErrorMessage, Loading } from '../components/Feedback.jsx';
import { useCourse } from '../hooks/useCourse.js';
import { availableSeats, formatDate, formatPrice, formatTimeRange } from '../utils/formatters.js';

export function CourseDetailPage() {
  const { id } = useParams();
  const { course, status, error, reload } = useCourse(id);

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <Loading />
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="section">
        <div className="container">
          <ErrorMessage message={error.message} onRetry={reload} />
          <Link to="/cursos" className="link">
            Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  if (!course) return null;

  const seats = availableSeats(course.session);
  const isFull = seats === 0;

  return (
    <section className="section">
      <div className="container">
        <Link to="/cursos" className="back-link">
          Volver al catálogo
        </Link>

        <div className="course-detail">
          <div className="course-detail__main">
            <div className="course-detail__tags">
              <span className="badge badge--soft">{course.category}</span>
              <span className="badge badge--muted">{course.level}</span>
            </div>

            <h1 className="course-detail__title">{course.title}</h1>
            <p className="course-detail__lead">{course.description}</p>
            <p className="course-detail__instructor">
              Impartido por <strong>{course.instructor.name}</strong> · {course.instructor.title}
            </p>

            <section className="course-block">
              <h2 className="course-block__title">Sobre la capacitación</h2>
              <p>{course.longDescription}</p>
            </section>

            {course.videos?.length > 0 ? (
              <section className="course-block">
                <h2 className="course-block__title">Material complementario</h2>
                <ul className="video-list">
                  {course.videos.map((video) => (
                    <li key={video.url} className="video-list__item">
                      <a href={video.url} target="_blank" rel="noreferrer noopener">
                        {video.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="course-block">
              <h2 className="course-block__title">Instructor</h2>
              <div className="instructor-card">
                <p className="instructor-card__name">{course.instructor.name}</p>
                <p className="instructor-card__role">{course.instructor.title}</p>
                <p className="instructor-card__bio">{course.instructor.bio}</p>
              </div>
            </section>
          </div>

          <aside className="course-detail__aside">
            <div className="enroll-card">
              <p className="enroll-card__price">{formatPrice(course.price, course.currency)}</p>
              <span className={`badge ${isFull ? 'badge--danger' : 'badge--success'}`}>
                {isFull ? 'Sin cupo' : `${seats} lugares disponibles`}
              </span>

              <dl className="session-list">
                <div className="session-list__row">
                  <dt>Fecha</dt>
                  <dd>{formatDate(course.session.date)}</dd>
                </div>
                <div className="session-list__row">
                  <dt>Horario</dt>
                  <dd>{formatTimeRange(course.session.startTime, course.session.endTime)}</dd>
                </div>
                <div className="session-list__row">
                  <dt>Modalidad</dt>
                  <dd>{course.modality}</dd>
                </div>
                <div className="session-list__row">
                  <dt>Lugar</dt>
                  <dd>{course.session.location}</dd>
                </div>
                <div className="session-list__row">
                  <dt>Dirección</dt>
                  <dd>
                    {course.session.address}, {course.session.city}, {course.session.state}
                  </dd>
                </div>
                <div className="session-list__row">
                  <dt>Cupo</dt>
                  <dd>
                    {course.session.enrolled} de {course.session.capacity} inscritos
                  </dd>
                </div>
              </dl>

              <button type="button" className="btn btn--primary btn--block" disabled={isFull}>
                {isFull ? 'Capacitación llena' : 'Inscribirme'}
              </button>
              <p className="enroll-card__note">
                La inscripción y el pago simulado se habilitarán en una etapa posterior.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
