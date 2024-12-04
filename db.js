
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
        return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }

    res.json(produto);
});


app.post("/produtos", (req, res) => {
    const { nome, quantidade, preco } = req.body;

    if (!nome || !quantidade || !preco) {
        return res.status(400).json({ mensagem: "Nome, quantidade e preço são obrigatórios!" });
    }

    const novoProduto = { nome, quantidade, preco };
    db.insereProduto(novoProduto);

    res.status(201).json(novoProduto);
});


app.patch("/produtos/:id", (req, res) => {
    const id = req.params.id;
    const dadosProduto = req.body;

    const produtoAlterado = db.alteraProduto(id, dadosProduto);

    if (produtoAlterado === "Produto não encontrado!") {
        return res.status(404).json({ mensagem: produtoAlterado });
    }

    res.status(200).json(produtoAlterado);
});

app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    
    const produtoRemovido = db.removeProduto(id);

    if (produtoRemovido === "Produto não encontrado!") {
        return res.status(404).json({ mensagem: produtoRemovido });
    }

    res.status(204).send(); 
});


app.get("/", (req, res) => {
    res.json({ mensagem: "API de produtos está funcionando!" });
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
