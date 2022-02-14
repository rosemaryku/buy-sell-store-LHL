const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/listings", (req, res) => {
    const values = [req.params.id];

    db.query(
      `SELECT * FROM items WHERE owner_id = $1`,
      values
    ).then(data => {
      const items = data.rows;
      console.log("items:", items);
      const templateVars = {
        items: items,
        userId: req.params.id
      };
      res.render("users_id_listings", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
