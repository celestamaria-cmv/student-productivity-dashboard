import { useEffect, useState } from "react";
import "../styles/StudyTracker.css"

function StudyTracker(){
   const [hours,setHours]=useState(()=>{
    const saved = localStorage.getItem("studyHours");
    return saved ? JSON.parse(saved) : 0;
   });

    useEffect(()=>{
        localStorage.setItem("studyHours",JSON.stringify(hours));
    },[{"text":"React","completed":false}]);

    function addHours(){
        setHours(hours +1);
    }

    function removeHours(){
        if(hours>0){
        setHours(hours-1);
    }
} 

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
   </div>
 </div>
)
}

export default StudyTracker;