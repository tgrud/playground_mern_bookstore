import express from 'express'
import { Book } from '../models/bookModel.js'


const router = express.Router()

// switch from "app.*" to "router.*"
// Route for saving a new book
//
// Since we moved this out of index.js we tell app to direct here after
// index.js -> app.use('/books', booksRoute) -> this file
// no need for routes to have /books
// router.post("/books", async (request, response) => {

router.post("/", async (request, response) => {
  try {
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear"
      })
    }
  const newBook = {
    title: request.body.title,
    author: request.body.author,
    publishYear: request.body.publishYear,
  }

  const book = await Book.create(newBook)

  return response.status(201).send(book)

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})

router.get("/", async (request, response) => {
  try {
    const books = await Book.find({})
    return response.status(200).send({
      count: books.length,
      data: books
    })
  } catch (error) {
    console.log(error)
    response.status(500).send({message: error.message})
  }
})


router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findById(id)
    return response.status(200).send(book)
  } catch (error) {
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

// update book
router.put("/:id", async (request, response) => {
  try {
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear"
      })
    }
    const { id } = request.params
    const results = await Book.findByIdAndUpdate(id, request.body)
    console.log("results", results);

    if(!results) {
      return response.status(404).json({message: "Book not found"})
    }

    return response.status(200).send({message: "Book updated successfully"})

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})


router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params
    const results = await Book.findByIdAndDelete(id)

    if(!results) {
      return response.status(404).json({message: "Book not found"})
    }

    return response.status(200).send({message: "Book deleted successfully"})

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message})
  }
})

// export default means that when we import this file, we can call router by another name
export default router