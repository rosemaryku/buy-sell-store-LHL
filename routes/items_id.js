const express = require('express');
const router  = express.Router();

module.exports = (db) => {

 router.get("/:id", (req, res) => {
  // TODO edit to to prevent SQL injection
  const queryStr = `SELECT * FROM items JOIN users ON owner_id = users.id WHERE items.id = $1 ;`
  const values = [req.params.id];
  db.query(queryStr, values)
  .then(data => {
    const specificItem = data.rows[0];
    console.log(specificItem);
    // console.log("ID:", req.params.id);
    const templateVars = {
      specificItem: specificItem,
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



