# Maré

Aplicação web responsiva em **React** que acompanha a maré nas praias de Salvador.
A palavra principal da tela ("enchendo" ou "vazando") é preenchida com água até o nível
atual da maré e se atualiza sozinha a cada 30 segundos.

Atividade da disciplina de Engenharia de Software (UCSal), com o **desafio extra completo**:
estado global com **Context API** e navegação com **React Router**.

## Como rodar

### No GitHub Codespaces (ambiente exigido)
1. Suba esta pasta para um repositório no GitHub.
2. No repositório: **Code → Codespaces → Create codespace**.
3. O `.devcontainer.json` já instala as dependências (`npm install`) e o pacote de idioma em português.
4. No terminal: `npm run dev`. A porta 5173 abre no navegador automaticamente.

### Localmente
```bash
npm install
npm run dev
```
Requer Node.js 18 ou superior.

## Os 6 componentes obrigatórios

| Componente | Arquivo | Onde aparece | Conceitos demonstrados |
|---|---|---|---|
| Acordeão | `src/components/Accordion/Accordion.jsx` | Ajuda | `useState` com o item aberto, `items` via props, só um aberto por vez, transição suave (grid 0fr→1fr), `aria-expanded` |
| Paginação | `src/components/Pagination/Pagination.jsx` | Vida marinha | Recebe `totalPages`, `currentPage` e o callback `onPageChange` via props, botões desabilitados nas pontas, `aria-current="page"` |
| Barra de progresso | `src/components/ProgressBar/ProgressBar.jsx` | Início e Boias | Recebe `value` (0–100) via props e ajusta a largura, `role="progressbar"` |
| Abas | `src/components/Tabs/Tabs.jsx` | Início | `useState` com a aba ativa, navegação por setas/Home/End, `role="tablist"`, `tab`, `tabpanel` |
| Menu suspenso | `src/components/Dropdown/Dropdown.jsx` | Cabeçalho (estação) e Vida marinha (filtro) | Visibilidade em `useState`, opções via props com callback por opção, fecha ao escolher, ao clicar fora (`useClickOutside`) e com Esc |
| Toast | `src/components/Toast/Toast.jsx` + `ToastViewport.jsx` | Todas as páginas | Tipos sucesso/erro/info, some sozinho (`useEffect` + `setTimeout`), pausa ao passar o mouse, botão fechar, `role="status"`/`alert` |

## Desafio extra

**Context API** (`src/context/`)
- `ToastContext`: qualquer componente chama `showToast()` sem receber props. Ex.: o cabeçalho, a lista de espécies e a página de boias disparam toasts.
- `StationContext`: a estação escolhida no menu do cabeçalho é lida pelo herói, pelas abas e pela página de boias, que não são pai e filho entre si. A escolha fica salva no `localStorage`.

**React Router** (`src/App.jsx`)
- Rotas `/`, `/vida-marinha`, `/boias`, `/ajuda` e uma página 404, todas dentro de um `Layout` com `<Outlet />`.
- `NavLink` marca a página ativa no menu.

## Estrutura

```
src/
├── App.jsx              # orquestra provedores de contexto e rotas
├── main.jsx             # ponto de entrada
├── components/          # componentes reutilizáveis (cada um com seu CSS)
│   ├── Accordion/  Dropdown/  Pagination/  ProgressBar/  Tabs/  Toast/
│   ├── TideHero/        # herói com a palavra preenchida de água (SVG + clipPath)
│   ├── SpeciesRow/      # linha do catálogo com régua de profundidade
│   └── layout/          # Header e Layout
├── context/             # estado global (Context API)
├── hooks/               # useTide (relógio da maré) e useClickOutside
├── pages/               # Home, Species, Buoys, Help, NotFound
├── data/                # estações, espécies, perguntas frequentes
├── utils/tide.js        # modelo matemático simplificado da maré
└── styles/              # tokens de design e estilos globais
```

## Acessibilidade e responsividade
- HTML semântico: `header`, `nav`, `main`, `section`, `footer`, `table` com `caption`, `dl`.
- Link "Pular para o conteúdo", foco visível em amarelo, navegação completa por teclado.
- Atributos ARIA em todos os componentes interativos.
- Respeita `prefers-reduced-motion` (desliga as animações das ondas).
- Layout fluido com `clamp()`, grid e flexbox; testado em 390 px (celular), 768 px (tablet) e 1360 px (desktop).

## Sobre os dados
As alturas vêm de um modelo com uma única componente lunar (M2, período de 12h25min). Servem para estudo,
não para navegação. As espécies são reais, do litoral baiano; as estações e boias são fictícias.
