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
    // TODO edit to to prevent SQL injection
    db.query(`SELECT * FROM items ORDER BY price_per_item DESC;`)
      .then(data => {
        const items = data.rows;
        const templateVars = {
          items: items,
          userId: req.session.user_id,
          userName: req.session.user_name
        };

        res.render("highest", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
