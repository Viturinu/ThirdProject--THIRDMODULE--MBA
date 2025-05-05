import { app } from "./app";
import { env } from "./env";

app.listen({
    host: "0.0.0.0", //Isso faz com que nosso backend seja acessivel por frontends que estejam consumindo essa aplicação - significa escutar em todas as interfaces de rede disponiveis, seja localhost, outro pc da LAN ou mesmo da WAN
    port: env.PORT
}).then(() => console.log("HTTP Server Runinng"))

