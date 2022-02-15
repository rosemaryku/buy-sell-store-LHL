const express = require('express');
const { redirect } = require('express/lib/response');
const router  = express.Router();

module.exports = (db) => {

 router.get("/:id", (req, res) => {
  const queryStr = `SELECT *, items.id AS items_id FROM items JOIN users ON owner_id = users.id WHERE items.id = $1;`
  const values = [req.params.id];
  db.query(queryStr, values)
  .then(data => {
    const specificItem = data.rows[0];
    console.log("specificItem", specificItem);
    // console.log("Req Params ID:", req.params.id);
    const templateVars = {
      specificItem: specificItem,
    }
    if (specificItem){
      res.render("items_id", templateVars);
    } else {
      res.send("Error: Item does not exist");
    }
    })
  .catch(err => {
    res.status(500)
      .json({ error: err.message });
    });
  });


  return router;
};



