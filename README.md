# Microsserviços com Node.js e AWS - Projeto de Estudo

Este é um projeto de estudo para aprender conceitos básicos de microsserviços usando Node.js e AWS.

## 📋 Descrição

Sistema simples composto por dois microsserviços:
- **Serviço de Pedidos**: Gerencia criação de pedidos
- **Serviço de Notas Fiscais**: Processa geração de notas fiscais

## 🛠️ Tecnologias

- **Backend**
  - Node.js
  - TypeScript
  - Fastify
  - DrizzleORM
  - PostgreSQL
  - RabbitMQ
  - Kong API Gateway

- **Infraestrutura**
  - Docker
  - AWS ECS (Elastic Container Service)
  - AWS ECR (Elastic Container Registry)
  - AWS VPC
  - AWS Application Load Balancer
  - Pulumi (IaC)

- **Observabilidade**
  - OpenTelemetry

## 🚀 Como Executar

### Pré-requisitos

- Node.js
- Docker
- AWS CLI configurado
- Pulumi CLI
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/arthur-uzumaki/microsservicos-nodejs.git

# Instale as dependências em cada serviço
cd app-orders
pnpm install

cd ../app-invoices
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Executando Localmente

```bash
# Inicie os containers
docker-compose up -d

# Inicie os serviços
cd app-orders
pnpm dev

cd ../app-invoices
pnpm dev
```

### Deploy na AWS

```bash
# Configure suas credenciais AWS
aws configure

# Entre na pasta de infraestrutura
cd infra

# Instale as dependências
pnpm install

# Deploy da infraestrutura
pulumi up --yes
```

## 📁 Estrutura do Projeto

```
.
├── app-orders/         # Serviço de Pedidos
├── app-invoices/       # Serviço de Notas Fiscais
├── contracts/          # Contratos/Interfaces compartilhadas
└── infra/             # Código de infraestrutura (Pulumi)
```

## 🌟 Recursos

- Comunicação assíncrona entre serviços via RabbitMQ
- Containerização com Docker
- Banco de dados PostgreSQL para cada serviço
- API Gateway com Kong
- Infraestrutura como Código usando Pulumi
- Observabilidade com OpenTelemetry

## 📝 Licença

Este projeto é para fins educacionais.

## ✨ Agradecimentos

Projeto desenvolvido para estudo e prática de conceitos de microsserviços e cloud computing.

---

⭐️ Se este projeto te ajudou, considere deixar uma estrela!
