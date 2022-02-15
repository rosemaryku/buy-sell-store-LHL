const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items JOIN users ON owner_id = users.id;`)
      .then(data => {
        const items = data.rows;
        console.log("ID:", req.params.id);
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


  // TODO: Change user_id to cookie value, currently hardcoded as 1 ie, UNCOMMENT code
  // NOTE: Added suffix to dyanmically get item ID, will need to refactor this
  router.post("/:itemId", (req, res) => {
    const queryStr = `INSERT INTO favourites (user_id, item_id)
      VALUES ($1, $2)
      RETURNING *;`
    const values = [1, `${req.params.itemId}`];
    // const values = [`${req.session.user_id}`, `${req.params.id2}`];
    return db
      .query(queryStr, values)
      .then(res => res.rows[0])
      .catch(err => console.log(err.message))
  });


  return router;
};
