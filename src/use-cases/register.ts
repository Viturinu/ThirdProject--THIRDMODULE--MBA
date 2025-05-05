import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

//SOLID

//D - Dependency Inversion Principle

export class RegisterUSeCase {
    private usersRepository: UsersRepository
    constructor(usersRepository: UsersRepository) { //Ao inves da classe intanciar as dependencias que ela precisa, ela vai receber as dependencias como paramentro (dependência do objeto prisma client pra manipulação do banco) - D - Essa é a inversão de dependencias do item D
        this.usersRepository = usersRepository //não precisa dessa declaração se colocarmos um parametro de visibilidade (public, private, etc), logo ele assume que é uma variavel da classe automaticamente, não fiz isso aqui pois não estava funcionando... dica de Diego da Rocket
    }

    async execute({
        name,
        email,
        password,
    }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6) //criando hash com a senha passada pelo user, mas com 6 rounds de SHA consecutivos

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError() //tipamos os eros apenas criando uma classe nova com o erro que queremos e estendendo a classe principal "Error"
        }

        // const prismaUsersRepository = new PrismaUsersRepository() //aqui ele instancia o repository para fazer inserção no bando de dados, d fato

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return { //boa pratica tentar retornar sempre um objeto, pois se mais pra frente quisermos mudar a estrutura do retorno basta adicionar mais coisas, daí não quebra os front que já estão consumindo esse backend
            user
        }
    }
}

