import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { AddressInfo } from "net";
import { connection } from './database/connection'; // Importa a conexão com o banco de dados
import turmaRoutes from './routes/turmaRoutes'; // Importa as rotas relacionadas a turmas
import estudanteRoutes from './routes/estudanteRoutes'; // Importa as rotas relacionadas a estudantes
import docenteRoutes from './routes/docenteRoutes'; // Importa as rotas relacionadas a docentes

const app: Express = express();

app.use(express.json());
app.use(cors());

// Configuração das rotas
app.use(turmaRoutes);
app.use(estudanteRoutes);
app.use(docenteRoutes);

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});