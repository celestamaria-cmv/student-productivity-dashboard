import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [hours, setHours] = useState(0);

  useEffect(() => {

    const savedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedHours = JSON.parse(localStorage.getItem("studyHours")) || 0;

    setTasks(savedTasks);
    setNotes(savedNotes);
    setHours(savedHours);

  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalNotes = notes.length;

  const taskChartData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks }
  ];

  const studyChartData = [
    { name: "Study Hours", value: hours }
  ];

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="card">
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="card">
          <h3>Pending Tasks</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="card">
          <h3>Study Hours Today</h3>
          <p>{hours}</p>
        </div>

        <div className="card">
          <h3>Total Notes</h3>
          <p>{totalNotes}</p>
        </div>

      </div>

      <div className="chart-container">
        <h3>Task Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={taskChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Study Hours</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studyChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Dashboard;