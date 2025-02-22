import z from 'zod';

export const TaskSchema = z.object({
    id : z.number().optional(),
    title : z.string().min(3,"El título debe tener mínimo 3 caracteres").max(100,"La condición no puede tener mas de 100 caracteres"),
    description : z.string().min(3,"La descripcion debe tener mínimo 3 caracteres").max(191,"La condición no puede tener mas de 191 caracteres"),
    done : z.boolean().default(false)
})

export type TaskType = z.infer<typeof TaskSchema>;