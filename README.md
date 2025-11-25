# BRy Desafio Frontend

Este projeto é uma aplicação Single Page Application (SPA) desenvolvida em **Angular** (utilizando as versões mais recentes com Standalone Components e Signals) e **Tailwind CSS**. Ele serve como cliente para a API RESTful de gerenciamento de usuários e empresas.

## Sumário

Devido à limitação de tempo para a conclusão do desafio, o desenvolvimento deste Frontend foi realizado de forma mais acelerada. **Optei estrategicamente por priorizar a construção de um Backend robusto, seguro e bem estruturado**, características que alinham-se à identidade e core business da BRy Tecnologia.

Portanto, esta aplicação foca estritamente no cumprimento dos requisitos funcionais (CRUDs, Autenticação, Upload), em detrimento de um design visual elaborado ou de tratamentos de erro complexos no lado do cliente. O objetivo principal é demonstrar o consumo correto da API e o fluxo de dados.

A aplicação está hospedada no seguinte endereço: [https://bry-desafio-frontend.vercel.app/login](https://bry-desafio-frontend.vercel.app/login)

### Credenciais para teste (Admin):
- **E-mail:** `admin@admin.com`
- **Senha:** `admin123`

---

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

---

## Arquitetura e Conceitos

Embora simplificado, o projeto utiliza conceitos modernos do framework Angular:

### Core Services & Auth
A autenticação é gerenciada pelo `Auth` service, que persiste o JWT no `localStorage`.
- **Interceptors:** O `auth.interceptor.ts` intercepta todas as requisições HTTP para injetar o cabeçalho `Authorization: Bearer ...` automaticamente.
- **Guards:** O `auth.guard.ts` impede o acesso às rotas internas (`/companies`, `/employees`, etc.) caso o usuário não esteja logado.

### Reutilização de Componentes (Pattern Adapter)
Para evitar duplicação de código entre as telas de **Clientes** e **Funcionários** (que possuem estruturas de dados muito similares), utilizei uma estratégia de adaptação:
- Os componentes `list` e `form` dentro de `features/users` são agnósticos.
- Eles recebem, via injeção de dependência ou lógica de rota, qual serviço deve ser utilizado (`CustomersService` ou `EmployeesService`), ambos implementando uma interface comum `UserServiceAdapter`.

### Gerenciamento de Estado
Não foi utilizada nenhuma biblioteca externa de estado (como NgRx) para manter a simplicidade. O estado local dos componentes é gerenciado através de **Angular Signals** (`signal()`), garantindo reatividade fina e melhor performance na renderização.

### Estilização
Utilizei **Tailwind CSS** para agilizar a construção do layout, permitindo criar componentes responsivos e limpos sem a necessidade de escrever muito CSS puro ou gerenciar arquivos de estilo complexos.

---

## Observações e Comentários

1.  **Design e UX:** O layout é minimalista e funcional. O foco foi garantir que os botões, formulários e tabelas funcionassem, sem refino estético aprofundado.
2.  **Tratamento de Erros:** O Frontend exibe erros básicos (via `alert` ou mensagens simples no template) baseados nas respostas da API. A validação robusta reside no Backend.
3.  **Upload de Arquivos:** O formulário de usuário permite o upload de documentos. O download é feito utilizando `Blob` objects para garantir que o arquivo binário vindo da API seja baixado corretamente pelo navegador.
4.  **Herança no Frontend:** O formulário de usuário se adapta dinamicamente. Se o usuário logado for um Funcionário editando outro usuário, ele vê campos extras (como a escolha do "Tipo" e vinculação de empresas). Se for um Cliente, a interface é restrita.

---

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
