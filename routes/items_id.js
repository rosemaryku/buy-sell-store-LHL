const express = require('express');
const router  = express.Router();

module.exports = (db) => {

 router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM items JOIN users ON owner_id = users.id;`)
  .then(data => {
    const items = data.rows;
    console.log("ID:", req.params.id);
    const templateVars = {
      items: items,
      itemId: req.params.id
    }
    res.render("items_id", templateVars);
    })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};



