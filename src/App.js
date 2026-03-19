import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import StudyTracker from './pages/StudyTracker';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useState,useEffect} from 'react';
import useLocalStorage from "./hooks/useLocalStorage";

function App() {

 const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
  <BrowserRouter>

    <Sidebar />

    <div className="main-content">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/study' element={<StudyTracker />} />
      </Routes>
    </div>

  </BrowserRouter>
</div>
  );
}

export default App;