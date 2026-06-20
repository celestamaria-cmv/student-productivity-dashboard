const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "35.232.80.173",
connectTimeout: 60000,
  user: "studentadm",
  password: "abindas!9111",
  database: "student_dashboard",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Cloud SQL Connected");
  }
});

module.exports = db;