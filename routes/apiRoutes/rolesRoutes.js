const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

//GET all roles
router.get("/api/roles", (req, res) => {
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
router.get("/api/roles/:id", (req, res) => {
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
router.delete("/api/roles/:id", (req, res) => {
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

module.exports = router;
