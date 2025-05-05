import { Prisma, User } from "generated/prisma";  //De novo é do generated/prisma, diferente da video aula | prisma gera variaos tpos pra update, create, etc, o que ajuda muito na tuipagem do typescript, por isso vamos usar aqui

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}