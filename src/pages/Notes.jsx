import { useState, useEffect } from "react";
import "../styles/Notes.css";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    axios
      .get("http://localhost:5001/api/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addNote() {
    if (!title || !content) return;

    axios
      .post("http://localhost:5001/api/notes", {
        title,
        content,
      })
      .then(() => {
        fetchNotes();
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteNote(id) {
    axios
      .delete(`http://localhost:5001/api/notes/${id}`)
      .then(() => {
        fetchNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editNote(note) {
    const newTitle = prompt("Edit title", note.title);
    const newContent = prompt("Edit content", note.content);

    if (!newTitle || !newContent) return;

    axios
      .put(`http://localhost:5001/api/notes/${note.id}`, {
        title: newTitle,
        content: newContent,
      })
      .then(() => {
        fetchNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="notes-container">
      <h2 className="notes-title">Notes</h2>

      <div className="notes-input-section">
        <input
          className="notes-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="notes-input"
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="add-note-btn"
          onClick={addNote}
        >
          Add
        </button>
      </div>

      <ul className="notes-list">
        {notes.map((note) => (
          <li className="note-item" key={note.id}>
            <div>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>

            <div>
              <button
                className="add-note-btn"
                onClick={() => editNote(note)}
              >
                Edit
              </button>

              <button
                className="delete-note-btn"
                onClick={() => deleteNote(note.id)}
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

export default Notes;