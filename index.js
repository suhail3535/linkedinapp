require("dotenv").config();
const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoute");
const { Auth } = require("./middlewere/auth")
const{PostRouter}=require("./routes/post.route")
app.use(express.json());


app.use(Auth)
app.use("/posts", PostRouter)

app.use("/users", userRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log("Error connecting")
    }
    console.log(`server running on port ${process.env.port}`)
})
