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
  // router.get("/:id/home", (req, res) => {
  //   const values = [req.params.id];

  //   db.query(
  //     `SELECT * FROM items
  //     JOIN users ON owner_id = users.id
  //     WHERE owner_id = $1`,
  //     values
  //   ).then(data => {
  //     const items = data.rows;
  //     console.log("items:", items);
  //     const templateVars = {
  //       items: items,
  //       userId: req.params.id
  //     };
  //     res.render("index_pbm", templateVars);
  //   })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // })
  router.get("/", (req, res) => {
    // TODO edit to to prevent SQL injection
    db.query(`SELECT * FROM items ORDER BY posted_at DESC;`)
      .then(data => {

        const items = data.rows;

        const templateVars = {
          items: items,
          userId: req.session.user_id,

        };

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
