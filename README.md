# BRy Desafio Frontend

Este projeto é uma aplicação Single Page Application (SPA) desenvolvida em **Angular** (utilizando as versões mais recentes com Standalone Components e Signals) e **Tailwind CSS**. Ele funciona como cliente da API RESTful do desafio, responsável pelo gerenciamento de usuários (clientes e funcionários) e empresas.

## Acesso
A aplicação está hospedada no seguinte endereço: [https://bry-desafio-frontend.vercel.app/login](https://bry-desafio-frontend.vercel.app/login)

Credenciais de um usuário "admin":
- **E-mail:** `admin@admin.com`
- **Senha:** `admin123`

## Sumário

Este Frontend foi desenvolvido de forma objetiva devido ao tempo disponível e por uma decisão estratégica: como já possuo experiência profissional sólida com Angular, optei por priorizar a entrega de um Backend mais robusto, seguro e bem estruturado, que é uma área menos presente no meu portfólio e mais alinhada ao core técnico da BRy Tecnologia.

Assim, o Frontend concentra-se no cumprimento dos requisitos funcionais do desafio (CRUDs, Autenticação e fluxo com a API), mantendo um layout simples e implementações diretas, enquanto o foco principal esteve na arquitetura, segurança e consistência da API que o sustenta.

## Requisitos da Questão 2 Atendidos

Conforme definido no PDF do desafio, este Frontend atende integralmente aos seguintes itens:

- ✔ CRUD conectado à API dos seguintes recursos:
  - Funcionários
  - Clientes
  - Empresas

- ✔ Tratamento genérico de erros (via interceptor);

- ✔ Impede cadastro quando login ou nome possuem acentuação (validador no-accent.validator.ts);

- ✔ Consumo da API REST hospedada;

- ✔ Projeto em Angular 17+, conforme solicitado.

## Upload e Download de Arquivos (Estado Atual)

O Frontend possui a estrutura e os fluxos necessários para upload e download de documentos (PDF/JPG), porém essa funcionalidade, apesar de implementada parcialmente, não está finalizada na versão entregue. O backend já está preparado para receber e servir arquivos, mas a integração completa no front ainda não foi concluída.

## Estrutura de Arquivos

A estrutura segue o padrão moderno do Angular (Standalone), organizada por funcionalidades e núcleo da aplicação:

```text
src/app
├── core               # Núcleo da aplicação (Singletons)
│   ├── guards         # Proteção de rotas (AuthGuard)
│   ├── interceptors   # Injeção de Token JWT e tratamento de erros HTTP
│   ├── models         # Interfaces TypeScript (Tipagem forte)
│   └── services       # Comunicação com a API e Gerenciamento de Estado (Auth)
├── features           # Módulos funcionais (Telas)
│   ├── auth           # Login e Registro
│   ├── companies      # Listagem e Formulário de Empresas
│   └── users          # Componentes reutilizáveis para Funcionários e Clientes
├── layout             # Componentes estruturais (Header)
└── shared             # Utilitários compartilhados (Validadores)
```

## Arquitetura e Conceitos

Embora simplificado, o projeto utiliza conceitos modernos do framework Angular:

### Core Services & Auth
A autenticação é gerenciada pelo `Auth` service, que persiste o JWT no `localStorage`.
- **Interceptors:** O `auth.interceptor.ts` intercepta todas as requisições HTTP para injetar o cabeçalho `Authorization: Bearer ...` automaticamente.
- **Guards:** O `auth.guard.ts` impede o acesso às rotas internas (`/companies`, `/employees`, etc.) caso o usuário não esteja logado.

### Reutilização de Componentes (Adapter Pattern)
Para evitar duplicação de código entre as telas de **Clientes** e **Funcionários** (que possuem estruturas de dados muito similares), utilizei uma estratégia de adaptação:
- Os componentes `list` e `form` dentro de `features/users` são agnósticos.
- Eles recebem, via injeção de dependência ou lógica de rota, qual serviço deve ser utilizado (`CustomersService` ou `EmployeesService`), ambos implementando uma interface comum `UserServiceAdapter`.

### Gerenciamento de Estado
Não foi utilizada nenhuma biblioteca externa de estado (como NgRx, MobX ou Redux) para manter a simplicidade. O estado local dos componentes é gerenciado através de **Angular Signals** (`signal()`), garantindo reatividade e melhor performance na renderização.

### Estilização
Utilizei **Tailwind CSS** para agilizar a construção do layout, permitindo criar componentes responsivos e limpos sem a necessidade de escrever muito CSS puro ou gerenciar arquivos de estilo complexos.

## Observações e Comentários

1.  **Design e UX:** O layout é minimalista e funcional. O foco foi garantir que os botões, formulários e tabelas funcionassem, sem refino estético aprofundado;
2.  **Tratamento de Erros:** O Frontend exibe erros básicos (via `alert` ou mensagens simples no template) baseados nas respostas da API. A validação robusta reside no Backend;
3.  **Herança no Frontend:** O formulário de usuário se adapta dinamicamente. Se o usuário logado for um Funcionário editando outro usuário, ele vê campos extras (como a escolha do "Tipo"). Se for um cliente, a interface é restrita;
4. **Validação de Campos:** O validador no-accent.validator.ts impede acentuação em login e nome, conforme exigido na Questão 2.

## Decisões de Projeto

- Uso de Standalone Components para reduzir boilerplate;

- Adoção de Signals ao invés de NgRx pela simplicidade e por não ser exigido no escopo;

- Adapter Pattern para unificar telas de Cliente e Funcionário;

- Interceptor único para JWT e erros;

- Tailwind para acelerar prototipação visual;

- Desenvolvimento focado em API-first, consumindo a API real hospedada.

## Instruções para execução

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM

### Instalação
Na raiz do projeto, instale as dependências:

```bash
npm install
```

### Execução
Para rodar o servidor de desenvolvimento:

```bash
npm start
# ou
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`.

> **Nota:** O arquivo `src/environments/environment.ts` já aponta para a API hospedada no Railway. Não é necessário rodar o backend localmente, a menos que você altere essa configuração.
