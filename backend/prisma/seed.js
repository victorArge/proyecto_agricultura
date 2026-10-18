import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password.js';

const prisma = new PrismaClient();

// Contraseña de todas las cuentas de demostración (se cambiará en la Etapa 3).
const DEMO_PASSWORD = 'demo1234';

const instructors = [
  {
    email: 'maria.lopez@agroforma.mx',
    firstName: 'María Fernanda',
    lastName: 'López',
    phone: '+52 222 111 2233',
    headline: 'Contadora pública y asesora rural',
    bio: 'Contadora con 12 años de experiencia asesorando a productores agrícolas en el manejo de sus finanzas.',
    yearsExperience: 12,
  },
  {
    email: 'carlos.ramirez@agroforma.mx',
    firstName: 'Carlos',
    lastName: 'Ramírez Ortega',
    phone: '+52 222 111 2244',
    headline: 'Especialista en finanzas agropecuarias',
    bio: 'Asesor financiero con 15 años de experiencia vinculando a productores con fondos de desarrollo rural.',
    yearsExperience: 15,
  },
  {
    email: 'laura.gutierrez@agroforma.mx',
    firstName: 'Laura',
    lastName: 'Gutiérrez Méndez',
    phone: '+52 222 111 2255',
    headline: 'Consultora en administración rural',
    bio: 'Consultora en administración de empresas agropecuarias y acompañamiento a cooperativas.',
    yearsExperience: 9,
  },
];

