import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "generated/prisma"
import { expect, describe, it } from "vitest"
import { RegisterUSeCase } from "./register"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists"

describe("Register Use Case", () => {
    it("should have user password upon registration", async () => {
        const prismaUsersRepository = new InMemoryUsersRepository() //intead of new PrismaUsersRepository(), we set new InMemoryUsersRepository() - simulation of Repository
        const registerUseCase = new RegisterUSeCase(prismaUsersRepository)

        const email = "johndoe@gmail.com"

        const { user } = await registerUseCase.execute({
            name: "John Doe",
            email,
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))

        await expect(() => registerUseCase.execute({ //await porque espera uma Promise com rejects ali embaixo
            name: "John doe",
            email,
            password: "123456",
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})