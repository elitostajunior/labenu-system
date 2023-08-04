import { Request, Response } from 'express';
import { connection } from '../database/connection';
import { atualizaEstudanteInput, criaEstudanteInput } from '../models/criaEstudanteInput';

export const criarEstudante = async (req: Request, res: Response) => {
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

        if (
            !input.id ||
            !input.nome ||
            !input.email ||
            !input.data_nasc ||
            input.hobbies.length < 1
        ) {
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

        for (let hobby of input.hobbies) {
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

            res.status(201).send({ message: "Conseguimos criar!" })
        }

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}

export const atualizarEstudante = async (req: Request, res: Response) => {
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
        if (error.message.includes("foreign key constraint fails")) {
            errorCode = 422;
            error.message = "Turma inexistente"
        }

        res.status(errorCode).send({ message: error.message })
    }
}

export const buscarEstudantePorId = async (req: Request, res: Response) => {
    let errorCode = 400;

    try {
        const id = req.params.id

        if (isNaN(Number(id))) {
            errorCode = 422
            throw new Error("Apenas valores numéricos")
        }

        const result = await connection.raw(`
            SELECT ROUND(DATEDIFF("2021-01-01", data_nasc) / 365) as idade
            FROM ESTUDANTE
            WHERE id = ${id};
        `)

        if (result[0].length === 0) {
            errorCode = 404
            throw new Error("Não encontrado")
        }

        res.status(200).send({ estudante: result[0][0] })
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
}