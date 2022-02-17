const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session["user_id"] = null;
    req.session["user_name"] = null;
    res.redirect("/login");
  });

  return router;
};
