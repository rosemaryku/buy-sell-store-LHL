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


  router.get("/", (req, res) => {
    res.render("search", templateVars);
  });

  router.post("/", (req, res) => {
    console.log("POST")


    const queryStr = `
        SELECT * FROM items
        WHERE title LIKE $1

        ;`
    let value = "";
    value += "%";
    value += req.body.search;
    value += "%";

    console.log("VALUE", value)

    db.query(queryStr, [value])

    .then(data => {
    // console.log("DATA", data.rows)
    const items = data.rows;
      const templateVars = {
      items: items
      }

    res.render("search", templateVars);
    })
    .catch(err => {
    res.status(500).json({ error: err.message });
    });

  });

  return router;
};


// ERROR: ReferenceError: app is not defined
// app.route("/")
//   .post((rec, res) => {

//   let searchQuery = "";

//   const search = req.body.search;

//   searchQuery += '%';
//   searchQuery += search;
//   searchQuery += '%';
//   console.log("AFTER", searchQuery);

//   })
//   .get((rec, res) => {
//     db.query(`SELECT * FROM items LIKE $1;`, searchQuery)
//     .then(data => {
//       const items = data.rows;
//       const templateVars = {
//         items: items
//       }

//       res.render("search", templateVars);
//     })
//     .catch(err => {
//       res
//       .status(500)
//       .json({ error: err.message });
//     });

//   })

// return router


// }
