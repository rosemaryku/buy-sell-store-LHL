// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const apiItemsRoutes = require("./routes/items_api");
const itemsNewRoutes = require("./routes/items_new");
const itemsIdRoutes = require("./routes/items_id");
const usersIdFavouritesRoutes = require("./routes/users_id_favourites");
const usersIdListingsRoutes = require("./routes/users_id_listings");
const usersIdMessagesRoutes = require("./routes/users_id_messages");
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/items", apiItemsRoutes(db));
app.use("/items/new", itemsNewRoutes(db));
app.use("/items", itemsIdRoutes(db));
app.use("/users/:id/listings", usersIdListingsRoutes(db));
app.use("/users", usersIdFavouritesRoutes(db));
app.use("/users/:id/messages", usersIdMessagesRoutes(db));
app.use("/home", homeRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/register", registerRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("example");
});

// app.get("/users/:id/favourites", (req, res) => {
//   res.render("users_favourites");
// });

// app.get("/users/:id/listings", (req, res) => {
//   res.render("users_id_listings");
// });

// app.get("/users/:id/messages", (req, res) => {
//   res.render("users_id_messages");
// });


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
