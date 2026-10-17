# AGROFORMA — Contexto general del proyecto

## 1. Descripción del proyecto

Estoy desarrollando una plataforma web llamada provisionalmente **AgroForma**, cuyo objetivo es conectar a agricultores, productores y emprendedores del sector agrícola con instructores que imparten capacitaciones presenciales sobre contabilidad, finanzas y administración de empresas.

El modelo de negocio consiste en funcionar como intermediario entre los alumnos y los instructores. Los instructores publican sus cursos, los alumnos consultan las capacitaciones disponibles y realizan inscripciones. La plataforma cobra una comisión por cada inscripción pagada.

La plataforma está inspirada en el modelo de marketplace educativo de Udemy, pero tiene una diferencia fundamental: **los cursos son presenciales y están dirigidos principalmente a las necesidades administrativas y financieras de los agricultores**.

El proyecto se desarrollará inicialmente como una aplicación universitaria funcional. Los pagos serán simulados, sin procesar dinero real.

El diseño debe ser moderno, profesional, intuitivo y adaptable a computadoras, tabletas y teléfonos celulares. La identidad visual utilizará principalmente verde y blanco, con elementos relacionados con la agricultura.

El nombre AgroForma es provisional y podrá modificarse posteriormente.

## 2. Objetivos principales

1. Conectar a alumnos con instructores que ofrecen capacitaciones presenciales.
2. Permitir a los instructores publicar y administrar sus cursos.
3. Permitir a los alumnos buscar cursos, consultar detalles e inscribirse.
4. Administrar fechas, horarios, ubicaciones y cupos de las capacitaciones.
5. Implementar un sistema de pagos simulados.
6. Calcular automáticamente las comisiones de la plataforma.
7. Proporcionar paneles diferenciados según el rol de cada usuario.
8. Permitir que los cursos incluyan enlaces a videos públicos de YouTube como material complementario.
9. Mantener registros organizados de usuarios, cursos, inscripciones y transacciones.
10. Diseñar una arquitectura que permita integrar pagos reales en el futuro.

## 3. Tipos de usuarios y permisos

### Alumno

Debe poder:
- Registrarse e iniciar sesión.
- Explorar y buscar cursos.
- Filtrar cursos por categoría.
- Consultar precios, fechas, horarios, ubicación, instructor y cupos.
- Inscribirse en una capacitación.
- Realizar pagos simulados.
- Consultar sus inscripciones y el estado de sus pagos.
- Consultar el historial de sus cursos.

### Instructor

Debe poder:
- Crear una cuenta y completar su perfil profesional.
- Registrar información de contacto y experiencia.
- Crear y editar sus cursos.
- Definir precio, descripción, categoría, fecha, horario, ubicación y cupo.
- Agregar enlaces de YouTube relacionados con el curso.
- Enviar cursos a revisión.
- Consultar el estado de aprobación de sus publicaciones.
- Consultar alumnos inscritos.
- Consultar sus ingresos brutos, comisiones y saldo neto calculado.

Los instructores no deben poder publicar directamente cursos sin aprobación cuando esta sea requerida por las reglas de administración.

### Administrador

Debe poder:
- Consultar y administrar usuarios.
- Revisar perfiles de instructores.
- Aprobar, rechazar o despublicar cursos.
- Consultar y administrar capacitaciones.
- Supervisar inscripciones y pagos simulados.
- Configurar el porcentaje de comisión.
- Consultar las comisiones generadas.
- Consultar reportes generales de la plataforma.

Los permisos deben validarse en el backend, no únicamente ocultando botones en el frontend.

## 4. Tecnologías seleccionadas

Utilizar las siguientes tecnologías como base:

### Frontend
- React.
- Vite.
- JavaScript.
- HTML y CSS.
- React Router para navegación entre páginas cuando se implemente el sistema de rutas.

### Backend
- Node.js.
- Express.
- API REST.
- Variables de entorno mediante dotenv.
- Validación de datos y manejo centralizado de errores.

### Base de datos
- PostgreSQL.
- Prisma ORM.

### Herramientas de desarrollo
- Visual Studio Code.
- Git y GitHub.
- Postman para probar la API.

Se pueden proponer herramientas adicionales cuando exista una justificación técnica clara, pero no cambiar el stack principal sin explicar los motivos y solicitar aprobación.

## 5. Estructura inicial esperada

La estructura objetivo del proyecto es:

agroforma/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── .gitignore
├── README.md
└── PROJECT_CONTEXT.md

Esta es la estructura objetivo, no una instrucción para recrear todas las carpetas inmediatamente. Primero debes inspeccionar los archivos existentes y adaptar el proyecto gradualmente.

## 6. Estado inicial conocido

Se ha definido una primera versión de la interfaz y una API de demostración.

