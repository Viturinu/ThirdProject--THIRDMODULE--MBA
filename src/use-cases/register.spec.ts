import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "generated/prisma"
import { expect, describe, it } from "vitest"
import { RegisterUSeCase } from "./register"

describe("Register Use Case", () => {
    it("should have user password upon registration", async () => {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUSeCase(prismaUsersRepository)

        const user = await registerUseCase.execute({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
        })

        return {
            user
        }
    })
})