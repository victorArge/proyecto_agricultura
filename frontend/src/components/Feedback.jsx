export function Loading({ label = 'Cargando...' }) {
  return (
    <div className="feedback" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="feedback feedback--error" role="alert">
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn--outline" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title = 'Sin resultados', message }) {
  return (
    <div className="feedback feedback--empty">
      <p className="feedback__title">{title}</p>
      {message ? <p>{message}</p> : null}
    </div>
  );
}
