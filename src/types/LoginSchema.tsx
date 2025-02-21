import z from 'zod';

export const LoginSchema = z.object({
    email : z.string().email("Ingresa un correo válido"),
    password : z.string().min(6,"La contraseña debe tener mínimo 6 caracteres")
})

export type LoginType = z.infer<typeof LoginSchema>;