import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUSeCase } from "@/use-cases/register"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({ //tem que ficar aqui porque vai disparar um erro, caso contrário
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body) //aqui está acontecendo o parse

    try {
        //instancias os dois aqui na no fastify - http
        const usersRepository = new PrismaUsersRepository()  //aqui é a classe que contem função pra inserção no banco
        const registerUseCase = new RegisterUSeCase(usersRepository) //aqui é a classe que contem uma variavel objeto (com construtor para receber um objeto do tipo user e atribuir, no ato, para essa variável da classe; ali embaixo chamamos a função para fazer hash do password, verificar se já existe usuario com mesmo email, e demais passos)

        await registerUseCase.execute({ //era importado - registerUseCase; agora intanciamos aqui mesmo
            name,
            email,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send()
        }

        throw error
    }

    return reply.status(201).send()
}