const courses = [
  {
    slug: 'contabilidad-basica-para-agricultores',
    instructorEmail: 'maria.lopez@agroforma.mx',
    title: 'Contabilidad básica para agricultores',
    category: 'Contabilidad',
    level: 'Principiante',
    description:
      'Aprende a registrar ingresos, gastos y costos de producción para conocer la rentabilidad real de tu parcela.',
    longDescription:
      'Capacitación presencial pensada para productores que necesitan ordenar las finanzas de su unidad productiva. Aprenderás a registrar ingresos y egresos, separar el dinero del negocio del personal y calcular el costo real de producir, para tomar mejores decisiones sobre precios y siembra.',
    price: 1000,
    session: {
      startsAt: new Date('2026-11-15T09:00:00'),
      endsAt: new Date('2026-11-15T13:00:00'),
    },
    videos: [
      {
        title: 'Introducción a la contabilidad agrícola',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ],
  },
  {
    slug: 'financiamiento-para-productores-agricolas',
    instructorEmail: 'carlos.ramirez@agroforma.mx',
    title: 'Financiamiento para productores agrícolas',
    category: 'Finanzas',
    level: 'Intermedio',
    description:
      'Conoce créditos, subsidios y apoyos gubernamentales para hacer crecer tu producción.',
    longDescription:
      'Taller práctico sobre las opciones de financiamiento disponibles para el sector agrícola: crédito bancario, financieras rurales, programas de gobierno y cooperativas. Revisaremos requisitos, tasas de interés, plazos y cómo elaborar un plan de negocio que respalde tu solicitud.',
    price: 1500,
    session: {
      startsAt: new Date('2026-11-22T10:00:00'),
      endsAt: new Date('2026-11-22T15:00:00'),
    },
    videos: [
      {
        title: 'Cómo preparar una solicitud de crédito',
        url: 'https://www.youtube.com/watch?v=ojY8sU_dNGg',
      },
    ],
  },
  {
    slug: 'administracion-de-negocios-agricolas',
    instructorEmail: 'laura.gutierrez@agroforma.mx',
    title: 'Administración de negocios agrícolas',
    category: 'Administración',
    level: 'Intermedio',
    description:
      'Organiza tu unidad de producción como una empresa: planeación, inventarios, personal y comercialización.',
    longDescription:
      'Curso orientado a productores que quieren profesionalizar su negocio. Abordaremos planeación estratégica, control de inventarios, manejo de personal, costos de operación y estrategias de comercialización para vender mejor y reducir pérdidas.',
    price: 1200,
    session: {
      startsAt: new Date('2026-12-05T09:30:00'),
      endsAt: new Date('2026-12-05T14:30:00'),
    },
    videos: [
      {
        title: 'Planeación de una empresa agrícola',
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      },
      {
        title: 'Control de inventarios en el campo',
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      },
    ],
  },
];

async function resetDatabase() {
  await prisma.commission.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.courseVideo.deleteMany();
  await prisma.courseSession.deleteMany();
  await prisma.course.deleteMany();
  await prisma.instructorProfile.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await resetDatabase();

  const password = hashPassword(DEMO_PASSWORD);

  await prisma.user.create({
    data: {
      email: 'admin@agroforma.mx',
      password,
      firstName: 'Administrador',
      lastName: 'AgroForma',
      role: 'ADMIN',
    },
  });

  const instructorProfiles = new Map();
  for (const instructor of instructors) {
    const user = await prisma.user.create({
      data: {
        email: instructor.email,
        password,
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        phone: instructor.phone,
        role: 'INSTRUCTOR',
        instructorProfile: {
          create: {
            headline: instructor.headline,
            bio: instructor.bio,
            yearsExperience: instructor.yearsExperience,
            status: 'APPROVED',
          },
        },
      },
      include: { instructorProfile: true },
    });
    instructorProfiles.set(instructor.email, user.instructorProfile);
  }

  for (const course of courses) {
    const instructorProfile = instructorProfiles.get(course.instructorEmail);

    await prisma.course.create({
      data: {
        instructorId: instructorProfile.id,
        slug: course.slug,
        title: course.title,
        category: course.category,
        level: course.level,
        description: course.description,
        longDescription: course.longDescription,
        price: course.price,
        currency: 'MXN',
        modality: 'PRESENCIAL',
        status: 'PUBLISHED',
        videos: { create: course.videos },
        sessions: {
          create: [
            {
              startsAt: course.session.startsAt,
              endsAt: course.session.endsAt,
              location: 'Centro de Capacitación AgroForma',
              address: 'Av. del Campo 120, Col. Centro',
              city: 'Puebla',
              state: 'Puebla',
              capacity: 25,
              status: 'SCHEDULED',
            },
          ],
        },
      },
    });
  }

  const students = [];
  for (const student of [
    { email: 'juan.perez@correo.mx', firstName: 'Juan', lastName: 'Pérez' },
    { email: 'ana.sanchez@correo.mx', firstName: 'Ana', lastName: 'Sánchez' },
    { email: 'luis.ramos@correo.mx', firstName: 'Luis', lastName: 'Ramos' },
  ]) {
    const user = await prisma.user.create({
      data: { ...student, password, role: 'STUDENT' },
    });
    students.push(user);
  }

  const sessions = await prisma.courseSession.findMany({
    include: { course: { select: { slug: true } } },
  });
  const sessionOf = (slug) => sessions.find((session) => session.course.slug === slug);

  await prisma.enrollment.createMany({
    data: [
      {
        sessionId: sessionOf('contabilidad-basica-para-agricultores').id,
        studentId: students[0].id,
        status: 'CONFIRMED',
      },
      {
        sessionId: sessionOf('contabilidad-basica-para-agricultores').id,
        studentId: students[1].id,
        status: 'CONFIRMED',
      },
      {
        sessionId: sessionOf('administracion-de-negocios-agricolas').id,
        studentId: students[0].id,
        status: 'PENDING',
      },
    ],
  });

  console.log('Datos de demostración creados correctamente.');
  console.log(`Cuentas demo (contraseña: ${DEMO_PASSWORD}):`);
  console.log('  admin@agroforma.mx         (ADMIN)');
  console.log('  maria.lopez@agroforma.mx   (INSTRUCTOR)');
  console.log('  carlos.ramirez@agroforma.mx (INSTRUCTOR)');
  console.log('  laura.gutierrez@agroforma.mx (INSTRUCTOR)');
  console.log('  juan.perez@correo.mx       (STUDENT)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Error al crear los datos de demostración:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
