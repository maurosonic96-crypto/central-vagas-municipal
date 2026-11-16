# Central de Vagas Municipal

Protótipo acadêmico de uma plataforma demonstrativa para explorar uma experiência digital de solicitação e acompanhamento de vagas na educação infantil.

> **Aviso:** este projeto é exclusivamente demonstrativo. Não é um serviço público oficial, não realiza inscrições reais e não consulta sistemas da Prefeitura. Use somente dados fictícios.

**Aplicação publicada:** https://central-vagas-municipal.vercel.app

## Objetivo

Demonstrar como uma interface municipal poderia organizar informações sobre inscrição, unidades de atendimento, acompanhamento de solicitações, critérios ilustrativos e canais de orientação. O protótipo foi desenvolvido como apoio a uma atividade acadêmica de avaliação de usabilidade.

## Funcionalidades

- **Inscrição demonstrativa:** formulário com validação dos campos obrigatórios e geração de um protocolo fictício.
- **Unidades:** apresentação de quatro unidades ilustrativas e seleção de uma opção para preencher o formulário.
- **Acompanhamento:** consulta do protocolo de exemplo `CV-2026-0042` e dos protocolos gerados no mesmo navegador.
- **Critérios de priorização:** apresentação de exemplos explicativos, com aviso de que não são regras oficiais.
- **Ajuda e WhatsApp:** exemplo copiável de mensagem e explicação de como notificações poderiam funcionar em um serviço real. Não há envio de mensagens.
- **Persistência local:** os protocolos gerados ficam no `localStorage` do navegador utilizado.

## Tecnologias e stack

O projeto utiliza tecnologias fundamentais da Web, sem frameworks ou dependências externas:

| Tecnologia | Responsabilidade neste projeto |
|---|---|
| HTML5 | Estrutura semântica das páginas, formulários, navegação e conteúdo |
| CSS3 | Identidade visual, layout responsivo, estados de interação e acessibilidade visual |
| JavaScript (Vanilla JS) | Navegação entre seções, eventos, validação, geração de protocolos, atualização da interface e manipulação do DOM |
| Web Storage (`localStorage`) | Persistência dos protocolos demonstrativos no navegador |

Não há backend, banco de dados remoto, autenticação, API externa ou integração com sistemas municipais.

## Estrutura do projeto

```text
central-vagas-municipal/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .gitignore
└── README.md
```

## Como executar

### Acessar a versão publicada

Abra: https://central-vagas-municipal.vercel.app

### Executar localmente

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em um navegador moderno.

O uso por um servidor local simples também é possível. Não é necessário instalar frameworks, gerenciadores de pacotes ou bibliotecas para este projeto.

## Roteiro de exploração: cinco tarefas

As tarefas abaixo podem ser usadas para conhecer o protótipo. Em avaliações com participantes, apresente apenas uma tarefa de cada vez e não antecipe onde clicar.

1. **Preencher uma inscrição fictícia:** entre em Inscrição, informe nomes inventados, selecione faixa etária e turno, confirme o aviso de dados fictícios e gere um protocolo.
2. **Selecionar uma unidade:** acesse Unidades, escolha uma opção demonstrativa e observe a confirmação. Depois, confira a unidade selecionada no formulário.
3. **Acompanhar uma solicitação:** acesse Acompanhar e consulte o protocolo de exemplo `CV-2026-0042` ou um protocolo criado durante a sessão. Identifique o status exibido.
4. **Consultar critérios:** abra Critérios, leia os exemplos apresentados e identifique uma das situações ilustradas.
5. **Localizar orientações sobre WhatsApp:** entre em Ajuda, examine o exemplo de mensagem e observe como o protótipo explica as possíveis atualizações.

## Dados, privacidade e limitações

- Digite apenas nomes e informações inventadas. Não informe CPF, endereço, telefone ou dados reais de crianças ou responsáveis.
- Os protocolos criados são armazenados somente no `localStorage` do navegador e dispositivo em uso. Eles não são enviados à Prefeitura nem compartilhados entre navegadores ou dispositivos.
- Limpar os dados do site no navegador pode apagar os protocolos locais.
- As unidades, disponibilidade, datas, critérios e status são dados de demonstração, não informações oficiais.
- A consulta de acompanhamento não acessa uma fila real.
- O exemplo de WhatsApp é apenas texto copiável; não há conexão com o aplicativo nem envio de notificações.
- Este protótipo não substitui sistemas, orientações ou canais oficiais do município.

## Uso de Inteligência Artificial e aprendizagem técnica

O desenvolvimento contou com apoio de ferramentas de Inteligência Artificial para acelerar a prototipação, apoiar a organização do código, revisar soluções e produzir documentação. A IA foi utilizada como ferramenta de apoio, não como substituta do conhecimento técnico.

A aplicação foi construída sobre tecnologias fundamentais da própria stack: HTML para estruturar o conteúdo, CSS para apresentação e responsividade, e JavaScript para implementar a lógica, validar formulários, manipular o DOM, tratar eventos e persistir informações localmente com `localStorage`.

O objetivo é demonstrar que utilizar IA no desenvolvimento não dispensa compreender, estudar, revisar e ser capaz de explicar as tecnologias que sustentam o software. As decisões, funcionalidades, limitações e comportamentos do sistema devem ser compreendidos e validados pelo desenvolvedor. A ferramenta pode acelerar o trabalho, mas a responsabilidade técnica continua sendo de quem desenvolve.

## Validação e estado do projeto

O conteúdo publicado foi reorganizado em arquivos separados para facilitar leitura, manutenção e estudo. A sintaxe do JavaScript foi verificada estaticamente durante a preparação desta estrutura. Isso não equivale a um teste completo de ponta a ponta: os fluxos devem ser explorados no navegador e testados com dados fictícios.

**Status:** protótipo acadêmico demonstrativo / MVP de interface.

## Próximos passos possíveis

- Realizar testes de usabilidade com participantes e registrar dificuldades observadas.
- Melhorar a documentação das decisões de interface e dos requisitos.
- Evoluir a aplicação somente após definir regras oficiais, requisitos de segurança, privacidade e integração com sistemas autorizados.
