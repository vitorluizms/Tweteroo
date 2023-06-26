import express from "express";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

let tweets = [];
let users = [];

app.get("/tweets", (req, res) => {
	res.send(tweets)
})

app.post("/sign-up", (req, res) => {
	const {username, avatar} = req.body;

	
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))