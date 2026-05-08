const express = require("express"); // importing the express library

const connectDB = require("./config/db"); // importing db config file 

const noteRoutes = require("./routes/NoteRoutes"); 

const authRoutes = require("./routes/AuthRoutes");

require("dotenv").config(); // imoport dotenv to read the .env file variables

const app = express(); // creating the express server

app.use(express.json()); // Express cannot read JSON body sent by client. so we have to use the middlewae to convert JSON data into javascript code

connectDB();

app.use("/notes", noteRoutes);

app.use("/auth", authRoutes);

// Handling the GET / Request
app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Notes App ! WayBeyond")
});


// Starting the server on 5000 port
app.listen(5000, () => {
    console.log("Server started on port: 5000")
});