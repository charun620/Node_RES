const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");

Mongoose.connect(
  "mongodb://admin:AYObih54131@node52305-chern.proen.app.ruk-com.cloud:11550",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Book = Mongoose.model("Book", {
  id: Number,
  title: String,
  author: String,
});

const app = express();
app.use(bodyParser.json());

//create
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    book.id = (await Book.countDocuments()) + 1;
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

//read all
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

//read one

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
