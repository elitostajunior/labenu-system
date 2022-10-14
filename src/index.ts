import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { AddressInfo } from "net"
import knex from 'knex'
import dotenv from "dotenv"

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

enum TIPO_TURMA {
   INTEGRAL = "integral",
   NOTURNO = "noturno"
}

enum ESPECIALIDADE {
   REACT = 1,
   REDUX = 2,
   CSS = 3,
   TESTES = 4,
   TYPESCRIPT = 5,
   POO = 6,
   BACKEND = 7
}

type criaTurmaInput = {
   id: number,
   nome: string,
   data_inicio: string,
   data_fim: string,
   modulo: number,
   tipo: TIPO_TURMA
}

type criaEstudanteInput = {
   id: number,
   nome: string,
   email: string,
   data_nasc: string,
   hobbies: string[],
   turma_id: number
}

type criaDocenteInput = {
   id: number,
   nome: string,
   email: string,
   data_nasc: string,
   especialidades: ESPECIALIDADE[],
   turma_id: number
}

type atualizaEstudanteInput = {
   estudante_id: number,
   turma_id: number
}

type atualizaDocenteInput = {
   docente_id: number,
   turma_id: number
}

app.post("/turma", async (req: Request, res: Response) => {
   let errorCode = 400;  
   try {

      const input: criaTurmaInput = {
         id: req.body.id,
         nome: req.body.nome,
         data_inicio: req.body.data_inicio,
         data_fim: req.body.data_fim,
         modulo: 0,
         tipo: req.body.tipo
      }

      if(
         !input.id || 
         !input.nome || 
         !input.data_inicio ||
         !input.data_fim ||
         !input.tipo
      ){
         errorCode = 422;
         throw new Error("Preencha os dados corretamente")
      }

      if(
         input.tipo !== TIPO_TURMA.INTEGRAL && 
         input.tipo !== TIPO_TURMA.NOTURNO
      ){
         errorCode = 422;
         throw new Error("Os valores possíveis são 'integral' ou 'noturno'")
      }

      if(input.tipo === TIPO_TURMA.NOTURNO){
         input.nome = input.nome += "-na-night"
      }

      await connection.raw(`
         INSERT INTO TURMA(id, nome, data_inicio, data_fim, modulo)
         VALUES(
            ${input.id},
            "${input.nome}",
            "${input.data_inicio}",
            "${input.data_fim}",
            ${input.modulo}
         )
      `)

      res.send(201).send({ message: "Turma criada com sucesso" })
   } catch (error: any) {
      res.status(errorCode).send({ message: error.message })
   }
})

app.post("/estudante", async (req: Request, res: Response) => {
   let errorCode = 400;
   try {
      const input: criaEstudanteInput = {
         id: req.body.id,
         nome: req.body.nome,
         email: req.body.email,
         data_nasc: req.body.data_nasc,
         hobbies: req.body.hobbies,
         turma_id: req.body.turma_id
      }

      if(
         !input.id ||
         !input.nome ||
         !input.email ||
         !input.data_nasc ||
         input.hobbies.length < 1
      ){
         errorCode = 422;
         throw new Error("Preencha os campos corretamente")
      }

      await connection.raw(`
      INSERT INTO ESTUDANTE(id, nome, email, data_nasc, turma_id)
      VALUES(
         ${input.id},
         "${input.nome}",
         "${input.email}",
         "${input.data_nasc}",
         ${input.turma_id}
      );
      `)

      for (let hobby of input.hobbies){
         const idPassatempo = Math.floor(Math.random() * 1000000);

         await connection.raw(`
         INSERT INTO PASSATEMPO(id, nome)
         VALUES(
            ${idPassatempo},
            "${hobby}"
         )
         `)

         await connection.raw(`
         INSERT INTO ESTUDANTE_PASSATEMPO(estudante_id, passatempo_id)
         VALUES(
            ${input.id},
            ${idPassatempo}
         )
         `)

         res.status(201).send({message: "Conseguimos criar!"})
      }

   } catch (error: any) {
      res.status(errorCode).send({ message: error.message })
   }
})

app.put("/estudante", async (req: Request, res: Response) => {
   let errorCode = 400;

   try {
      const input: atualizaEstudanteInput = {
         estudante_id: req.body.estudante_id,
         turma_id: req.body.turma_id
      }

      await connection.raw(`
      UPDATE ESTUDANTE
      SET turma_id = ${input.turma_id}
      WHERE id = ${input.estudante_id}
      `)

      res.status(200).send({ message: "Atualizado com sucesso!" })
   } catch (error: any) {
      console.log(error.message)
      if(error.message.includes("foreign key constraint fails")){
         errorCode = 422;
         error.message = "Turma inexistente"
      }

      res.status(errorCode).send({ message: error.message })
   }
})

app.get("/estudante/:id", async (req: Request, res: Response) => {
   let errorCode = 400;

   try {
      const id = req.params.id

      if(isNaN(Number(id))){
         errorCode = 422
         throw new Error("Apenas valores numéricos")         
      }
      
      const result = await connection.raw(`
      SELECT ROUND(DATEDIFF("2021-01-01", data_nasc) / 365) as idade
      FROM ESTUDANTE
      WHERE id = ${id};
      `)

      if(result[0].length === 0){
         errorCode = 404
         throw new Error("Não encontrado")
      }

      res.status(200).send({ estudante: result[0][0] })
   } catch (error: any) {
      res.status(errorCode).send({ message: error.message })
   }
})

app.post("/docente", async (req: Request, res: Response) => {
   let errorCode = 400;
   try {
      const input: criaDocenteInput = {
         id: req.body.id,
         nome: req.body.nome,
         email: req.body.email,
         data_nasc: req.body.data_nasc,
         especialidades: req.body.especialidades,
         turma_id: req.body.turma_id
      }

      if(
         !input.id ||
         !input.nome ||
         !input.email ||
         !input.data_nasc ||
         input.especialidades.length < 1
      ){
         errorCode = 422;
         throw new Error("Preencha os campos corretamente")
      }

      await connection.raw(`
      INSERT INTO DOCENTE(id, nome, email, data_nasc, turma_id)
      VALUES(
         ${input.id},
         "${input.nome}",
         "${input.email}",
         "${input.data_nasc}",
         ${input.turma_id}
      );
      `)

      for (let especialidade of input.especialidades){
         await connection.raw(`
         INSERT INTO DOCENTE_ESPECIALIDADE(docente_id, especialidade_id)
         VALUES(
            ${input.id},
            ${ESPECIALIDADE[especialidade]}
         )
         `)
         // Exemplo: ESPECIALIDADE["CSS"] = ESPECIALIDADE.CSS

         res.status(201).send({message: "Conseguimos criar!"})
      }

   } catch (error: any) {
      res.status(errorCode).send({ message: error.message })
   }
})

app.put("/docente", async (req: Request, res: Response) => {
   let errorCode = 400;

   try {
      const input: atualizaDocenteInput = {
         docente_id: req.body.docente_id,
         turma_id: req.body.turma_id
      }

      await connection.raw(`
      UPDATE DOCENTE
      SET turma_id = ${input.turma_id}
      WHERE id = ${input.docente_id}
      `)

      res.status(200).send({ message: "Atualizado com sucesso!" })
   } catch (error: any) {
      console.log(error.message)
      if(error.message.includes("foreign key constraint fails")){
         errorCode = 422;
         error.message = "Turma inexistente"
      }

      res.status(errorCode).send({ message: error.message })
   }
})

export const connection = knex({
	client: "mysql",
	connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
});

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});