// require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/users", (req, res, next) => {
  console.log("Here");
  db.readUsers()
    .then(users => {
      console.log("USERS: ", users);
      res.send(users);
    })
    .catch(next);
});

db.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(ex => console.log(ex));
