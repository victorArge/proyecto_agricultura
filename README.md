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
| Base de datos | PostgreSQL + Prisma ORM                     |
| Entorno       | dotenv                                       |
| Herramientas  | Git, Postman                                 |

## Estado actual

Etapa 2 completada: base de datos PostgreSQL + Prisma, esquema con relaciones, migración inicial, seed con datos de demostración y backend consumiendo la base de datos. Endpoints: `GET /api/health`, `GET /api/cursos`, `GET /api/cursos/:id`.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- PostgreSQL 14+ (instalado y corriendo)

## Puesta en marcha

### Backend

```bash
cd backend
npm install
copy .env.example .env    # Configura DATABASE_URL con tus credenciales
npm run db:migrate        # Aplica la migración inicial
npm run db:seed           # Crea datos de demostración (opcional si ya los tienes)
npm run dev               # http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev               # http://localhost:5173
```

## Scripts útiles

**Backend**

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Arranca el servidor con recarga automática |
| `npm run start` | Arranca el servidor en producción |
| `npm run db:generate` | Genera el cliente de Prisma |
| `npm run db:migrate` | Crea/aplica migraciones en modo desarrollo |
| `npm run db:seed` | Ejecuta el archivo de semillas |
| `npm run db:studio` | Abre Prisma Studio |
| `npm run db:reset` | Restablece la base de datos (elimina y vuelve a sembrar) |

**Frontend**

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (http://localhost:5173) |
| `npm run build` | Compilación para producción (`dist/`) |
| `npm run preview` | Previsualiza la compilación |
| `npm run lint` | Ejecuta Oxlint |

## Estructura

```
Proyecto_Agricultura/
├── frontend/     Aplicación React (Vite)
├── backend/      API REST (Express + Prisma)
├── PROJECT_CONTEXT.md
└── README.md
```

## Cuentas de demostración

Tras ejecutar `npm run db:seed` (contraseña: `demo1234`):

- `admin@agroforma.mx` (ADMIN)
- `maria.lopez@agroforma.mx` (INSTRUCTOR)
- `carlos.ramirez@agroforma.mx` (INSTRUCTOR)
- `laura.gutierrez@agroforma.mx` (INSTRUCTOR)
- `juan.perez@correo.mx` (STUDENT)
- `ana.sanchez@correo.mx` (STUDENT)
- `luis.ramos@correo.mx` (STUDENT)

## Hoja de ruta

1. Etapa 1 — Inspección y preparación *(completada)*
2. Etapa 2 — Base de datos (PostgreSQL + Prisma) *(completada)*
3. Etapa 3 — Autenticación y permisos por rol
4. Etapa 4 — Perfiles de instructor y gestión de cursos
5. Etapa 5 — Catálogo y experiencia del alumno
6. Etapa 6 — Inscripciones y control de cupos
7. Etapa 7 — Pagos simulados y comisiones
8. Etapa 8 — Paneles de instructor y administración
9. Etapa 9 — Pruebas y seguridad
10. Etapa 10 — Publicación y documentación
