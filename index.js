require("dotenv").config(); 
const express = require("express");
const app = express();

app.use(express.json());


const produtos = [
  { id: 1, nome: "Pneu Aro 15", quantidade: 20, preco: 350.0 },
  { id: 2, nome: "Óleo de Motor", quantidade: 50, preco: 45.0 },
  { id: 3, nome: "Velas de Ignição", quantidade: 100, preco: 25.0 },
  { id: 4, nome: "Bateria 60Ah", quantidade: 15, preco: 450.0 },
  { id: 5, nome: "Filtro de Ar", quantidade: 30, preco: 60.0 },
];


const listaProdutos = () => produtos;
const listaProduto = (id) => produtos.find((produto) => produto.id === parseInt(id));
const insereProduto = (novoProduto) => {
  const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
  const produto = { id, ...novoProduto };
  produtos.push(produto);
  return produto;
};
const alteraProduto = (id, dadosProduto) => {
  const index = produtos.findIndex((produto) => produto.id === parseInt(id));
  if (index === -1) return null;
  produtos[index] = { ...produtos[index], ...dadosProduto };
  return produtos[index];
};
const removeProduto = (id) => {
  const index = produtos.findIndex((produto) => produto.id === parseInt(id));
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
};

// Rotas da API
app.get("/produtos", (req, res) => {
  res.json(listaProdutos());
});

app.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const produto = listaProduto(id);

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
  const produto = insereProduto(novoProduto);

  res.status(201).json(produto);
});

app.patch("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const dadosProduto = req.body;

  const produto = alteraProduto(id, dadosProduto);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});

app.delete("/produtos/:id", (req, res) => {
  const id = req.params.id;

  const sucesso = removeProduto(id);

  if (!sucesso) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.status(204).send();
});

app.get("/", (req, res) => {
  res.json({ message: "API de produtos está OK!" });
});

app.listen(process.env.PORT || 3002, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3002}`);
});