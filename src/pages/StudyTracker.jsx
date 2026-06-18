import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StudyTracker.css";

function StudyTracker() {
  const [studyData, setStudyData] = useState([]);
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {
    fetchStudyData();
  }, []);

  function fetchStudyData() {
    axios
      .get("http://localhost:5001/api/study")
      .then((res) => {
        setStudyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addStudySession() {
    if (!subject || !hours) return;

    axios
      .post("http://localhost:5001/api/study", {
        subject,
        hours,
      })
      .then(() => {
        fetchStudyData();
        setSubject("");
        setHours("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteStudySession(id) {
    axios
      .delete(`http://localhost:5001/api/study/${id}`)
      .then(() => {
        fetchStudyData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="study-container">
      <h2 className="study-title">Study Tracker</h2>

      <div className="study-inputs">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <button
          className="add-hour"
          onClick={addStudySession}
        >
          Add Session
        </button>
      </div>

      <h3>Study Sessions</h3>

      {studyData.map((item) => (
        <div key={item.id} className="study-item">
          <p>
            {item.subject} - {item.hours} hours
          </p>

          <button
            className="reset-hour"
            onClick={() => deleteStudySession(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudyTracker;