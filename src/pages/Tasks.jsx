import { useState, useEffect } from "react";
import "../styles/Tasks.css";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("default");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function fetchTasks() {
    axios
      .get("http://localhost:5001/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addTasks() {
    const trimmedTask = input.trim();

    if (trimmedTask !== "") {
      axios
        .post("http://localhost:5001/api/tasks", {
          text: trimmedTask,
        })
        .then(() => {
          fetchTasks();
          setInput("");
          setMessage("Task added ✅");
          setToastType("success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function deleteTasks(id) {
    axios
      .delete(`http://localhost:5001/api/tasks/${id}`)
      .then(() => {
        fetchTasks();
        setMessage("Task deleted ❌");
        setToastType("delete");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleComplete(task) {
    axios
      .put(`http://localhost:5001/api/tasks/${task.id}`, {
        completed: !task.completed,
      })
      .then(() => {
        fetchTasks();
        setMessage("Task status changed 🔄");
        setToastType("update");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editTask(task) {
    const newText = prompt("Edit task", task.text);

    if (!newText || newText.trim() === "") return;

    axios
      .put(`http://localhost:5001/api/tasks/edit/${task.id}`, {
        text: newText,
      })
      .then(() => {
        fetchTasks();
        setMessage("Task updated ✏️");
        setToastType("update");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "pending" && task.completed) return false;
    if (!task.text.toLowerCase().includes(search.toLowerCase()))
      return false;

    return true;
  });

  let sortedTasks = [...filteredTasks];

  if (sortType === "az") {
    sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
  }

  if (sortType === "za") {
    sortedTasks.sort((a, b) => b.text.localeCompare(a.text));
  }

  if (sortType === "completed") {
    sortedTasks.sort((a, b) => b.completed - a.completed);
  }

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Tasks</h2>

      {message && (
        <p className={`toast ${toastType}`}>
          {message}
        </p>
      )}

      <div className="task-input-section">
        <input
          className="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTasks();
          }}
          placeholder="Write a task"
        />

        <button
          className="add-button"
          onClick={addTasks}
        >
          Add
        </button>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      <div className="sort-buttons">
        <button onClick={() => setSortType("default")}>
          Default
        </button>

        <button onClick={() => setSortType("az")}>
          A-Z
        </button>

        <button onClick={() => setSortType("za")}>
          Z-A
        </button>

        <button onClick={() => setSortType("completed")}>
          Completed First
        </button>
      </div>

      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li
            className="task-item"
            key={task.id}
          >
            <span
              className={
                task.completed
                  ? "completed-task"
                  : ""
              }
            >
              {task.text}
            </span>

            <div className="task-buttons">
              <button
                className="complete-btn"
                onClick={() =>
                  toggleComplete(task)
                }
              >
                {task.completed
                  ? "Undo"
                  : "Complete"}
              </button>

              <button
                className="edit-btn"
                onClick={() =>
                  editTask(task)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTasks(task.id)
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;