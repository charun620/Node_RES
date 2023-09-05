const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const sqlite3 = require("sqlite3");
const app = express();

const DB = new sqlite3.Database("./Database/Book.sqlite");

app.use(express.json());

DB.run(`CREATE ABLE IF NOT EXISTS books ( 
    id INTEGER PRIMARYKEY,
    Title TEXT
    author TEXT
)`);

app.get("/books", (req, res) => {
  DB.all("SELECT * From books", (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(row);
    }
  });
});

app.get("/books/:id", (req, res) => {
  DB.get("SELECT * From books WHERE id = ?", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!row) {
        res.status(404).send("Book not found");
      } else {
        res.json(row);
      }
    }
  });
});

app.post("/books", (req, res) => {
  const book = req.body;
  DB.run(
    "INSERT INTO Books (title,author VALUES(?,?)",
    book.title,
    books.author,
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        book.id = this.lastID;
        res.send(book);
      }
    }
  );
});

app.put("/books/:id", (req, res) => {
  DB.run(
    "UPDATE books SET title =?,author=? WHERE id = ?",
    book.title,
    books.author,
    req.params.id,
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(book);
      }
    }
  );
});

app.delete("/books/:id", (req, res) => {
  DB.run("DELETE From WHERE id = ?", req.params.id, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({});
    }
  });
});

const port =process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`))