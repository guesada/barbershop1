# 🏗️ Arquitetura do Projeto - Elite Barber Shop

## 📁 Nova Estrutura de Diretórios

```
BarberShop/
├── 📁 src/                          # Código fonte principal
│   ├── 📁 api/                      # Camada de API
│   │   ├── 📁 controllers/          # Controladores
│   │   ├── 📁 routes/               # Definição de rotas
│   │   ├── 📁 middleware/           # Middlewares customizados
│   │   └── 📁 validators/           # Validações de entrada
│   ├── 📁 core/                     # Núcleo da aplicação
│   │   ├── 📁 config/               # Configurações
│   │   ├── 📁 database/             # Conexão e modelos de banco
│   │   ├── 📁 services/             # Serviços de negócio
│   │   └── 📁 utils/                # Utilitários gerais
│   ├── 📁 features/                 # Funcionalidades por domínio
│   │   ├── 📁 auth/                 # Autenticação
│   │   ├── 📁 appointments/         # Agendamentos
│   │   ├── 📁 barbers/              # Barbeiros
│   │   ├── 📁 services/             # Serviços da barbearia
│   │   ├── 📁 users/                # Usuários
│   │   └── 📁 reviews/              # Avaliações
│   └── 📁 shared/                   # Recursos compartilhados
│       ├── 📁 constants/            # Constantes da aplicação
│       ├── 📁 enums/                # Enumerações
│       ├── 📁 types/                # Definições de tipos
│       └── 📁 helpers/              # Funções auxiliares
├── 📁 client/                       # Frontend da aplicação
│   ├── 📁 assets/                   # Recursos estáticos
│   │   ├── 📁 css/                  # Estilos CSS
│   │   ├── 📁 js/                   # Scripts JavaScript
│   │   ├── 📁 images/               # Imagens
│   │   └── 📁 fonts/                # Fontes
│   ├── 📁 components/               # Componentes reutilizáveis
│   │   ├── 📁 common/               # Componentes comuns
│   │   ├── 📁 forms/                # Formulários
│   │   └── 📁 ui/                   # Elementos de interface
│   ├── 📁 pages/                    # Páginas da aplicação
│   │   ├── 📁 auth/                 # Páginas de autenticação
│   │   ├── 📁 dashboard/            # Dashboard
│   │   ├── 📁 appointments/         # Páginas de agendamento
│   │   └── 📁 profile/              # Páginas de perfil
│   ├── 📁 services/                 # Serviços do frontend
│   │   ├── api.js                   # Cliente da API
│   │   ├── auth.js                  # Serviços de autenticação
│   │   └── storage.js               # Gerenciamento de storage
│   └── 📁 utils/                    # Utilitários do frontend
├── 📁 database/                     # Scripts de banco de dados
│   ├── 📁 migrations/               # Migrações
│   ├── 📁 seeds/                    # Seeds de dados
│   └── 📁 schemas/                  # Esquemas de banco
├── 📁 docs/                         # Documentação
│   ├── 📁 api/                      # Documentação da API
│   ├── 📁 deployment/               # Guias de deploy
│   └── 📁 development/              # Guias de desenvolvimento
├── 📁 tests/                        # Testes automatizados
│   ├── 📁 unit/                     # Testes unitários
│   ├── 📁 integration/              # Testes de integração
│   ├── 📁 e2e/                      # Testes end-to-end
│   └── 📁 fixtures/                 # Dados de teste
├── 📁 scripts/                      # Scripts de automação
│   ├── 📁 build/                    # Scripts de build
│   ├── 📁 deploy/                   # Scripts de deploy
│   └── 📁 dev/                      # Scripts de desenvolvimento
├── 📁 logs/                         # Arquivos de log
├── 📁 uploads/                      # Arquivos enviados
└── 📁 temp/                         # Arquivos temporários
```

## 🎯 Benefícios da Nova Estrutura

### 1. **Separação Clara de Responsabilidades**
- **src/**: Todo código fonte organizado
- **client/**: Frontend completamente separado
- **database/**: Scripts de banco isolados

### 2. **Organização por Domínio (Features)**
- Cada funcionalidade tem sua própria pasta
- Facilita manutenção e escalabilidade
- Reduz acoplamento entre módulos

### 3. **Melhor Estrutura do Frontend**
- Componentes organizados por tipo
- Páginas separadas por funcionalidade
- Serviços e utilitários bem definidos

### 4. **Configurações Centralizadas**
- Todas as configurações em `src/core/config/`
- Ambiente-específicas facilmente gerenciáveis

### 5. **Testes Bem Organizados**
- Separação por tipo de teste
- Fixtures centralizadas
- Cobertura mais fácil de gerenciar

## 🔄 Migração Gradual

A migração será feita de forma gradual para não quebrar o sistema:

1. **Fase 1**: Criar nova estrutura de diretórios
2. **Fase 2**: Mover arquivos do backend
3. **Fase 3**: Reorganizar frontend
4. **Fase 4**: Atualizar imports e referências
5. **Fase 5**: Atualizar documentação

## 📋 Convenções de Nomenclatura

- **Diretórios**: kebab-case (ex: `user-management`)
- **Arquivos JS**: camelCase (ex: `userController.js`)
- **Arquivos de Configuração**: kebab-case (ex: `database-config.js`)
- **Componentes**: PascalCase (ex: `UserProfile.js`)

## 🚀 Próximos Passos

1. Criar estrutura de diretórios
2. Mover arquivos mantendo funcionalidade
3. Atualizar imports
4. Testar sistema
5. Atualizar documentação
