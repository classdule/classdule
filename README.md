# Classdule

Um app para agendamento de aulas em grupo

## Variáveis de Ambiente

### Server

Para executar esse projeto, é necessário que as seguintes variáveis de ambiente sejam adicionadas ao .env na raiz do diretório server:

| Nome                 | Descrição                                                               |
| -------------------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`       | A url de seu banco de dados                                             |
| `JWT_SECRET`         | Uma string de caracteres aleatórios                                     |
| `JWT_REFRESH_SECRET` | Uma string de caracteres aleatórios(deve ser diferente de `JWT_SECRET`) |

## Tecnologias

**Back-end:**

- Node - Ambiente de execução
- Express- Micro framework para criação de rotas
- JSON Web Token - Estratégia de autenticação
- Prisma - ORM
