# PauloFlix

Projeto de estudos em front-end inspirado na experiencia visual de plataformas de streaming.

O foco principal do meu trabalho foi construir e personalizar a tela inicial, integrar a escolha de perfis com o catalogo e melhorar a experiencia visual, responsiva e interativa da aplicacao.

## Visao geral

O projeto comeca em uma tela de selecao de perfis e leva o usuario para um catalogo com cards interativos, trailer no hover e persistencia de preferencias com `localStorage`.

## O que eu desenvolvi

- Rebranding visual para `PauloFlix`, substituindo referencias diretas a Netflix na interface
- Tela inicial com selecao de perfis
- Persistencia do perfil escolhido usando apenas `localStorage`
- Sincronizacao do perfil ativo no topo do catalogo, com nome e foto corretos
- Modo claro e escuro com persistencia entre paginas
- Ajustes de responsividade para home e catalogo
- Melhorias de navegacao no catalogo para telas menores, com menu recolhido e setas nos carrosseis
- Organizacao dos cards com imagem e trailer correspondentes
- Refinos visuais no hover dos cards e na experiencia geral da interface

## Sobre o catalogo

A pagina de catalogo partiu de uma base visual ja existente feita por outro profissional.

Nessa parte, meu trabalho foi principalmente:

- integrar essa tela com a minha pagina inicial
- adaptar a identidade visual para PauloFlix
- conectar perfil e tema entre as paginas
- melhorar responsividade e navegacao
- ajustar conteudo dos cards para manter coerencia entre imagem e trailer

## Estrutura principal

- `index.html` -> tela inicial com perfis
- `styles.css` -> estilos da home
- `script.js` -> controle de tema da home
- `profile-selection.js` -> salvamento do perfil ativo
- `assets/` -> logo e imagens de perfil
- `catalogo/` -> pagina de catalogo integrada ao projeto

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- `localStorage`

## Como executar

1. Clone o repositorio:
   `git clone https://github.com/<seu-usuario>/Netflix-Clone.git`
2. Entre na pasta:
   `cd Netflix-Clone`
3. Abra o arquivo `index.html` no navegador

Voce tambem pode usar a extensao Live Server no VS Code.

## Objetivo do projeto

Praticar:

- estrutura de paginas em HTML
- responsividade com CSS
- interacoes com JavaScript
- persistencia de estado no navegador
- integracao entre duas telas diferentes dentro do mesmo projeto
