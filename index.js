const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;

const { v4, validate } = require("uuid");

const projects = [];

function logRequest(req, res, next) {
  console.time(req.method + " - " + req.url);

  next();

  console.timeEnd(req.method + " - " + req.url);
}

function checkId(req, res, next) {
  const { id } = req.params;
  if (!validate(id)) {
    return res.status(400).json({ message: "Project not found!" });
  } else {
    next();
  }
}

app.use(logRequest);

app.get("/project", (req, res) => {
  return res.json(projects);
});

app.post("/project", (req, res) => {
  const { name, language } = req.body;

  const project = {
    id: v4(),
    name,
    language,
  };

  projects.push(project);

  return res.status(201).json(project);
});

app.put("/project/:id", checkId, (req, res) => {
  const { id } = req.params;
  const { name, language } = req.body;

  const newProject = {
    id,
    name,
    language,
  };

  const projectIndex = projects.findIndex((project) => project.id === id);

  projects[projectIndex] = newProject;

  return res.json(newProject);
});

app.delete("/project/:id", checkId, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(port, () => {
  console.log("server initialized with success");
});
