import express from "express";  /* gave type keyword in package.json so that import express works in server.js 
No need to give type keyword if instead of import write -> const express=require('express')*/
import notesRoutes from "./routes/notesRoutes.js"
import { connectDb } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config()

const app=express();
const PORT=process.env.PORT || 5001

//middleware
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json()) // this middleware will get us accesss to req.body
app.use(rateLimiter)


//simple middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//     next()
// })

app.use("/api/notes",notesRoutes)


//IN rest API , most used are GET ( get some posts ) , POST(Create a post ) , PUT ( Update a post ) , DELETE (Delete a post )

connectDb().then(()=>{ //once mongoDb connected then start server
app.listen(PORT,()=>{ //app is the express application created. 5001 is the server port that starts and then in it prints the console.log
    console.log("Server started on PORT:",PORT);
})});



//gave dev keyword in package.json so we can run in terminal as npm run dev or else we have to give node server.js
//we do npm install nodemon -D ( -D is for dev dependancy).. nodemon automatically runs when a change is made in the code instead of running each time
//while developng we run nodemon so each time is runs automatically and after deployed we can run node server.js
//endpoint is a combination of URL+HTTP