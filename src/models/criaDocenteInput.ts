enum ESPECIALIDADE {
    REACT = 1,
    REDUX = 2,
    CSS = 3,
    TESTES = 4,
    TYPESCRIPT = 5,
    POO = 6,
    BACKEND = 7
}

interface criaDocenteInput {
    id: number,
    nome: string,
    email: string,
    data_nasc: string,
    especialidades: ESPECIALIDADE[],
    turma_id: number
}

interface atualizaDocenteInput {
    docente_id: number,
    turma_id: number
}

export { criaDocenteInput, atualizaDocenteInput, ESPECIALIDADE };