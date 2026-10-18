import { prisma } from '../config/prisma.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
};

export async function register(req, res) {
  const { email, password, firstName, lastName, role = 'STUDENT' } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new ApiError(409, 'El email ya está registrado');
  const hashed = hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, firstName, lastName, role },
    select: { id: true, email: true, firstName: true, lastName: true, role: true },
  });
  const token = signToken({ id: user.id, role: user.role, email: user.email });
  res.cookie('token', token, COOKIE_OPTIONS);
  res.status(201).json({ data: { user, token } });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.password)) {
    throw new ApiError(401, 'Credenciales inválidas');
  }
  const token = signToken({ id: user.id, role: user.role, email: user.email });
  res.cookie('token', token, COOKIE_OPTIONS);
  res.json({
    data: {
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      token,
    },
  });
}

export function logout(req, res) {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: 'Sesión cerrada' });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, phone: true },
  });
  res.json({ data: user });
}
