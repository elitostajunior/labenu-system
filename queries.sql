CREATE TABLE TURMA(
	id INT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    modulo INT NOT NULL DEFAULT 0
);

CREATE TABLE ESTUDANTE(
	id INT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    data_nasc DATE NOT NULL,
    turma_id INT NOT NULL,
    FOREIGN KEY(turma_id) REFERENCES TURMA(id)
);

CREATE TABLE PASSATEMPO(
	id INT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE ESTUDANTE_PASSATEMPO(
	estudante_id INT NOT NULL,
    passatempo_id INT NOT NULL,
    PRIMARY KEY (estudante_id, passatempo_id),
    FOREIGN KEY (estudante_id) REFERENCES ESTUDANTE(id),
    FOREIGN KEY (passatempo_id) REFERENCES PASSATEMPO(id)
);

CREATE TABLE DOCENTE(
	id INT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    data_nasc DATE NOT NULL,
    turma_id INT NOT NULL,
    FOREIGN KEY(turma_id) REFERENCES TURMA(id)
);

CREATE TABLE ESPECIALIDADE(
	id INT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO ESPECIALIDADE(id, nome)
VALUES(1, "React"),
(2, "Redux"),
(3, "CSS"),
(4, "Testes"),
(5, "Typescript"),
(6, "Programação Orientada a Objetos"),
(7, "Backend");

CREATE TABLE DOCENTE_ESPECIALIDADE(
	docente_id INT NOT NULL,
    especialidade_id INT NOT NULL,
    PRIMARY KEY (docente_id, especialidade_id),
    FOREIGN KEY (docente_id) REFERENCES DOCENTE(id),
    FOREIGN KEY (especialidade_id) REFERENCES ESPECIALIDADE(id)
);