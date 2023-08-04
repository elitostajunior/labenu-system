interface criaEstudanteInput {
    id: number,
    nome: string,
    email: string,
    data_nasc: string,
    hobbies: string[],
    turma_id: number
}

interface atualizaEstudanteInput {
    estudante_id: number,
    turma_id: number
}

export { criaEstudanteInput, atualizaEstudanteInput };