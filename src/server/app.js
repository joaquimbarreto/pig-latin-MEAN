const express = require("express");
const usersRouter = require("../routers/users");
const translationsRouter = require("../routers/translations");
require("../db/mongoose");

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(translationsRouter);

module.exports = app;
