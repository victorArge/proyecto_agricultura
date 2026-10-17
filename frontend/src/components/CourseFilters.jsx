export function CourseFilters({
  categories,
  category,
  search,
  onCategoryChange,
  onSearchChange,
  resultCount,
}) {
  return (
    <div className="filters">
      <label className="field filters__search">
        <span className="field__label">Buscar capacitación</span>
        <input
          type="search"
          className="input"
          placeholder="Curso, tema o instructor"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="filters__categories" role="group" aria-label="Filtrar por categoría">
        <button
          type="button"
          className={`chip ${category === '' ? 'chip--active' : ''}`}
          onClick={() => onCategoryChange('')}
        >
          Todas
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${category === item ? 'chip--active' : ''}`}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="filters__count" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'capacitación encontrada' : 'capacitaciones encontradas'}
      </p>
    </div>
  );
}
