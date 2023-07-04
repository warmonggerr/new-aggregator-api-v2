const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const userApis = require("./routes/users");
const newsApis = require("./routes/news")

const express = require("express");
const app = express();

app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.use("/", userApis)
app.use("/", newsApis)
app.listen(PORT, (error) =>{
        if(!error)
            console.log("Server is Successfully Running and App is listening on port " + PORT);
        else
            console.log("Error occurred, server can't start", error);
    }
);