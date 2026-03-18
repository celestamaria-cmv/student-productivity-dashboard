import { useState,useEffect } from "react";
import "../styles/Notes.css";
import useLocalStorage from "../hooks/useLocalStorage";


function Notes(){
  const [notes, setNotes] = useLocalStorage("notes", []);
  const[input,setInput]=useState("");

function addNote(){
  const trimmedNote=input.trim();

  if(trimmedNote !==""){
    setNotes([...notes,trimmedNote])
    setInput("");
  }

}

function deleteNote(index){
  setNotes(notes.filter((_, i) => i !== index));
}

return(
  <div className="notes-container">

    <h2 className="notes-title">Notes</h2>

    <div className="notes-input-section">

      <input
        className="notes-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            addNote();
          }
        }}
        placeholder="Write a note"
      />

      <button className="add-note-btn" onClick={addNote}>
        Add
      </button>

    </div>

    <ul className="notes-list">
      {notes.map((note,index)=>(
        <li className="note-item" key={index}>

          <span className="note-text">
            {note}
          </span>

          <button
            className="delete-note-btn"
            onClick={()=>deleteNote(index)}
          >
            Delete
          </button>

        </li>
      ))}
    </ul>

  </div>
);
}
export default Notes;