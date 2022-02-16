const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/favourites", (req, res) => {

    const queryStr = `SELECT *
      FROM favourites
      JOIN items ON item_id = items.id
      WHERE user_id = $1
      ;`

    const values = [`${req.session.user_id}`];

    db.query(queryStr, values)
      .then(data => {
        const items = data.rows;
        // console.log("ID:", req.params.id);
        // console.log(items);
        const templateVars = {
          items: items,
          itemId: req.params.id,
          userId: req.session.user_id
        };
        // console.log(templateVars);
        res.render("users_favourites", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/:id/favourites/:itemId", (req, res) => {
    const queryStr = `
      INSERT INTO favourites (user_id, item_id)
      VALUES ($1, $2)
      RETURNING *;`
    const values = [`${req.session.user_id}`, `${req.params.itemId}`];
    db.query(queryStr, values)
      .then(data => {
        data.rows[0];
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });


   router.delete("/favourites/:itemId/delete", (req, res) => {
    console.log("deleting");
    const queryStr = `
      DELETE FROM favourites WHERE user_id = $1 AND item_id = $2;`
    const values = [`${req.session.user_id}`, `${req.params.itemId}`];
    console.log("Values:", values);
    db.query(queryStr, values)
      .then(data => {
        // data.rows[0];
        console.log("Deleted");
        res.redirect('back');

      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });


  return router;
};
