import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


const app = express()

app.use(express.json())

// Option 1
app.use(cors())
// Option 2
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get("/", (request, response) => {
  return response.status(234).send('Welcome to mern stack tut')
})

// All routes with '/book' will be directed to this route
app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(()=> {
    console.log("App connected to the database")
    // Do not start app/listen unless we have a connection to the DB
    app.listen(PORT, ()=> {
      console.log(`App is listening to port ${PORT}`)
    })
  })
  .catch((error)=> {
    console.log(error)
  })