import { env } from "@/env";
import { PrismaClient } from "generated/prisma"; //tem que importar aqui do generated/prisma, pois foi o prisma client gerado com os tipos especificados no schema "npx prisma generate"

export const prisma = new PrismaClient({
    log: env.NODE_ENV === "dev" ? ["query"] : [] //mostra os logs de query, se em modo desenvolvimento, no console; caso contrario, faz o log de erros apeans
}); //aqui é a conexão com nosso banco, pra podermos trabalhar nele