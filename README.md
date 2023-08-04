# Documentação do Projeto: Labenu System

Projeto feito para o curso Web Full Stack da Labenu, onde teve como proposta fazer um sistema de gerenciamento de dados para a escola Labenu, que inclui informações sobre turmas, estudantes, docentes e especialidades. Ele é construído usando TypeScript, Express.js e MySQL.

### Estrutura do Diretório

```
- src
  - controllers
  - models
  - routes
  - database
  - index.ts
```

### Configuração

1. Clone este repositório em sua máquina local.
2. Instale as dependências usando o comando `npm install`.
3. Configure o arquivo `.env` com as variáveis de ambiente necessárias para a conexão com o banco de dados.

### Modelos

Os modelos definem as estruturas de dados usadas no sistema:

- `criaTurmaInput.ts`: Define a estrutura para criar uma nova turma.
- `criaEstudanteInput.ts`: Define a estrutura para criar um novo estudante.
- `criaDocenteInput.ts`: Define a estrutura para criar um novo docente.

### Controllers

Os controladores são responsáveis por tratar as requisições HTTP:

- `turmaController.ts`: Controlador para lidar com operações relacionadas a turmas.
- `estudanteController.ts`: Controlador para lidar com operações relacionadas a estudantes.
- `docenteController.ts`: Controlador para lidar com operações relacionadas a docentes.

### Rotas

As rotas definem os endpoints da API:

- `turmaRoutes.ts`: Define as rotas para operações de turmas.
- `estudanteRoutes.ts`: Define as rotas para operações de estudantes.
- `docenteRoutes.ts`: Define as rotas para operações de docentes.

### Conexão com Banco de Dados

- `connection.ts`: Define a configuração e a criação da conexão com o banco de dados MySQL usando a biblioteca Knex.

### Como Iniciar o Servidor

- Execute o comando `npm start` para iniciar o servidor. O servidor estará disponível em `http://localhost:3003`.

### Rotas Principais

- `POST /turma`: Cria uma nova turma.
- `POST /estudante`: Cria um novo estudante e associa passatempos.
- `PUT /estudante`: Atualiza a turma de um estudante.
- `GET /estudante/:id`: Retorna informações sobre um estudante.
- `POST /docente`: Cria um novo docente e associa especialidades.
- `PUT /docente`: Atualiza a turma de um docente.

### Exemplos de Uso

Criar uma Nova Turma
```
POST http://localhost:3003/turma
Content-Type: application/json

{
    "id": 5,
    "nome": "tang",
    "data_inicio": "2020-02-10",
    "data_fim": "2020-08-10",
    "tipo": "noturno"
}
```

Criar um Novo Estudante
```
POST http://localhost:3003/estudante
Content-Type: application/json

{
    "id": 1,
    "nome": "Caio",
    "email": "caio@email.com",
    "data_nasc": "1997-07-10",
    "hobbies": ["Ver filme", "Cuidar do Lupin", "Aprontar"],
    "turma_id": 5
}
```

Criar um Novo Docente
```
POST http://localhost:3003/docente
Content-Type: application/json

{
    "id": 1,
    "nome": "Caio",
    "email": "caio@email.com",
    "data_nasc": "1997-07-10",
    "especialidades": ["CSS", "REACT", "REDUX"],
    "turma_id": 5
}
```

Colocar/Alterar Aluno em Determinada Turma
```
PUT http://localhost:3003/estudante
Content-Type: application/json

{
    "estudante_id": 1,
    "turma_id": 4
}
```

Colocar/Alterar Docente em Determinada Turma
```
PUT http://localhost:3003/docente
Content-Type: application/json

{
    "docente_id": 1,
    "turma_id": 4
}
```

Buscar Aluno com Base no ID
```
GET http://localhost:3003/estudante/1
```

### Considerações Finais

Esta documentação oferece uma visão geral do projeto e de suas principais funcionalidades. Certifique-se de explorar os arquivos individuais e as rotas definidas nos controladores para obter detalhes mais específicos sobre as operações disponíveis.

