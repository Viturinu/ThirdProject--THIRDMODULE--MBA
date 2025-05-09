import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {

    public items: User[] = [] //como aqui é apenas uma classe para testes, pra manter os testes unitários (caso contrario, se tivesse que usar os repositories verdadeiros seriam testes de integração), então não temos BD e faremos via memoria mesmo.

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: "user-1",
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }


}