El frontend inicial utiliza React y Vite. Incluye:
- Página de inicio.
- Identidad visual verde y blanca.
- Catálogo de cursos.
- Filtros por categoría.
- Tarjetas de cursos.
- Detalles de una capacitación.

El backend inicial utiliza Express. Incluye:
- GET /api/health
- GET /api/cursos
- GET /api/cursos/:id

Se proporcionaron tres cursos de demostración:
- Contabilidad básica para agricultores.
- Financiamiento para productores agrícolas.
- Administración de negocios agrícolas.

Los cursos iniciales están almacenados en memoria dentro del servidor. Todavía no representan información persistente de PostgreSQL.

**Importante:** estos archivos se propusieron como código inicial, pero debes comprobar cuáles existen realmente en el equipo. No asumas que ya fueron creados o ejecutados.

## 7. Etapas de desarrollo

### Etapa 1. Inspección y preparación
- Inspeccionar el repositorio y los archivos actuales.
- Revisar package.json y las dependencias.
- Comprobar que frontend y backend funcionan.
- Identificar errores existentes.
- Crear o revisar el README.
- Configurar Git y .gitignore.
- No sobrescribir código funcional sin necesidad.

Resultado esperado: entorno de desarrollo funcional y estructura organizada.

### Etapa 2. Base de datos
- Configurar PostgreSQL.
- Instalar y configurar Prisma.
- Crear el esquema inicial.
- Definir relaciones y restricciones.
- Configurar migraciones.
- Crear datos de demostración.

Entidades principales:
- User.
- InstructorProfile.
- Course.
- CourseSession.
- Enrollment.
- Payment.
- Commission.
- CourseVideo.

Las entidades pueden ajustarse cuando se definan correctamente las relaciones.

Un curso puede tener varias sesiones presenciales. Cada sesión tendrá fecha, horario, ubicación, cupo y estado.

### Etapa 3. Autenticación y autorización
- Registro de usuarios.
- Inicio y cierre de sesión.
- Contraseñas almacenadas con hash seguro.
- Autenticación mediante sesiones seguras o tokens correctamente implementados.
- Middleware de autenticación.
- Autorización por roles.
- Validación de entradas y protección de rutas.

No guardar contraseñas en texto plano. No incluir secretos en el frontend ni en el repositorio.

### Etapa 4. Gestión de instructores y cursos
- Crear y editar perfiles.
- Crear, editar y consultar cursos.
- Asociar cada curso con su instructor.
- Administrar categorías.
- Gestionar enlaces de YouTube.
- Validar los enlaces permitidos.
- Aprobar, rechazar y publicar cursos.
- Permitir que los instructores consulten el estado de sus publicaciones.

Los videos serán material complementario. No se implementará alojamiento propio de archivos de video.

### Etapa 5. Catálogo y experiencia del alumno
- Mejorar la página de inicio.
- Implementar búsqueda y filtros.
- Crear páginas de detalle.
- Mostrar fecha, hora, ubicación, precio e instructor.
- Mostrar disponibilidad de cupos.
- Implementar el panel del alumno.
- Mostrar las inscripciones y sus estados.

### Etapa 6. Inscripciones
- Registrar inscripciones en la base de datos.
- Comprobar que la sesión exista y esté publicada.
- Evitar inscripciones duplicadas.
- Controlar cupos desde el backend.
- Evitar sobreventa mediante transacciones o bloqueos adecuados en la base de datos.
- Definir estados como pendiente, confirmada, cancelada y completada.
- Establecer reglas para cancelaciones y reembolsos simulados.

### Etapa 7. Pagos simulados y comisiones
- Implementar un flujo de pago de demostración.
- No solicitar datos reales de tarjetas bancarias.
- No realizar cargos reales.
- Registrar las transacciones simuladas.
- Mantener la relación entre pago, inscripción e instructor.
- Configurar un porcentaje de comisión.
- Calcular el importe de la comisión y el importe neto del instructor.
- Registrar el estado de la operación.
- Evitar duplicar pagos o comisiones ante solicitudes repetidas.

Ejemplo:
Precio del curso: $1,000 MXN.
Comisión de la plataforma: 10%.
Comisión calculada: $100 MXN.
Importe neto del instructor: $900 MXN.

Este ejemplo no contempla gastos de procesamiento, impuestos ni reembolsos.

La comisión debe calcularse en el backend utilizando el porcentaje configurado y el importe registrado de la operación. La operación debe conservar los valores históricos utilizados para el cálculo.

### Etapa 8. Panel del instructor y administración
- Panel del instructor.
- Gestión de cursos y sesiones.
- Consulta de inscripciones.
- Resumen de ingresos y comisiones.
- Panel administrativo.
- Gestión de usuarios.
- Aprobación de publicaciones.
- Reportes de cursos, inscripciones y pagos simulados.

