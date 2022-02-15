const express = require('express');
const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     res.render("items_new");
//   });
//   return router;
// };
module.exports = (db) => {
  router.get("/:id/items/new", (req, res) => {
    const values = [req.params.id];

    db.query(
      `SELECT * FROM items
      JOIN users ON owner_id = users.id
      WHERE owner_id = $1`,
      values
    ).then(data => {
      const items = data.rows;
      console.log("items:", items);
      const templateVars = {
        items: items,
        userId: req.params.id
      };
      res.render("items_new", templateVars);
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
