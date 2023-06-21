# Backend API
Esta é uma API backend construída utilizando o framework Express para fornecer informações sobre posições de trabalho. A API oferece diferentes endpoints para buscar, filtrar e obter opções relacionadas às posições de trabalho.

## Endpoints
### Obter Posições de Trabalho Paginadas
```URL: /positions```

### Método: GET

### Parâmetros de Consulta:

- page (opcional): Número da página atual (padrão: 1)
- limit (opcional): Quantidade de itens por página (padrão: 10)

**Descrição:** Este endpoint retorna uma lista paginada de posições de trabalho. As posições de trabalho são retornadas em ordem decrescente com base na data. As datas são formatadas no padrão "dd/MM/yyyy".

### Exemplo de Resposta:

```
{
  "currentPage": 1,
  "totalPages": 3,
  "totalItems": 28,
  "itemsPerPage": 10,
  "jobs": [
    {
      "id": 1,
      "title": "Desenvolvedor Frontend",
      "position": "frontend",
      "level": "junior",
      "locale": "São Paulo",
      "date": "15/06/2023"
    },
    // ...
  ]
}
```

### Obter Opções de Filtro
```URL: /options```

### Método: GET

### Parâmetros de Consulta:

- type (obrigatório): Tipo de opção a ser obtida. Pode ser "locale", "position" ou "experience".

**Descrição:** Este endpoint retorna uma lista de opções disponíveis para filtrar as posições de trabalho. As opções são retornadas em ordem alfabética.

### Exemplo de Resposta:

```
[
  "Desenvolvedor Full Stack",
  "Desenvolvedor Backend",
  "Desenvolvedor Frontend",
  // ...
]
```


### Filtrar Posições de Trabalho
```URL: /positions/filter```

### Método: POST

### Parâmetros de Consulta:

- page (opcional): Número da página atual (padrão: 1)
- limit (opcional): Quantidade de itens por página (padrão: 10000)

- Corpo da Requisição:

```
{
  "searchString": "Desenvolvedor",
  "selectedLocales": ["São Paulo", "Rio de Janeiro"],
  "selectedPositions": ["frontend"],
  "selectedExperiences": ["junior"]
}
```

**Descrição:** Este endpoint filtra as posições de trabalho com base nos critérios especificados no corpo da requisição. Os critérios incluem uma string de busca, locais selecionados, posições selecionadas e níveis de experiência selecionados. O resultado é retornado como uma lista paginada.

Exemplo de Resposta:
```
{
  "currentPage": 1,
  "totalPages": 2,
  "totalItems": 8,
  "itemsPerPage": 10,
  "jobs": [
    {
      "id": 1,
      "title": "Desenvolvedor Frontend",
      "position": "frontend",
      "level": "junior",
      "locale": "São Paulo",
      "date": "15/06/2023"
    },
    // ...
  ]
}
```

## Configuração e Execução
- Certifique-se de ter o Node.js instalado em seu ambiente.
- Execute o comando npm install para instalar as dependências necessárias.
- Execute o comando node index.js para iniciar o serviço na porta 3000.
- A API estará disponível em http://localhost:3000.
- Certifique-se de que os dados de trabalho estão presentes em um arquivo jobs.json no mesmo diretório do arquivo do servidor.

Você pode ajustar as configurações da porta e outras configurações do servidor conforme necessário.

## Considerações Finais
Esta API backend foi desenvolvida para fornecer informações sobre posições de trabalho e oferece recursos de busca e filtragem para facilitar a obtenção de dados específicos. Sinta-se à vontade para explorar os endpoints disponíveis e adaptar o código para atender às necessidades do seu projeto.
