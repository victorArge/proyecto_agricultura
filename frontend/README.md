# AgroForma — Frontend

Interfaz web de AgroForma, construida con React, Vite y React Router.

## Requisitos

- Node.js 18 o superior
- Backend de AgroForma en ejecución (por defecto en `http://localhost:4000`)

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo (por defecto en http://localhost:5173)
npm run build    # Compilar para producción
npm run preview  # Previsualizar la compilación
npm run lint     # Ejecutar Oxlint
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta la URL de la API si es necesario:

```
VITE_API_URL=http://localhost:4000/api
```

## Estructura

```
src/
├── components/   Componentes reutilizables (Header, CourseCard, filtros, etc.)
├── layouts/      Plantillas de página (MainLayout con header y footer)
├── pages/        Vistas enrutadas (Inicio, catálogo, detalle, 404)
├── services/     Cliente HTTP y servicios de la API
├── hooks/        Hooks reutilizables (useCourses, useCourse, useDebouncedValue)
├── utils/        Funciones auxiliares (formato de precios, fechas, cupos)
├── assets/       Recursos estáticos
├── App.jsx       Definición de rutas
├── App.css       Estilos de layout y componentes
└── index.css     Variables de diseño, reset y utilidades
```
