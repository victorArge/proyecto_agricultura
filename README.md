# AgroForma

Plataforma web que conecta a agricultores, productores y emprendedores del sector agrícola con
instructores que imparten capacitaciones **presenciales** de contabilidad, finanzas y administración
de empresas. La plataforma actúa como intermediaria y cobra una comisión por cada inscripción.

> Proyecto académico. Los pagos y las comisiones son **simulados**; no se procesa dinero real.

## Stack

| Capa          | Tecnología                                   |
| ------------- | -------------------------------------------- |
| Frontend      | React + Vite + React Router (JavaScript)     |
| Backend       | Node.js + Express (API REST)                 |
| Base de datos | PostgreSQL + Prisma ORM *(Etapa 2)*          |
| Entorno       | dotenv                                       |
| Herramientas  | Git, Postman                                 |

## Estado actual

Etapa 1 completada: estructura base, backend con datos de demostración en memoria y frontend con
catálogo funcionando. La persistencia con PostgreSQL/Prisma se implementará en la Etapa 2.

Endpoints disponibles:

- `GET /api/health`
- `GET /api/cursos` (filtros opcionales: `?categoria=` y `?search=`)
- `GET /api/cursos/:id`

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- PostgreSQL (solo a partir de la Etapa 2)

## Puesta en marcha

Instala las dependencias de cada carpeta y arranca ambos servidores en terminales separadas.

### Backend

```bash
cd backend
npm install
copy .env.example .env    # En Windows. En Linux/macOS: cp .env.example .env
npm run dev               # http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env    # En Windows. En Linux/macOS: cp .env.example .env
npm run dev               # http://localhost:5173
```

El frontend consume la API mediante la variable `VITE_API_URL` (por defecto `http://localhost:4000/api`).

## Estructura

```
Proyecto_Agricultura/
├── frontend/     Aplicación React (Vite)
├── backend/      API REST (Express)
├── PROJECT_CONTEXT.md   Contexto y hoja de ruta del proyecto
└── README.md
```

## Variables de entorno

**backend/.env**

| Variable             | Descripción                          | Por defecto             |
| -------------------- | ------------------------------------ | ----------------------- |
| `NODE_ENV`           | Entorno de ejecución                 | `development`           |
| `PORT`               | Puerto del servidor                  | `4000`                  |
| `CORS_ORIGIN`        | Origen permitido por CORS            | `http://localhost:5173` |
| `COMMISSION_PERCENT` | Comisión de la plataforma (%)        | `10`                    |

**frontend/.env**

| Variable       | Descripción             | Por defecto                    |
| -------------- | ----------------------- | ------------------------------ |
| `VITE_API_URL` | URL base de la API      | `http://localhost:4000/api`    |

## Hoja de ruta

1. **Etapa 1 — Inspección y preparación** *(completada)*
2. Etapa 2 — Base de datos (PostgreSQL + Prisma)
3. Etapa 3 — Autenticación y permisos por rol
4. Etapa 4 — Perfiles de instructor y gestión de cursos
5. Etapa 5 — Catálogo y experiencia del alumno
6. Etapa 6 — Inscripciones y control de cupos
7. Etapa 7 — Pagos simulados y comisiones
8. Etapa 8 — Paneles de instructor y administración
9. Etapa 9 — Pruebas y seguridad
10. Etapa 10 — Publicación y documentación

Consulta `PROJECT_CONTEXT.md` para el detalle de cada etapa.
