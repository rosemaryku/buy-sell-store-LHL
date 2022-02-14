/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     res.render("index_pbm")
//   });
//   return router;
// };

module.exports = (db) => {

  router.get("/", (req, res) => {
   // TODO edit to to prevent SQL injection
  db.query(`SELECT * FROM items`)
  .then(data => {
    console.log("data:", data.rows);
    const items = data.rows;
    console.log("URL:", items[2].picture_url);
    const templateVars = {
      items: items,
      itemID: 1
    }
    res.render("index_pbm", templateVars);
    })
    .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};
