# Checkpoint Games

Loja de jogos autoral refatorada de HTML, CSS e JavaScript para React + Vite. O projeto preserva os assets originais e organiza a aplicação com uma arquitetura inspirada em MVVM, separando dados, regras de estado e interface.

## Sobre o projeto

A Checkpoint Games oferece uma experiência simples de descoberta e compra de jogos digitais. A home apresenta a seleção em destaque sobre o wallpaper synthwave `001.jpg`, enquanto o catálogo permite buscar, ordenar e consultar detalhes dos produtos.

## Stack

- React
- Vite
- React Router
- JavaScript moderno (ES Modules)
- CSS responsivo
- `localStorage` para carrinho e sessão local

## Funcionalidades

- Home com hero visual e produtos em destaque.
- Wallpaper principal utilizando `001.jpg`.
- Catálogo com 12 jogos, busca por título e ordenação por nome ou preço.
- Modal com imagem, preço, produtora, gênero e descrição do produto.
- Carrinho persistido no navegador.
- Controle de quantidade e remoção de itens.
- Cupom de desconto `UTFPR`, com 15% de desconto.
- Login e cadastro locais para liberar a finalização da compra.
- Página de contato com confirmação de envio.
- Layout responsivo para desktop e dispositivos móveis.

## Arquitetura MVVM

```text
src/
├── model/
│   ├── format.js       # Formatação de valores monetários
│   ├── products.js     # Catálogo e produtos em destaque
│   └── storage.js      # Persistência no localStorage
├── viewmodel/
│   └── useStoreViewModel.js
│                         # Estado e regras do carrinho e autenticação
├── view/
│   ├── components/     # Componentes reutilizáveis da interface
│   ├── views/          # Home, produtos, carrinho e contato
│   └── App.jsx         # Rotas da aplicação
├── styles/
│   └── global.css      # Design system e responsividade
└── main.jsx            # Ponto de entrada React
```

### Responsabilidades

- **Model:** representa produtos, persistência e funções de domínio simples.
- **ViewModel:** concentra o estado compartilhado e as ações da loja.
- **View:** renderiza as telas e encaminha eventos do usuário ao ViewModel.

## Rotas

| Rota | Tela |
| --- | --- |
| `/#/` | Home e produtos em destaque |
| `/#/produtos` | Catálogo completo |
| `/#/carrinho` | Resumo e finalização da compra |
| `/#/contato` | Formulário de contato |

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Depois, abra a URL exibida pelo Vite, normalmente `http://127.0.0.1:5173/`.

Para validar a versão de produção:

```bash
npm run build
npm run preview
```

Como o projeto pode ser executado dentro de uma pasta sincronizada pelo OneDrive, o Vite está configurado para usar polling no watcher e evitar erros `EBUSY` em arquivos bloqueados durante a sincronização. O build de produção é gerado em `docs/`, configuração compatível com o GitHub Pages.

## Assets

As imagens originais foram preservadas em `public/assets`. Os produtos usam as capas existentes no projeto, e `001.jpg` é aplicado como imagem de fundo principal da home.

Os arquivos HTML, CSS e JavaScript da versão original foram preservados na pasta `legacy/`, junto com os assets históricos em `legacy/assets/`. A aplicação atual é iniciada pelo `index.html` do Vite.
