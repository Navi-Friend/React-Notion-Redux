import { z } from "zod";

export const User = z.object({
    email: z
        .string()
        .email({ message: "Email must has format like 'example@corp.com'." }),
    password: z
        .string({ validation: "password" })
        .min(8, { message: "Password must has at least 8 symbols." })
        .regex(/[A-ZА-Я]/, {
            message: "Password must has at least one capital letter.",
        })
        .regex(/[a-zа-я]/, {
            message: "Password must has at least one lowercase letter.",
        })
        .regex(/[0-9]/, {
            message: "Password must has at least one number.",
        }),
});