### Etapa 9. Pruebas y seguridad
- Pruebas de endpoints.
- Pruebas de autenticación y permisos.
- Validación de datos.
- Pruebas de inscripciones y cupos.
- Pruebas de cálculo de comisiones.
- Manejo de errores.
- Pruebas de diseño adaptable.
- Protección de variables de entorno.
- Pruebas de operaciones repetidas y consistencia de datos.

### Etapa 10. Publicación y documentación
- Preparar el entorno de producción.
- Configurar variables de entorno.
- Desplegar frontend y backend.
- Configurar una base de datos persistente.
- Revisar CORS y HTTPS.
- Documentar instalación, configuración y uso.
- Preparar una demostración universitaria.

La publicación comercial con pagos reales será una etapa futura independiente.

## 8. Requisitos de diseño

La identidad visual debe utilizar:
- Verde como color principal.
- Blanco como fondo predominante.
- Tonos neutros para textos y divisiones.
- Componentes visuales coherentes.
- Navegación sencilla.
- Diseño adaptable a dispositivos móviles.
- Formularios claros.
- Mensajes de error y confirmación comprensibles.
- Accesibilidad básica y contraste adecuado.

La plataforma está dirigida a agricultores y productores, por lo que debe priorizar la facilidad de uso y evitar interfaces innecesariamente complejas.

## 9. Reglas de trabajo para el agente

Actúa como desarrollador full-stack experimentado y trabaja directamente en el repositorio local.

Antes de comenzar:
1. Inspecciona la carpeta actual.
2. Lee los archivos de configuración y el código existente.
3. Comprueba qué partes funcionan.
4. Identifica la etapa de desarrollo en la que realmente se encuentra el proyecto.
5. Presenta un plan breve basado en el estado real del repositorio.

Durante el desarrollo:
- Trabaja por etapas pequeñas y verificables.
- Implementa código funcional, no solamente ejemplos o pseudocódigo.
- Explica brevemente qué archivos crearás o modificarás.
- Mantén separadas las responsabilidades del frontend, backend y base de datos.
- Evita duplicar lógica.
- Valida los datos en el servidor.
- Maneja los errores de manera consistente.
- Utiliza nombres claros y convenciones uniformes.
- Ejecuta las pruebas disponibles después de cada cambio importante.
- No avances a la siguiente etapa si la actual presenta errores fundamentales.
- No inventes que una prueba se ejecutó correctamente si no la ejecutaste.
- Actualiza el README cuando cambien los comandos o la configuración.
- No instales dependencias innecesarias.

Seguridad:
- No muestres ni expongas contraseñas, tokens o secretos.
- No sobrescribas archivos .env existentes sin autorización.
- No borres archivos ni datos importantes sin permiso.
- No ejecutes comandos destructivos ni migraciones que puedan perder datos sin explicar sus consecuencias y solicitar autorización.
- No realices despliegues, compras ni operaciones reales de pago.
- No habilites pagos reales en esta versión.

Si necesitas una decisión de negocio o técnica que no está definida, explica las alternativas y recomienda una. No detengas todo el desarrollo por decisiones que puedan posponerse.

## 10. Primera tarea concreta

Comienza exclusivamente con la Etapa 1.

1. Inspecciona el proyecto existente.
2. Identifica los archivos que ya existen y su estado.
3. Comprueba las versiones de Node.js y npm.
4. Revisa las dependencias del frontend y backend.
5. Ejecuta las comprobaciones de funcionamiento que sean seguras.
6. Identifica errores y problemas de configuración.
7. Propón los cambios mínimos necesarios para dejar una base estable.

No reconstruyas la aplicación desde cero si el código existente funciona.

Al terminar, informa:
- Qué encontraste.
- Qué funciona.
- Qué errores detectaste.
- Qué archivos modificaste.
- Qué pruebas ejecutaste y sus resultados.
- Qué sigue en la Etapa 2.

El objetivo final es desarrollar una plataforma web funcional, segura, organizada y documentada, que conecte a alumnos con instructores de capacitaciones presenciales para el sector agrícola y permita demostrar el funcionamiento de inscripciones, pagos simulados y comisiones.

Una recomendación importante
Como trabajarás individualmente con un agente que puede modificar archivos y ejecutar comandos, utiliza Git desde el principio. Antes de permitir cambios importantes, crea un punto de restauración con un commit. Así podrás revisar y recuperar el código si algo sale mal.
Y recuerda: el agente debe inspeccionar lo que realmente tienes en tu computadora. El código que diseñamos anteriormente es una propuesta inicial, pero todavía no sabemos si ya lo ejecutaste, si existen errores o si tu carpeta contiene otros archivos.
Con este documento, el otro agente tendrá el contexto del negocio, las tecnologías, las etapas y las reglas de trabajo necesarias para comenzar de forma ordenada.