const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/messages", (req, res) => {
    const values = [req.params.id];

    db.query(
      `SELECT * FROM items
      JOIN users ON users.id = owner_id
      WHERE owner_id = $1`,
      values)
      .then(data => {
        const items = data.rows;
        console.log("ID:", items);
        const templateVars = {
          items: items,
          userId: req.params.id
        };
        res.render("users_id_messages", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/messages/:itemId", (req, res) => {
    const queryStr = `
      INSERT INTO messages (user_id, item_id, user_message)
      VALUES ($1, $2, $3)
      RETURNING *;`
    const values = [`${req.session.user_id}`, `${req.params.itemId}`, `${req.body.message}`];
    db.query(queryStr, values)
      .then(data => {
        data.rows[0];
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });

  return router;
};



