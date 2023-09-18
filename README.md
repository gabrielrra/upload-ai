# upload-ai

## Web App para Transcrição de Vídeos e Geração de Textos por IA

O **upload-ai** é uma aplicação web que utiliza a inteligência artificial para transcrever vídeos e gerar texto automaticamente.

## Funcionalidades

### Transcrição de Vídeos

1. Faça o upload de um vídeo para a plataforma.
2. O vídeo será automaticamente convertido em áudio.
3. Uma transcrição completa do áudio será gerada e salva.

### Assistência da IA

A partir da transcrição gerada, você pode aproveitar diversas funcionalidades de assistência da inteligência artificial:

- **Geração de Título**: Peça à IA para criar um título cativante para o seu vídeo, ideal para uso no YouTube!
- **Descrição do Vídeo**: Solicite à IA que elabore uma descrição detalhada para o seu vídeo, economizando tempo e esforço na criação de conteúdo!
- **Sugestões de Palavras-chave**: Receba recomendações de palavras-chave relevantes (hashtags) para otimizar a visibilidade do seu vídeo nos mecanismos de busca!
- **Textos para postagens**: Gere textos para para promover o vídeo em diferentes plataformas!

## Como Usar

1. Faça o login na plataforma (se necessário).
2. Faça o upload do seu vídeo.
3. Aguarde a transcrição ser concluída automaticamente.
4. Explore as opções de assistência da IA com base na transcrição gerada.

## Requisitos

Para executar o projeto é necessário ter o NodeJs instalado na sua máquina

### Executando a API

A API foi desenvolvida utilizando [Fastify](https://fastify.dev/) e pode ser executada utilizando os seguintes passos:

1. Acesse a pasta do projeto da API

```shell
cd api
```

2. Instale as dependências

```shell
npm install
```

3. Certifique-se de ter a sua chave da Open AI e localização do arquivo do banco de dados no arquivo de váriaveis de ambiente da API [.env](api/.env)

```shell
DATABASE_URL="file:./dev.db"
OPENAI_KEY="<SUA CHAVE>"
```

4. Inicialize o banco de dados

```shell
npx prisma migrate dev
```

5. Execute o projeto

```shell
npm run dev
```

### Executando a WebApp

A WebApp foi desenvolvida utilizando [Vite](https://vitejs.dev/) e pode ser executada utilizando os seguintes passos:

1. Acesse a pasta do projeto da WebApp

```shell
cd web
```

2. Instale as dependências

```shell
npm install
```

3. Execute o projeto

```shell
npm run dev
```

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar ou adicionar recursos ao projeto, sinta-se à vontade para criar um pull request!

## Licença

Este projeto está sob a licença MIT e é de código aberto. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

## Contato

Se você tiver alguma dúvida, problema ou sugestão, entre em contato conosco em [contato@gabrielrra.dev].

Aproveite o **upload-ai** para simplificar a transcrição de vídeos e a criação de conteúdo! 🚀
