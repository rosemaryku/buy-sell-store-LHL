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

  return router;
};



