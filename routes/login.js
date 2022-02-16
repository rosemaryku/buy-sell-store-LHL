const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    const queryStr = `SELECT * FROM users WHERE email = $1;`;
    const values = [`${req.body.email}`];
    db.query(queryStr, values)
      .then(data => {
        const userId = data.rows[0].id;
        req.session.user_id = userId;
        req.session.user_name = data.rows[0].name;
        res.redirect("/home");
      })
      .catch(err => {
        res.status(500).send("Wrong usernamer or password, please try again");
      });
  });
  return router;
};
