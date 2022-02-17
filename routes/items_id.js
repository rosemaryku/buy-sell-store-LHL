const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const queryStr = `
    SELECT DISTINCT items.id AS items_id, owner_id, title, quantity, price_per_item, description, picture_url, posted_at, sold, active, name, email, phone_number, favourites.item_id AS any_user_fav_this_item, favourites.user_id AS user_who_favourited_item
    FROM items
    JOIN users ON owner_id = users.id
    LEFT JOIN favourites ON items.id = favourites.item_id
    WHERE items.id = $1;`;

    const values = [req.params.id];

    db.query(queryStr, values)
      .then((data) => {
        const items = data.rows;
        console.log("ITEMS:", items);
        const templateVars = {
          items: items,
          userId: req.session.user_id,
          userName: req.session.user_name,
        };
        if (items) {
          res.render("items_id", templateVars);
        } else {
          res.send("Error: Item does not exist");
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
