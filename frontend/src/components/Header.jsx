import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link');

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="AgroForma, ir al inicio">
          <span className="brand__mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21c0-6 3-9 9-9 0 6-3 9-9 9Z" />
              <path d="M12 21C12 15 9 12 3 12c0 6 3 9 9 9Z" />
              <path d="M12 21V9" />
            </svg>
          </span>
          <span className="brand__text">
            Agro<span className="brand__accent">Forma</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Navegación principal">
          <NavLink to="/" end className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/cursos" className={navLinkClass}>
            Capacitaciones
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
