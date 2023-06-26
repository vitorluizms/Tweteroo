import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tweets = [];
let users = [];

app.get("/tweets", (req, res) => {
  if (tweets.length > 0) {
    const lastTweets = tweets.slice(-10).reverse();
    res.send(lastTweets);
    return;
  }
  res.send(tweets);
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (username === "" || avatar === "") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  if (typeof username !== "string" || typeof avatar !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  const newUser = {
    username,
    avatar,
  };
  users.push(newUser);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const userValidate = users.find((element) => element.username === username);

  if (username === "" || tweet === "") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  if (userValidate === undefined) {
    res.status(401).send("UNAUTHORIZED");
    return;
  }
  if (!username || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  if (typeof username !== "string" || typeof tweet !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  const tweetObj = {
    username,
    avatar: userValidate.avatar,
    tweet,
  };
  tweets.push(tweetObj);
  res.status(201).send("OK");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
