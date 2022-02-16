const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {

    const queryStr = `
    SELECT *, items.id AS items_id
    FROM items
    JOIN users ON owner_id = users.id
    WHERE items.id = $1;`;

    //  const queryStr = `(SELECT *, items.id AS items_id FROM items)
    //  UNION (SELECT * FROM users)
    //  WHERE items.id = $1;`

    const values = [req.params.id];

    db.query(queryStr, values)
      .then(data => {
        const items = data.rows;
        console.log(items);
        // console.log("specificItem", specificItem);
        // console.log("Req Params ID:", req.params.id);
        const templateVars = {
          items: items,
          userId: req.session.user_id,
          userName: req.session.user_name
        };
        console.log(templateVars);
        if (items) {
          res.render("items_id", templateVars);
        } else {
          res.send("Error: Item does not exist");
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};



