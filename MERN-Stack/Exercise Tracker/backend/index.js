const Express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = new Express();

//MiddleWare
app.use(cors());
app.use(Express.json());

mongoose.connect(process.env.MongoString, {useNewUrlParser: true, useUnifiedTopology: true});
const connect = mongoose.connection;
connect.once('open', () => {
    console.log("Hiee Chotiii");
})

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter)
app.use("/users", usersRouter)


const Port = process.env.PORT || 5000

app.listen(Port, () => {
    console.log("Server Started on Port "+Port);
})