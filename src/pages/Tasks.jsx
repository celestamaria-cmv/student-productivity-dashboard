import { useState, useEffect } from "react";
import "../styles/Tasks.css";
import useLocalStorage from "../hooks/useLocalStorage";

function Tasks(){
  const [tasks, setTasks] = useLocalStorage("Tasks", []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  
  function addTasks(){
    const trimmedTask = input.trim();

    if (trimmedTask !== ""){
      setTasks([...tasks, { text: trimmedTask, completed: false }]);
      setInput("");
    }
  }

  function deleteTasks(taskToDelete){
    setTasks(tasks.filter(t => t !== taskToDelete));
  }

  function editTasks(task, index){
    const newTask = prompt("Edit your task");

  if(newTask){
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newTask;
    setTasks(updatedTasks);
  }

  }

  function toggleComplete(task, index){
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
}
  const filteredTasks = tasks.filter(task => {

    if (filter === "completed"){
      return task.completed === true;
    }

    if (filter === "pending"){
      return task.completed === false;
    }

    return true;

  });

  return (
  <div className="tasks-container">

    <h2 className="tasks-title">Tasks</h2>

    <div className="task-input-section">
      <input
        className="task-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTasks();
          }
        }}
        placeholder="Write a task"
      />

      <button className="add-button" onClick={addTasks}>
        Add
      </button>
    </div>

    <div className="filter-buttons">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
    </div>

    <ul className="task-list">
      {filteredTasks.map((task, index) => (
        <li className="task-item" key={index}>

          <span className={task.completed ? "completed-task" : ""}>
            {task.text}
          </span>

          <div className="task-buttons">
            
            <button className="complete-btn" onClick={() => toggleComplete(task,index)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button className="edit-btn" onClick={() => editTasks(task,index)}>
              Edit
            </button>

            <button className="delete-btn" onClick={() => deleteTasks(task,index)}>
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