# Notification

Notification é um serviço de envio de mensagem que consome de uma fila e notifica os usuários conforme os cases solicitados. Visa integrar com o ShareCode, mas está livre para ser integrado com qualquer aplicação, basta adaptar conforme as suas necessidades.

Mais informações em: ![Share Code](https://github.com/maykonsousa/sharecode-server)

## Boas práticas
Utilizamos o ![semver](https://semver.org/), para padronizar os commits:
```
feat: commit message
fix: commit message
docs: commit message
style: commit message
refactor: commit message
test: commit message
chore: commit message
perf: commit message
ci: commit message
build: commit message
temp: commit message
```

## Principais tecnologias
```
node: v16.17.1
typeScript: v4.8.4
jest: v29.1.2
amqplib: v0.10.3
dotenv: v16.0.3
eslint: v8.25.0
nodemailer: v6.8.0
ejs: v3.1.8
mongodb: v4.10.0
jsonwebtoken: v8.5.1
```

## Como iniciar o projeto?
É necessário ter um arquivo .env que deverá ter as seguintes configurações:
```
MAIL_SERVICE=yourSMTP
MAIL_NAME=yourName
MAIL_USER=yourEmail
MAIL_PASS=yourPassword
RABBITMQ_URL=yourRabbitMQConnectionURL
MONGODB_URL=yourMongoDBConnectionURL
```

Logo após, basta rodar os seguintes comandos:

`yarn install`

`yarn start`
