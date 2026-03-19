import { useState, useEffect } from "react";
import "../styles/Tasks.css";
import useLocalStorage from "../hooks/useLocalStorage";

function Tasks(){

  const [tasks, setTasks] = useLocalStorage("Tasks", []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("default");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function addTasks(){
    const trimmedTask = input.trim();

    if (trimmedTask !== ""){
      setTasks([...tasks, { text: trimmedTask, completed: false }]);
      setInput("");
      setMessage("Task added ✅");
      setToastType("success");
    }
  }

  function deleteTasks(taskToDelete){
    setTasks(tasks.filter(t => t !== taskToDelete));
    setMessage("Task deleted ❌");
    setToastType("delete");
  }

  function editTasks(task, index){
    const newTask = prompt("Edit your task");

    if(newTask){
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newTask;
      setTasks(updatedTasks);
      setMessage("Task updated ✏️");
      setToastType("update");
    }
  }

  function toggleComplete(task, index){
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    setMessage("Task status changed 🔄");
    setToastType("update");
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "pending" && task.completed) return false;
    if (!task.text.toLowerCase().includes(search.toLowerCase())) return false;
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

      {message && <p className={`toast ${toastType}`}>{message}</p>}

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

        <button className="add-button" onClick={addTasks}>
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
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <div className="sort-buttons">
        <button onClick={() => setSortType("default")}>Default</button>
        <button onClick={() => setSortType("az")}>A-Z</button>
        <button onClick={() => setSortType("za")}>Z-A</button>
        <button onClick={() => setSortType("completed")}>Completed First</button>
      </div>

      <ul className="task-list">
        {sortedTasks.map((task, index) => (
          <li className="task-item" key={index}>

            <span className={task.completed ? "completed-task" : ""}>
              {task.text}
            </span>

            <div className="task-buttons">
              
              <button
                className="complete-btn"
                onClick={() => toggleComplete(task, index)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="edit-btn"
                onClick={() => editTasks(task, index)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTasks(task)}
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