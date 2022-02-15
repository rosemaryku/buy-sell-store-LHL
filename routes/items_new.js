const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("items_new");
  });

  router.post("/", (req, res) => {
    const queryStr = `
      INSERT INTO items (owner_id, title, quantity, price_per_item, description, picture_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`

    const values = [1, `${req.body.name}`, `${req.body.quantity}`, `${req.body.price}`, `${req.body.desc}`, `${req.body.imageUrl}`];

    db.query(queryStr, values)
      .then(data => {
        const newItemId = data.rows[0].id;
        res.redirect(`/items/${newItemId}`);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};



