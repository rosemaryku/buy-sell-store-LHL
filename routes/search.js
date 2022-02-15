/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// function handle(e){
//   searchq=document.getElementById("search").value;
//     if(e.keyCode === 13){
//       return searchq;
//     };
//   }
module.exports = (db) => {


  router.post("/", (req, res) => {
  const search = req.body.search;
  console.log(search)
  })
return router
}
  // db.query(`SELECT * FROM items LIKE '% ??? %';`)
  // .then(data => {
  //   const items = data.rows;
  //   const templateVars = {
  //     items: items
  //   }

  //   res.render("items/", templateVars);
  //   })
  //   .catch(err => {
  //   res
  //     .status(500)
  //     .json({ error: err.message });
  //   });
  // });

  // return router;
