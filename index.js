import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var listTitle = [];
var listPost = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {

  listTitle.push(req.body["titleplace"])
  listPost.push(req.body["postplace"])
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  const postDate = new Intl.DateTimeFormat('fr-FR', options).format(today);
  
  res.render("index.ejs", {
    titleToBePosted: listTitle,
    articleToBePosted: listPost,
    dateOfPost: postDate,
  });
});

app.post("/delete/:index", (req, res) => {
  const indexToDelete = req.params.index;

  listTitle.splice(indexToDelete, 1);
  listPost.pop(indexToDelete, 1);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  const postDate = new Intl.DateTimeFormat('fr-FR', options).format(today);
  
  res.render("index.ejs", {
    titleToBePosted: listTitle,
    articleToBePosted: listPost,
    dateOfPost: postDate,
  });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
