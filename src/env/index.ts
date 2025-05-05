import "dotenv";
import { z } from "zod";

//process.env: { NODE_ENV: ""}

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    PORT: z.coerce.number().default(3333), //coerce força o valor que vem da varivavel de ambiente para o tipo determinado em seguida, neste caso, number()

})

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Invalid environment variables", _env.error.format());
    throw new Error("Invalid environment variables."); //derruba a plicação caso as variaveis deem algum problema
}

export const env = _env.data;