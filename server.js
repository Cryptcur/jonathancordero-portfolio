const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/users", (req, res, next) => {
  db.readUsers()
    .then(users => res.send(users))
    .catch(next);
});

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  })
  .catch(ex => console.log(ex));
