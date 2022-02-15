const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/listings/", (req, res) => {
    const values = [req.params.id];

    db.query(
      `SELECT * FROM items
      WHERE owner_id = $1`,
      values
    ).then(data => {
      const items = data.rows;
      console.log("items:", items);
      const templateVars = {
        items: items,
        userId: req.session.user_id,
      };
      res.render("users_id_listings", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/:id/listings/:itemId/delete", (req, res) => {
    const queryStr = `
      DELETE FROM items
      WHERE owner_id = $1
      AND items.id = $2`;
    const values = [`${req.session.user_id}`, `${req.params.itemId}`];
    db.query(queryStr, values)
      .then(data => {
        data.rows[0];
        res.redirect(`/users/${req.session.user_id}/listings`);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
