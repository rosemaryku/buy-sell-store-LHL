const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/favourites", (req, res) => {
    const queryStr = `
      SELECT DISTINCT user_id, item_id, picture_url, title, price_per_item, quantity, posted_at
      FROM favourites
      JOIN items ON item_id = items.id
      WHERE user_id = $1;`
    const values = [`${req.session.user_id}`];
    db.query(queryStr, values)
      .then(data => {
        const items = data.rows;
        const templateVars = {
          items: items,
          itemId: req.params.id,
          userId: req.session.user_id,
          userName: req.session.user_name
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
      RETURNING *;`;
    const values = [`${req.session.user_id}`, `${req.params.itemId}`];
    db.query(queryStr, values)
      .then(data => {
        data.rows[0];
        res.redirect(`/users/${req.session.user_id}/favourites`)
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });


   router.delete("/favourites/:itemId/delete", (req, res) => {
    const queryStr = `DELETE FROM favourites WHERE user_id = $1 AND item_id = $2;`
    const values = [`${req.session.user_id}`, `${req.params.itemId}`];
    console.log("VALUES:", values);
    db.query(queryStr, values)
      .then(data => {
        res.redirect('back');
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });

  return router;
};
