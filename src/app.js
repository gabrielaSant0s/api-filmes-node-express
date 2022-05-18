import express from "express";

const app = express();

app.use(express.json());

const filmes = [
  { id: 1, titulo: "Doutor Estranho", categoria: "Fantasia" },
  { id: 2, titulo: "Legalmente Loira", categoria: "Humor" },
];

// CRUD //

app.get("/", (req, res) => {
  res.status(200).send("Api de filmes");
});

// mostra json de filmes
app.get("/filmes", (req, res) => {
  res.status(200).json(filmes);
});

// mostra json de um filme específico
app.get("/filmes/:id", (req, res) => {
  let index = buscaFilme(req.params.id);
  res.json(filmes[index]);
});

//Adiciona um filme no json
app.post("/filmes", (req, res) => {
  filmes.push(req.body);
  res.status(201).send("filme cadastrado com sucesso");
});

// Edita um filme no json
app.put("/filmes/:id", (req, res) => {
  let index = buscaFilme(req.params.id);
  filmes[index].titulo = req.body.titulo;
  filmes[index].categoria = req.body.categoria;
  res.json(filmes);
});

// Exclui um filme
app.delete("/filmes/:id", (req, res) => {
  let { id } = req.params;
  let index = buscaFilme(id);
  filmes.splice(index, 1);
  res.send(`Livro ${id} excluido com sucesso`);
});

function buscaFilme(id) {
  return filmes.findIndex((filme) => filme.id == id);
}
export { app };
