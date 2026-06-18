import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import '../styles/StudyTracker.css'
import { useEffect,useState } from "react";

function StudyTracker(){
     const [hours, setHours] = useLocalStorage("studyHours", 0);
    const [studyData, setStudyData] = useState([]);
    function addHours(){
        setHours(hours +1);
    }

    function removeHours(){
        if(hours>0){
        setHours(hours-1);
    }
} 
useEffect(() => {
  axios
    .get("http://localhost:5001/api/study")
    .then((res) => {
      setStudyData(res.data);
    });
}, []);
    function resetHours(){
        setHours(0);
    }

return(
    <div className="study-container">
    <h2 className="study-title">Study Tracker</h2>
    
    <div className="study-hours-box">
      <h3>Total Hours Studied Today:{hours}</h3>
    </div>

    <div className="study-buttons">
    <button className="add-hour" onClick={addHours}>
        +1 Hour</button>
    <button className="remove-hour" onClick={removeHours}>
        -1 Hour</button>
    <button className="reset-hour" onClick={resetHours}>
        Reset</button>
        <h3>Study Data from Backend</h3>

{studyData.map((item) => (
  <p key={item.id}>
    {item.subject} - {item.hours} hours
  </p>
))}
   </div>
 </div>
)
}

export default StudyTracker;