const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // router.get("/:id/messages/:itemId", (req, res) => {
  //   const values = [req.params.id, req.params.itemId];
  //   db.query(
  //     `SELECT * FROM items
  //     WHERE owner_id = $1
  //     AND id = $2`,
  //     values)
  //     .then(data => {
  //       const items = data.rows;
  //       console.log("ID:", items);
  //       const templateVars = {
  //         items: items,
  //         userId: req.session.user_id,
  //         itemId: req.params.itemId
  //       };
  //       res.render("users_id_messages", templateVars);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  router.get("/:id/messages/:itemId", (req, res) => {
    const values = [req.params.id, req.params.itemId];
    db.query(
      // `(SELECT * FROM items
      // WHERE owner_id = $1
      // AND items.id = $2)`,
      `select *
      from messages
      join items on items.id = item_id
      join users on users.id = owner_id
      WHERE owner_id = $1
      AND items.id = $2`,
      values)
      .then(data => {
        const messages = data.rows;
        console.log("ID:", messages);
        const templateVars = {
          messages: messages,
          userId: req.session.user_id,
          itemId: req.params.itemId,
          userName: req.session.user_name
        };
        res.render("users_id_messages", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/messages/:itemId", (req, res) => {
    const queryStr = `
      INSERT INTO messages (user_id, item_id, user_message)
      VALUES ($1, $2, $3)
      RETURNING *;`;
    const values = [`${req.session.user_id}`, `${req.params.itemId}`, `${req.body.message}`];
    console.log(queryStr);
    db.query(queryStr, values)
      .then(data => {
        data.rows[0];
        res.redirect('back');
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};



