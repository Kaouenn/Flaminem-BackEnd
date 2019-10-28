//page d'acceuil du back
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGOURL =
  process.env.MONGODB_URI || "mongodb://localhost/flaminemBackEnd";
mongoose.connect(MONGOURL, { useNewUrlParser: true, useCreateIndex: true });

// Initialiser les collections
require("./models/user");
require("./models/client");

const userRoutes = require("./routes/user");
const clientRoutes = require("./routes/client");

// Activer les routes
app.use(userRoutes);
app.use(clientRoutes);

app.get("/", (req, res) => {
  res.send(
    [
      `<pre style="line-height: 1.5;margin:auto; text-align:center;font-size: 15;padding-top: 5%" >`,
      `<h2 style="margin: 0" >FlaminemBackEnd - LAVAL François</h2>`,
      `<h3 style="margin-bottom:-10px">Home API</h3>`,
      `<b>GET <a href="/">/</a></b>`,
      `return: this help`,
      "",

      `<h3 style="margin-bottom:-10px">User Routes</h3>`,
      `<b>GET <a href="/user">/user</a></b>`,
      `return: an array of all users [{ _id: String, username: String }] `,
      "",
      `<b>POST <a href="/user/signup">/user/signup</a></b>`,
      `body:  { username: String, password: String }`,
      ``,
      `<b>POST <a href="/user/login">/user/login</a></b>`,
      `body:  { username: String, password: String }`,
      ``,
      `<h3 style="margin-bottom:-10px">Client Routes</h3>`,
      `<b>GET <a href="/client">/client</a></b>`,
      `return: an array of all clients [{ _id: String, name: String, lastName: String, address: String }] `,
      "",
      `<b>POST <a href="/client/create">/client/create</a></b>`,
      `body: { name: String, lastName: String, address: String }`,
      ``,
      `</pre>`
    ].join("\n")
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Flaminem API running on port ${PORT}`);
});
