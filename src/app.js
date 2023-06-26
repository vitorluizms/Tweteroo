import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tweets = [];
let users = [];

app.get("/tweets", (req, res) => {
  if (tweets.length > 0) {
    const lastTweets = tweets.slice(-10).reverse()
    res.send(lastTweets);
    return;
  }
  res.send(tweets);
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  const newUser = {
    username,
    avatar,
  };
  users.push(newUser);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const userValidate = users.find((element) => element.username === username);
  if (userValidate === undefined) {
    res.send("UNAUTHORIZED");
    return;
  }
  const tweetObj = {
    username,
    avatar: userValidate.avatar,
    tweet,
  };
  tweets.push(tweetObj);
  res.send("OK");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
