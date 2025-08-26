const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
const port = process.env.PORT;

require("./database.js");

app.listen(port, () => {
    console.log(`Server started at the port ${port}.`)
});
