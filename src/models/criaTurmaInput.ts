enum TIPO_TURMA {
    INTEGRAL = "integral",
    NOTURNO = "noturno"
}

interface criaTurmaInput {
    id: number,
    nome: string,
    data_inicio: string,
    data_fim: string,
    modulo: number,
    tipo: TIPO_TURMA
}

export { criaTurmaInput, TIPO_TURMA };