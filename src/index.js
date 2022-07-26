const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

//CONSTANTS
const server = express();

//SETTINGS
server.set("json spaces", 2);

//MIDDLEWARES
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//ROUTE BY QUERY TEXT
server.get("/iecho", async (req, res) => {
  try {
    const queryText = req.query.text; // /iecho?text=

    const reverseText = await queryText.split("").reverse().join("");

    const pali = queryText === reverseText;

    res.status(200).send({ text: `${reverseText}`, palindrome: pali });
  } catch (error) {
    res.status(400).send({ error: "no text" });
  }
});

//SERVER
server.listen(process.env.PORT || 3001, function () {
  console.log(
    `Server listening on port ${this.address().port} in ${
      server.settings.env
    } mode.`
  );
});

module.exports = server;
