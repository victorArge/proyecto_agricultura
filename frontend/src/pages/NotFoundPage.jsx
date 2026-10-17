import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="section">
      <div className="container not-found">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">Página no encontrada</h1>
        <p className="not-found__text">La página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn btn--primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
