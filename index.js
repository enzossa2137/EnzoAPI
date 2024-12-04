
require("dotenv").config(); 
const express = require("express");
const db = require("./db");  
const app = express();


app.use(express.json());


app.get("/produtos", (req, res) => {
  const produtos = db.listaProdutos();
  res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const produto = db.listaProduto(id);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.json(produto);
});


app.post("/produtos", (req, res) => {
  const { nome, quantidade, preco } = req.body;

  if (!nome || !quantidade || !preco) {
    return res.status(400).json({ mensagem: "Nome, quantidade e preço são obrigatórios" });
  }

  const novoProduto = { nome, quantidade, preco };
  const produto = db.insereProduto(novoProduto);

  res.status(201).json(produto);
});


app.patch("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const dadosProduto = req.body;

  const produto = db.alteraProduto(id, dadosProduto);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});


app.delete("/produtos/:id", (req, res) => {
  const id = req.params.id;

  const sucesso = db.removeProduto(id);

  if (!sucesso) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.status(204).send(); 
});


app.get("/", (req, res) => {
  res.json({ message: "API de produtos está OK!" });
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
