function Navbar({ darkMode, setDarkMode }) {

  return (
    <div className="navbar">

      <h2>Student Dashboard</h2>

      {/* Dark Mode Button */}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>

    </div>
  );
}

export default Navbar;