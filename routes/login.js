/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const users = require('./users');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("login")
  });


  // Login submission
  router.post("", (req, res) => {
    const queryStr = `SELECT * FROM users WHERE email = $1;`
    const values = [`${req.body.email}`]

    db.query(queryStr, values)
      .then(data => {
        const userId = data.rows[0].id
        req.session.user_id = userId;
        res.redirect(`users/${userId}/items/new`)
      })
      .catch(err => {
        res.status(500).send("Wrong email");
      })
  });

  return router;


};
