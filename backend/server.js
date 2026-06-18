const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

console.log("SERVER STARTING...");

app.get("/", (req, res) => {
  res.send("MY BACKEND IS RUNNING");
});

/* =========================
   TASKS
========================= */

app.get("/api/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/tasks", (req, res) => {
  const { text } = req.body;

  db.query(
    "INSERT INTO tasks (text, completed) VALUES (?, ?)",
    [text, false],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task added",
        id: result.insertId,
      });
    }
  );
});

app.put("/api/tasks/edit/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  db.query(
    "UPDATE tasks SET text = ? WHERE id = ?",
    [text, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task updated",
      });
    }
  );
});

app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  db.query(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task status updated",
      });
    }
  );
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task deleted",
      });
    }
  );
});

/* =========================
   NOTES
========================= */

app.get("/api/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Note added",
        id: result.insertId,
      });
    }
  );
});

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  db.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Note updated",
      });
    }
  );
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM notes WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Note deleted",
      });
    }
  );
});

/* =========================
   STUDY TRACKER
========================= */

app.get("/api/study", (req, res) => {
  db.query("SELECT * FROM study_sessions", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/study", (req, res) => {
  const { subject, hours } = req.body;

  db.query(
    "INSERT INTO study_sessions (subject, hours) VALUES (?, ?)",
    [subject, hours],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Study session added",
        id: result.insertId,
      });
    }
  );
});

app.put("/api/study/:id", (req, res) => {
  const id = req.params.id;
  const { subject, hours } = req.body;

  db.query(
    "UPDATE study_sessions SET subject = ?, hours = ? WHERE id = ?",
    [subject, hours, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Study session updated",
      });
    }
  );
});

app.delete("/api/study/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM study_sessions WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Study session deleted",
      });
    }
  );
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});