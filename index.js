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
  id: {
    type: Number,
    unique: true,
    require: true,
  },
  title: String,
  author: String,
});

const app = express();
app.use(bodyParser.json());

//create
app.post("/books", async (req, res) => {
  try {
    const lastBook = await Book.findOne().sort({ id: -1 });
    const Nextid = lastBook ? lastBook.id + 1 : 1;
    const book = new Book({
      id: Nextid,
      ...req.body,
    });

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
    const book = await Book.findOne({id:req.params.id});
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
      new: true,
    });
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({id:req.params.id});
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
