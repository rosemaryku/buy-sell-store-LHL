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

  return router;
};
