import { verifyToken } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  const token = req.cookies?.token ?? null;
  if (!token) {
    return res.status(401).json({ error: { message: 'No autenticado' } });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: { message: 'Token inválido o expirado' } });
  }
  req.user = decoded; // { id, role, email }
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: { message: 'No autenticado' } });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: { message: 'Sin permisos' } });
    }
    next();
  };
}
