const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
console.log("SERVER STARTING...");
const tasks = [
  {
    id: 1,
    title: "Cloud Assignment"
  },
  {
    id: 2,
    title: "Study German"
  }
];

app.get("/", (req, res) => {
  res.send("MY BACKEND IS RUNNING");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});
app.get("/api/tasks", (req, res) => {
  res.json([
    {
      id: 1,
      text: "Cloud Computing Assignment",
      completed: false
    },
    {
      id: 2,
      text: "Prepare Presentation",
      completed: true
    }
  ]);
});
app.get("/api/notes", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Cloud Computing",
      content: "Prepare architecture diagram"
    },
    {
      id: 2,
      title: "German",
      content: "Revise adjective endings"
    }
  ]);
});
app.get("/api/study", (req, res) => {
  res.json([
    {
      id: 1,
      subject: "Cloud Computing",
      hours: 3
    },
    {
      id: 2,
      subject: "German",
      hours: 2
    }
  ]);
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});