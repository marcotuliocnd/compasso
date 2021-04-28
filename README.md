# Compasso Recrutamento

Projeto desenvolvido usando uma **arquitetura limpa** de NodeJS e TypeScript, utilizando o TDD.

## Requisitos

- [x] Cadastrar cidade
- [x] Cadastrar cliente
- [x] Consultar cidade pelo nome
- [x] Consultar cidade pelo estado
- [x] Consultar cliente pelo nome
- [x] Consultar cliente pelo Id
- [x] Remover cliente
- [x] Alterar o nome do cliente


## Stack

**Backend**
---

- NodeJS
- TypeScript
- MongoDB

- Outros
  - Conventional Commits
  - Standard Pattern

**Testes**
---
Os testes estão separados em testes unitários (npm run test:unit) e testes de integração (npm run test:integration).

Também é possível rodar o teste de integração contínua (npm run test:ci), que irá gerar um coverage (Cobertura de testes) de todo o código. Esse script também é rodado antes de cada push.

**Como rodar o código**
---
É possível iniciar em desenvolvimento rodando o script de dev (npm run dev).

Para realizar o build, devemos rodar o comando npm run build e o npm run start.

**Documentação**
---
Toda documentação se encontra no diretório docs/, na raíz do repositório. A collection dos endpoints foi gerada utilizando o programa Insomnia
