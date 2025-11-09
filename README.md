# 📝 Task Manager - Frontend Zup Test

Um sistema de gerenciamento de tasks desenvolvido com React, TypeScript e Vite. O projeto inclui funcionalidades para criar, listar, editar e excluir tasks, com persistência no localStorage e testes unitários abrangentes.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento para Single Page Applications
- **Tailwind CSS** - Framework CSS utilitário

### Testes
- **Vitest** - Framework de testes rápido e moderno
- **React Testing Library** - Utilitários para teste de componentes React
- **jsdom** - Implementação DOM para ambiente de teste
- **User Event** - Simulação realista de eventos do usuário

### Desenvolvimento
- **ESLint** - Linter para código JavaScript/TypeScript
- **PostCSS** - Processador CSS
- **Autoprefixer** - Plugin PostCSS para prefixos CSS

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── ConfirmationModal.tsx
├── pages/              # Páginas da aplicação
│   ├── Home.tsx
│   ├── Tasks.tsx
│   ├── NewTask.tsx
│   └── EditTask.tsx
├── shared/             # Componentes compartilhados
│   └── Sidebar.tsx
├── test/               # Arquivos de teste
│   ├── setup.ts
│   ├── NewTask.test.tsx
│   ├── ConfirmationModal.test.tsx
│   └── TasksModal.test.tsx
└── App.tsx             # Componente principal
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd testeZup
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O projeto será executado em `http://localhost:5173`

### Build para Produção

```bash
npm run build
# ou
yarn build
```

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes uma vez (sem watch mode)
npm test -- --run

# Executar com interface visual
npm test:ui
```

### Linting

```bash
npm run lint
# ou
yarn lint
```

## 🎯 Funcionalidades

### ✅ Implementadas
- **Criar Tasks** - Formulário para adicionar novas tasks
- **Listar Tasks** - Visualização de todas as tasks em tabela
- **Editar Tasks** - Edição de tasks existentes
- **Excluir Tasks** - Remoção com modal de confirmação
- **Navegação** - Roteamento entre páginas
- **Persistência** - Dados salvos no localStorage
- **Responsividade** - Layout adaptável para diferentes telas

### 🔒 Segurança
- **Confirmação de Exclusão** - Modal para evitar exclusões acidentais
- **Validação de Formulários** - Campos obrigatórios e mensagens de erro
- **Tratamento de Erros** - Gerenciamento de falhas de localStorage

## 🧪 Testes

O projeto possui **21 testes unitários** que cobrem:

- ✅ **Criação de Tasks** (9 testes)
- ✅ **Modal de Confirmação** (6 testes) 
- ✅ **Integração Tasks + Modal** (6 testes)

### Cobertura de Testes:
- Renderização de componentes
- Interações do usuário
- Validações e tratamento de erros
- Persistência de dados
- Navegação e roteamento

## 📱 Pages/Rotas

- `/` - **Home**: Página inicial com resumo das tasks
- `/tasks` - **Tasks**: Lista completa de tasks com ações
- `/new` - **New Task**: Formulário para criar nova task  
- `/edit/:id` - **Edit Task**: Formulário para editar task existente

## 🎨 Design

- **Layout limpo** com sidebar de navegação
- **Tabelas responsivas** com quebra de texto automática
- **Modais elegantes** com backdrop e animações
- **Feedback visual** para ações do usuário
- **Cores consistentes** seguindo padrão de design

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é um teste técnico para fins educacionais.

## 🔗 Links Úteis

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

**Desenvolvido com ❤️ para o teste Frontend Zup**
