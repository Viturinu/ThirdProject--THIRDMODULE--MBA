import fastify from "fastify";
import { register } from "./http/controller/register";
import cookie from "@fastify/cookie"
import { appRouter } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(cookie); //permite o acesso aos cookies, tanto pra inserção quanto pra recuperação (de forma fácil)

app.register(appRouter)
// app.post("/users", register)

app.setErrorHandler((error, _request, reply) => { //handler de error global (para os erros que fizemos o throw, pois os outros tratamos lá mesmo (erros mais óbivos)) - underline antes da palavra já mostra que é um parametro que não vou usar, pra parar de acusar error por falta de uso
    if (error instanceof ZodError) { //se for um erro de validação, vamos tratar aqui
        return reply
            .status(400)
            .send({ message: "Validation error.", issues: error.format() })
    }

    if (env.NODE_ENV !== "production") {
        console.error(error)
    } else {
        console.log() //here we should log to an external tool like Datalog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: "Internal server errors." }) //se não achar nenhum tipo derro, aí sim cai aqui, o que não é bom, mas as vezes realmente não ecncontra o erro
})
