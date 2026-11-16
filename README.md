# Central de Vagas Municipal

Protótipo acadêmico de alta fidelidade para avaliação de usabilidade de uma Central Municipal de Vagas.

> **Aviso:** esta aplicação é exclusivamente demonstrativa. Não realiza inscrição oficial, não consulta filas reais, não confirma disponibilidade de vagas e não envia mensagens por WhatsApp. Os nomes, protocolos, unidades, situações e critérios apresentados são fictícios.

## Aplicação publicada

https://central-vagas-municipal.vercel.app

## Objetivo

Demonstrar, em uma interface web, como um cidadão poderia navegar por um serviço municipal de solicitação e acompanhamento de vagas. O protótipo foi preparado para apoiar atividades acadêmicas de avaliação de usabilidade, com tarefas que permitem observar compreensão, facilidade de navegação e percepção de utilidade.

## Funcionalidades demonstrativas

- **Inscrição:** formulário com validação de campos e confirmação de uso de dados fictícios. Ao concluir, gera um protocolo demonstrativo.
- **Unidades:** apresenta unidades fictícias e permite selecionar uma opção para preencher o formulário.
- **Acompanhamento:** permite consultar o protocolo de exemplo `CV-2026-0042` e protocolos gerados no mesmo navegador.
- **Critérios:** exibe exemplos ilustrativos de critérios de priorização, sem representar regras oficiais.
- **Ajuda / WhatsApp:** apresenta orientações e um exemplo de mensagem que pode ser copiado; não existe envio de mensagem.

## Cinco tarefas de avaliação

1. Acessar **Inscrição**, preencher os campos com nomes inventados e gerar o protocolo demonstrativo.
2. Acessar **Unidades**, escolher uma unidade e observar a seleção.
3. Acessar **Acompanhamento**, consultar o protocolo de exemplo e interpretar o status apresentado.
4. Acessar **Critérios** e identificar um dos critérios ilustrativos.
5. Acessar **Ajuda** e localizar as orientações sobre como as atualizações poderiam ocorrer por WhatsApp em um serviço real.

As tarefas devem ser realizadas com dados inteiramente fictícios. Não informe CPF, telefone, endereço ou qualquer dado pessoal verdadeiro.

## Tecnologias utilizadas

| Tecnologia | Responsabilidade no projeto |
|---|---|
| HTML5 | Estrutura semântica e conteúdo das telas |
| CSS3 | Identidade visual, componentes e adaptação para diferentes larguras de tela |
| JavaScript puro (Vanilla JS) | Navegação, validações, atualização da interface, geração e consulta de protocolos |
| Web Storage (`localStorage`) | Persistência local dos protocolos no navegador |

O protótipo não utiliza framework JavaScript, backend, banco de dados, API externa ou integração com sistemas da Prefeitura.

## Estrutura do projeto

```text
central-vagas-municipal/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── README.md
└── .gitignore
```

### Organização dos arquivos

- `index.html`: documento principal e estrutura das seções da aplicação.
- `assets/css/styles.css`: regras de estilo, cores, espaçamentos, componentes e responsividade.
- `assets/js/app.js`: lógica de navegação, eventos, validações, protocolos, armazenamento local e mensagens de retorno.
- `.gitignore`: arquivos locais e temporários que não devem integrar o versionamento.

## Como executar

Não é necessário instalar dependências ou configurar um servidor backend.

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador atualizado.
3. Navegue pelas seções e experimente as funcionalidades com dados fictícios.

Também é possível publicar os arquivos estáticos em serviços de hospedagem compatíveis, como a Vercel.

## Armazenamento e privacidade

Os protocolos gerados são guardados no `localStorage` do navegador. Isso significa que:

- os dados permanecem apenas no navegador e no dispositivo em que foram criados;
- outro participante, computador ou navegador não recebe esses registros automaticamente;
- limpar os dados do site no navegador pode apagar os protocolos armazenados;
- não existe transmissão de dados para um servidor ou para a Prefeitura.

Por ser uma demonstração acadêmica, não utilize dados pessoais ou sensíveis.

## Uso de Inteligência Artificial e aprendizagem técnica

O desenvolvimento contou com apoio de ferramentas de Inteligência Artificial para acelerar a prototipação, apoiar a organização do código, revisar soluções e produzir documentação. A IA foi utilizada como ferramenta de apoio, e não como substituta do conhecimento técnico.

A aplicação está fundamentada nas tecnologias da própria stack utilizada: HTML para estruturar o conteúdo, CSS para apresentar a interface de forma responsiva e JavaScript para implementar a lógica, validar informações, manipular o DOM, responder a eventos e persistir dados localmente com `localStorage`.

O objetivo é demonstrar que utilizar IA no desenvolvimento não elimina a necessidade de compreender, estudar, revisar, testar e explicar as tecnologias que sustentam o software. O desenvolvedor continua responsável pelas decisões técnicas, pelo comportamento da aplicação, pela segurança dos dados e pela validação do resultado.

Em outras palavras: **a IA pode ajudar a construir, mas o conhecimento da stack permite entender, corrigir, evoluir e assumir a responsabilidade pelo que foi construído.**

## Estado da validação

- A página de produção foi consultada e respondeu com HTTP 200 durante a preparação deste repositório.
- Os arquivos de HTML, CSS e JavaScript foram organizados a partir da versão publicada.
- Isso não equivale a um teste completo de ponta a ponta em todos os navegadores ou a uma auditoria formal de acessibilidade.

## Contexto acadêmico

Projeto desenvolvido como protótipo de interface para estudo de Engenharia de Software e avaliação de usabilidade. Não representa um serviço público oficial nem substitui canais de atendimento do município.
