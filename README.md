# Compasso Recrutamento

Projeto desenvolvido usando uma **arquitetura limpa** de NodeJS e TypeScript, utilizando o TDD.

## Requisitos

- Cadastrar cidade
- Cadastrar cliente
- Consultar cidade pelo nome
- Consultar cidade pelo estado
- Consultar cliente pelo nome
- Consultar cliente pelo Id
- Remover cliente
- Alterar o nome do cliente


## Stack

**Backend**
---

- NodeJS
- TypeScript
- Postgres

- Outros
  - Conventional Commits
  - Standard Pattern

**Testes**
---
Os testes estão separados em testes unitários (npm run test:unit) e testes de integração (npm run test:integration).

Também é possível rodar o teste de continuous integration, que irá gerar um coverage de todo o código. Esse script também é rodado antes de cada push.

**Como rodar o código**
---
É possível iniciar rodando o script de start (npm start), e também utilizando o inicio rápido com o docker (docker-compose up --build -d)

**Documentação**
---
Toda documentação se encontra no diretório docs/, na raíz do repositório.