const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.status(200).json(repositories);

});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  const data = { id: uuid(), likes: 0, techs, title, url};

  repositories.push(data);

  response.status(200).json(data);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositoriesIndex = repositories.findIndex(repositorio => repositorio.id == id);

  if(repositoriesIndex < 0){

    return response.status(400).json({error: 'Project not found'});
  }

  const repo = repositories[repositoriesIndex];

  const data = {
    id: repo.id, 
    likes: repo.likes,
    techs, 
    title,
    url
  };

  repositories[repositoriesIndex] = data;

  return response.json(data);

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repositorio => repositorio.id == id);

  if(repositoriesIndex < 0){

    return response.status(400).json({error: 'Project not found'});
  }

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repositorio => repositorio.id == id);

  if(repositoriesIndex < 0){

    return response.status(400).json({error: 'Project not found'});
  }

  const data = repositories[repositoriesIndex];

  data.likes++;

  repositories[repositoriesIndex] = data;
  
  return response.status(200).json(data);
});

module.exports = app;
