import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", function (request: Request, response: Response) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((data) => {
      const results = data.results.map((pokemon: any) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return { ...pokemon, id };
      });
      response.render("index", { results });
    });
});

app.get("/pokemon/:id", function (request: Request, response: Response) {
  const { id } = request.params;

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((pokemon) => {
      response.render("pokemon", { pokemon });
    })
    .catch((error) => {
      console.error("Erro ao buscar Pokémon:", error);
      response.status(500).send("Erro ao buscar Pokémon");
    });
});

app.listen(3000, function () {
  console.log("Server is running");
});
