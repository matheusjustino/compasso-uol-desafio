<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]:
	https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Sumário

<h4 align="center">
  <a href="#sobre-o-projeto">Sobre</a>&nbsp;|&nbsp;
  <a href="#instruções">Instruções</a>&nbsp;|&nbsp;
  <a href="#tecnologias-usadas">Tecnologias</a>
</h4>

## Sobre o projeto

Backend criado para integrar as plataformas
[Bling](https://www.bling.com.br/home) e
[Pipedrive](https://www.pipedrive.com/pt) através de uma API REST. Buscando os
Negócios Ganhos (Won Deals) do [Pipedrive](https://www.pipedrive.com/pt) para
salvar como Pedidos (Orders) no [Bling](https://www.bling.com.br/home). Além
disso, os dados diários dos pedidos salvos no
[Bling](https://www.bling.com.br/home) são salvos no MongoDB Atlas.

## Instruções

```bash
# Repositório
git clone https://github.com/matheusjustino/link-api.git

# Dependências
yarn add

# Iniciar no modo Desenvolvimento
yarn start:dev

# Projeto Executando
Ao iniciar o projeto três Schedules estarão em execução.
	- Um para para salvar os Deals como Orders no Bling.
	- Um para salvar as Orders no MongoDB Atlas.
	- Um para para buscar os dados salvos no MongoDB Atlas (Reports).

# Docker
	- Build: docker image build -t nestjs-link-api-[dev ou prod]
	- Executar: docker-compose rm para remover o cache de images docker-compose já criadas,
		então use o comando: docker-compose up dev (Acesse as rotas na porta 3000 normalmente).

# Documentação
Com o projeto em execução acesse http://localhost:3000/api para conhecer as rotas que o projeto possui.
```

## Tecnologias Utilizadas

-   [Node.js](https://nodejs.org/en/docs/)
-   [NestJs](https://docs.nestjs.com/)
-   [MongoDB](https://docs.mongodb.com/)
-   [Swagger](https://swagger.io/docs/)
-   [Docker](https://www.docker.com/)
