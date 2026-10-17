import { Link } from 'react-router-dom';
import { availableSeats, formatDate, formatPrice } from '../utils/formatters.js';

export function CourseCard({ course }) {
  const seats = availableSeats(course.session);

  return (
    <article className="course-card">
      <div className="course-card__media" aria-hidden="true">
        <span className="course-card__category">{course.category}</span>
      </div>

      <div className="course-card__body">
        <h3 className="course-card__title">
          <Link to={`/cursos/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="course-card__description">{course.description}</p>

        <ul className="course-card__meta">
          <li>{formatDate(course.session.date)}</li>
          <li>{course.session.city}, {course.session.state}</li>
          <li>{course.instructor.name}</li>
        </ul>

        <div className="course-card__footer">
          <span className="course-card__price">{formatPrice(course.price, course.currency)}</span>
          <span className={`badge ${seats === 0 ? 'badge--danger' : 'badge--success'}`}>
            {seats === 0 ? 'Sin cupo' : `${seats} lugares`}
          </span>
        </div>
      </div>
    </article>
  );
}
