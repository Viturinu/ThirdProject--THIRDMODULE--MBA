import { prisma } from "@/lib/prisma";
import { Prisma, User } from "generated/prisma";  //De novo é do generated/prisma, diferente da video aula | prisma gera variaos tpos pra update, create, etc, o que ajuda muito na tuipagem do typescript, por isso vamos usar aqui
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {

        const user = await prisma.user.findUnique({ //busca no banco user por campos unique ou id, por isso só mostra email e id aqui
            where: {
                email,
            }
        })

        return user
    }
    async create(data: Prisma.UserCreateInput) { //tipagem feita pelo proprio prisma de acordo com schema
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}