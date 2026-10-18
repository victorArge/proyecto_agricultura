import { prisma } from '../config/prisma.js';

const ACTIVE_ENROLLMENT_STATUSES = ['PENDING', 'CONFIRMED'];

const courseInclude = {
  instructor: { include: { user: true } },
  videos: { orderBy: { id: 'asc' } },
  sessions: {
    orderBy: { startsAt: 'asc' },
    include: {
      _count: {
        select: {
          enrollments: { where: { status: { in: ACTIVE_ENROLLMENT_STATUSES } } },
        },
      },
    },
  },
};

const pad = (value) => String(value).padStart(2, '0');

const toDateString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const toTimeString = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

function pickSession(sessions) {
  if (sessions.length === 0) return null;

  const scheduled = sessions.filter((session) => session.status === 'SCHEDULED');
  const now = new Date();
  const upcoming = scheduled.find((session) => session.startsAt >= now);

  return upcoming ?? scheduled[0] ?? sessions[0];
}

function mapCourse(course) {
  const session = pickSession(course.sessions);

  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    level: course.level,
    description: course.description,
    longDescription: course.longDescription,
    price: Number(course.price),
    currency: course.currency,
    modality: course.modality === 'PRESENCIAL' ? 'Presencial' : course.modality,
    status: course.status,
    instructor: {
      name: `${course.instructor.user.firstName} ${course.instructor.user.lastName}`,
      title: course.instructor.headline,
      bio: course.instructor.bio,
    },
    videos: course.videos.map((video) => ({ title: video.title, url: video.url })),
    session: session
      ? {
          id: session.id,
          date: toDateString(session.startsAt),
          startTime: toTimeString(session.startsAt),
          endTime: toTimeString(session.endsAt),
          location: session.location,
          address: session.address,
          city: session.city,
          state: session.state,
          capacity: session.capacity,
          enrolled: session._count.enrollments,
          status: session.status,
        }
      : null,
  };
}

function buildWhere({ category, search } = {}) {
  const where = { status: 'PUBLISHED' };

  if (category) {
    where.category = { equals: category, mode: 'insensitive' };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
      {
        instructor: {
          user: {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
            ],
          },
        },
      },
    ];
  }

  return where;
}

export async function getAllCourses(filters = {}) {
  const courses = await prisma.course.findMany({
    where: buildWhere(filters),
    include: courseInclude,
    orderBy: { id: 'asc' },
  });

  return courses.map(mapCourse);
}

export async function getCourseById(id) {
  const course = await prisma.course.findFirst({
    where: { id, status: 'PUBLISHED' },
    include: courseInclude,
  });

  return course ? mapCourse(course) : null;
}

export async function getCategories() {
  const rows = await prisma.course.findMany({
    where: { status: 'PUBLISHED' },
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });

  return rows.map((row) => row.category);
}
