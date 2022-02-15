/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register")
  });

  router.post("/", (req, res) => {
    const queryStr = `
      INSERT INTO users (name, email, password, phone_number)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`

    const values = [`${req.body.new_name}`, `${req.body.new_email}`, `${req.body.new_password}`, `${req.body.new_phone}`];


    db.query(queryStr, values)
      .then(data => {
        console.log("DATA", data.rows)
        res.render("login");
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
