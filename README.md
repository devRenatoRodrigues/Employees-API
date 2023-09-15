
# API Employees

[Ir para Decisões de Design](#instalacao)

[Ir para Decisões de Design](#op-basicas)

[Ir para Decisões de Design](#demo-func)

[Ir para Decisões de Design](#desing)

## Sobre

**Listar Employees:** Recupere uma lista de todos os funcionários cadastrados na organização.

**Detalhes de um Employee:** Obtenha informações detalhadas sobre um funcionário específico com base em seu ID.

**Criar Employee:** Adicione um novo funcionário à base de dados da organização fornecendo informações detalhadas, como nome, cargo, e-mail, etc.

**Atualizar Employee:** Atualize as informações de um funcionário existente com base em seu ID.

**Excluir Employee:** Remova um funcionário da base de dados com base em seu ID.

**Send Notification:** Envia notificação com uma mensagem personalizada para uma lista de emails fornecida pelo usuario

## Ferramentas
* Typescript
* Prisma
* MySQL
* Nginx
* Redis
* Prometheus

## Instalação <a name="instalacao"></a>

Após clonar o repositorio entre dentro da pasta Employee instale as dependencias 
```bash
  npm install 
```
Faça o mesmo na pasta SendEmail
```bash
  npm install 
```
Após instalar as dependencias retorne ao diretorio raiz e suba os containers
```bash
  docker-compose up -d --build 
```

## Operações Basicas <a name="op-basicas"></a>

Para popular o banco de dados vá até a rota GET /populate

![Rota populate](imagens/PopulateRoute.png)

ou crie um novo Employee através da rota POST /employees

![Rota create](imagens/CreateRoute.png)

Para enviar emails utilize a porta 9080 POST /send-notification

![Rota send](imagens/SendRoute.png)

## Demonstração de Funcionalidades <a name="demo-func"></a>

A aplicação possui um Load Balancer que aumenta a perfomace e resiliência da aplicação
Se um servidor estiver carregado a requisição é realizada em outro servidor que esteja menos sobrecarregado

![Load Balancer](imagens/LoadBalancer.png)

A aplicação possui o Redis que diminui consideravelmente o tempo de resposta da aplicação armazenando em cache as informações frenquentemente acessadas

![Redis](imagens/Redis.png)

e por último ela também possui um gerenciador de métricas 
Acessado pela porta 3030 /metrics
lá é possivel vizualizar a duração da requisição em cada rota 

![Entrypoint response time](imagens/entrypointResponseTime.png)

a quantitade total que uma rota foi acessada e também a quantidade de notificações enviadas no ultimo minuto 

![Route acess](imagens/routeAcess.png)

## Decisões de design <a name="desing"></a>
Optei pelo Prisma por ser um ORM de facil manipulação e também porque era possivel utilizar com MongoDB e no final se revelou a melhor escolha porque eu tive que migrar do MongoDB para o MySQL.

Tive alguns percalsio na escolha de banco de dados inicialmente optei pelo MongoDb mas após algumas pesquisas percebi que não foi uma boa escolha, e migrei pro MySQL por fazer mais sentido pela conscistencia dos dados, e também porque me fornecia um ID autoincrementado e não um aleatorio como fazia o MongoDb.

A comunicação entre o serviço e o microserviço é feita através do Axios que acabou fazendo mais sentido para mim por ser uma comunicação simples e pouco complexa mas houve momentos em que considerei o kafka mas por não dominar a tecnologia e pelo tempo que tinha disponivel o Axios acabou se tornando uma opção mais obvia

Optei por seguir as recomendações do Desafio na escolha do Nginx, Redis e Prometheus apesar de ser tecnologias que inicialmente eu não dominava no final se reveleram boas escolhas pela pouca complexidade de uso 

O Nginx aumentou a resiliência e perfomace ao balancear a carga e também manter um servidor em pé caso o outro venha a cair

O Redis aumentou consideravelmente a perfomace ao armazenar dados muito requisitados em cache caso o usuário venha a requisitar esses dados novamente a aplicação não precisa consultar o banco de dados para obter eles

O Prometheus monitora a aplicação mostrando quais os entrypoints mais acessados e o tempo de resposta além de exibir a quantidade de notificações que são enviadas por minuto
