import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
  firstName: z.string().min(2, { message: 'Nombre requerido' }),
  lastName: z.string().min(2, { message: 'Apellido requerido' }),
  role: z.enum(['STUDENT', 'INSTRUCTOR']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Contraseña requerida' }),
});
