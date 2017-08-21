// @flow weak

"use strict";

const express = require("express");
const path = require("path");

const app = express();
const DOCS_PATH = "../../docs/";
const PORT = 3000;
const IP_ADRESS = "0.0.0.0";

app.set("port", PORT);
app.set("ipAdress", IP_ADRESS);

app.use(express.static(path.join(__dirname, DOCS_PATH)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, DOCS_PATH, "index.html"));
});

/* eslint-disable no-console */
app.listen(PORT, IP_ADRESS, () =>
  console.log(`
    ==============================================
    -> Server 🏃 (running) on ${IP_ADRESS}:${PORT}
    ==============================================
  `)
);
// app.listen(PORT);
/* eslint-enable no-console */
