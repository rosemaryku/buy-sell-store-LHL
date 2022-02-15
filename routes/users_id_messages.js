const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items JOIN users ON owner_id = users.id;`)
      .then(data => {
        const items = data.rows;
        console.log("ID:", items);
        const templateVars = {
          items: items
        };
        res.render("users_id_messages", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // TODO: Change user_id to cookie value, currently hardcoded as 1, UNCOMMENT code
  // NOTE: Added suffix to dynamically get item ID, will need to refactor this
  router.post("/:itemId", (req, res) => {
    // console.log("Req Body:", req.body);
    const queryStr = `
      INSERT INTO messages (user_id, item_id, user_message)
      VALUES ($1, $2, $3)
      RETURNING *;`
    const values = [1, `${req.params.itemId}`, `${req.body.message}`];
    // const values = [`${req.session.user_id}`, `${req.params.itemId}`, `${req.body.message}`];
    db.query(queryStr, values)
      .then(data => {
        data.rows[0];
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });


  return router;
};
