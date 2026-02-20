# Pomoclock - Timer Pomodoro

Timer Pomodoro moderno com gerenciamento de tarefas.

## 🚀 Como executar o projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Compile o TypeScript:
```bash
npm run build
```

3. Inicie o servidor:
```bash
npm run serve
```

O projeto abrirá automaticamente no navegador em `http://localhost:3000`

### Scripts disponíveis

- `npm run build` - Compila o TypeScript para JavaScript
- `npm run watch` - Compila o TypeScript em modo watch (recompila automaticamente)
- `npm run serve` - Inicia um servidor HTTP local

## 📁 Estrutura do projeto

```
pomoclockkkk-main/
├── public/              # Arquivos públicos (HTML, CSS, JS compilado)
│   ├── index.html      # Página principal
│   ├── styles.css      # Estilos
│   └── script.js       # JavaScript compilado (gerado)
├── script.ts           # Código TypeScript fonte
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
└── README.md          # Este arquivo
```

## ✨ Funcionalidades

- ⏱️ Timer Pomodoro com controles de iniciar, pausar e resetar
- 🎯 Presets rápidos: Foco (25min), Descanso Curto (5min), Descanso Longo (15min)
- ⚙️ Configuração personalizável das durações
- 📝 Lista de compromissos/tarefas
- 🎨 Interface moderna e responsiva
- ♿ Acessível (ARIA labels)

## 🎯 Como usar

1. Clique em "Iniciar" para começar o timer
2. Use os botões rápidos para mudar entre modos
3. Adicione tarefas na seção "Compromissos"
4. Configure durações personalizadas nas configurações

## 🛠️ Tecnologias

- TypeScript
- HTML5
- CSS3 (com custom properties e animações)
- Vanilla JavaScript (sem frameworks)

## 📝 Alternativa sem build

Se você não quiser usar o sistema de build, pode:

1. Renomear `script.ts` para `script.js`
2. Remover as anotações de tipo do TypeScript
3. Abrir `public/index.html` diretamente no navegador

Porém, recomendamos usar o TypeScript para melhor experiência de desenvolvimento.
