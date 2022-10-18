const cors = require("cors");
const mysql = require("mysql");
const express = require("express");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "13102002",
  database: "Employee",
});

app.use(express.json());
app.use(cors());

// to get all the employees
app.get("/api/employees", (req, res) => {
  const query = "SELECT * FROM Employee";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// to get a single employee
app.get("/api/employee/:id", (req, res) => {
  const empID = req.params.id;
  const query = "SELECT * FROM Employee where id = ?";
  db.query(query, [empID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// to add an employee
app.post("/api/employees", (req, res) => {
  const query =
    "insert into Employee (`id`,`f_name`,`l_name`,`email_id`) values (?)";
  const values = [
    req.body.id,
    req.body.f_name,
    req.body.l_name,
    req.body.email_id,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Employee has been added successfully");
  });
});

// to delete an employee
app.delete("/api/employee/:id", (req, res) => {
  const empId = req.params.id;
  const query = "delete from Employee where id = ?";

  db.query(query, [empId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Epmployee has been deleted successfully");
  });
});

// to update an employee
app.put("/api/employee/:id", (req, res) => {
  const empId = req.params.id;
  const query =
    "update Employee set `id` = ?,`f_name` = ?,`l_name` = ?,`email_id` = ? where id = ?";

  const values = [
    req.body.id,
    req.body.f_name,
    req.body.l_name,
    req.body.email_id,
  ];

  db.query(query, [...values, empId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Employee has been updated successfully");
  });
});

app.get("/", (req, res) => {
  res.send("hello this is backend up and running");
});

app.listen(8800, () => {
  console.log("app is running on port 8800");
});
