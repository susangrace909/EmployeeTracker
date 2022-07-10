const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "Gc5yvm2mq!",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

// GET all departments
app.get("/api/departments", (req, res) => {
  const sql = `SELECT roles.*, departments.name
  AS department_name
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET a single department
app.get("/api/department/:id", (req, res) => {
  const sql = `SELECT roles.*, roles.title
  AS department_name
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id 
  WHERE roles.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Add a department
app.post("/api/deparments", ({ body }, res) => {
  const errors = inputCheck(body, "name");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO departments (name)
    VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// Update a department's roles
app.put("/api/departments/:id", (req, res) => {
  // Department is allowed to not have role affiliation
  const errors = inputCheck(req.body, "department_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE departments SET department_id = ? 
                   WHERE id = ?`;
  const params = [req.body.department_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Department not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// Delete a department
app.delete("/api/department/:id", (req, res) => {
  const sql = `DELETE FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Department not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//GET all roles
app.get("/api/roles", (req, res) => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//GET a single role
app.get("/api/roles/:id", (req, res) => {
  const sql = `SELECT * FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//DELETE a role
app.delete("/api/roles/:id", (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Role not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//UPDATE a role
//app.put("/api/roles/:id", (req, res) => {
//  const errors = inputCheck(req.body, "department_id");
//  if (errors) {
//    res.status(400).json({ error: errors });
//    return;
//  }
//  const sql = `UPDATE roles SET department_id = ?
//                 WHERE id = ?`;
//  const params = [req.body.department_id, req.params.id];
//  db.query(sql, params, (err, result) => {
//    if (err) {
//      res.status(400).json({ error: err.message });
//      // check if a record was found
//    } else if (!result.affectedRows) {
//      res.json({
//        message: "Role not found",
//      });
//    } else {
//      res.json({
//        message: "success",
//        data: req.body,
//        changes: result.affectedRows,
//      });
//    }
//  });
//});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
