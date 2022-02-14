const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/favourites", (req, res) => {
    db.query(`SELECT * FROM items JOIN users ON users.id = owner_id;`)
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

  return router;
};
