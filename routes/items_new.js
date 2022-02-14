const express = require('express');
const { redirect } = require('express/lib/response');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("items_new");
  });


  // POST ROUTE OPTION 1
  // router.post("/", (req, res) => {
  //   // console.log("Req Body:", req.body);
  //   // TODO input dynamic values for owner_id ie, req.session.owner_id which is currently hardcoded as 1.

  //   const queryStr = `INSERT INTO items (owner_id, title, quantity, price_per_item, description, picture_url)
  //   VALUES ($1, $2, $3, $4, $5,$6 )`

  //   const values = [1, `${req.body.name}`, `${req.body.quantity}`, `${req.body.price}`, `${req.body.desc}`, `${req.body.imageUrl}`];

  //   db.query(queryStr, values)
  //   .then(data => {
  //     res.render("items_new");
  //     })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //     });
  // });


  // OPTION 2
    router.post("/", (req, res) => {

      const queryStr = `INSERT INTO items (owner_id, title, quantity, price_per_item, description, picture_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`

      const values = [1, `${req.body.name}`, `${req.body.quantity}`, `${req.body.price}`, `${req.body.desc}`, `${req.body.imageUrl}`];

      // const queryStr2 = `SELECT * FROM items ORDER BY id DESC LIMIT 1`;

      db.query(queryStr, values)
      .then(data => {
        const newItemId = data.rows[0].id;
        res.redirect(`/items/${newItemId}`);
      });
      //   // res.render("items_new");
      //   db.query(queryStr2)
      //   })
      // .then(data => {
      //   console.log(data);
      //   // res.send(data.rows);
      // })
      // .catch(err => {
      //   res
      //     .status(500)
      //     .json({ error: err.message });
      //   });


      // PROMISES ALL //
        // Promise.all([
        //   db.query(queryStr, values),
        //   db.query(queryStr2)
        // ])
        // .then(data => {
        //   console.log(data[1].rows);
        //   // res.send(data.rows);
        // })

    });






  return router;
};

