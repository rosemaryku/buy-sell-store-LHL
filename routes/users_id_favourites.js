const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/favourites", (req, res) => {
    db.query(`SELECT * FROM items JOIN users ON owner_id = users.id`)
      .then(data => {
        const items = data.rows;
        console.log("ID:", req.params.id);
        console.log(items);
        const templateVars = {
          items: items,
          itemId: req.params.id
        };
        res.render("users_favourites", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/:id/favourites/:itemId", (req, res) => {
    const queryStr = `
      INSERT INTO favourites (user_id, item_id)
      VALUES ($1, $2)
      RETURNING *;`
    const values = [`${req.session.user_id}`, `${req.params.itemId}`];
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
