const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id/items/new", (req, res) => {
    const values = [req.params.id];

    db.query(
      `SELECT * FROM items
      JOIN users ON owner_id = users.id
      WHERE owner_id = $1`,
      values
    )
      .then((data) => {
        const items = data.rows;
        const templateVars = {
          items: items,
          userId: req.session.user_id,
          userName: req.session.user_name,
        };
        res.render("items_new", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/items", (req, res) => {
    const queryStr = `
      INSERT INTO items (owner_id, title, quantity, price_per_item, description, picture_url)
      VALUES ($1, $2, $3, $4 * 100, $5, $6)
      RETURNING *`;

    const values = [
      `${req.session.user_id}`,
      `${req.body.name}`,
      `${req.body.quantity}`,
      `${req.body.price}`,
      `${req.body.desc}`,
      `${req.body.imageUrl}`,
    ];

    db.query(queryStr, values)
      .then((data) => {
        const newItemId = data.rows[0].id;
        res.redirect(`/items/${newItemId}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
