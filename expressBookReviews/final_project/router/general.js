const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!isValid(username)) {
      return res.status(400).json({ message: "Invalid username" });
  }

  // Check if the user already exists
  if (users.some(user => user.username === username)) {
      return res.status(400).json({ message: "User already exists" });
  }

  // Register the new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json({ books }); // This line returns the list of books as JSON
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let values = Object.values(books);
  let book = values.filter(book => book.isbn === req.params.isbn);

  if (book.length > 0) {
      return res.status(200).json(book);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let values = Object.values(books);
  let authorBooks = values.filter(book => book.author === req.params.author);
  if (authorBooks.length > 0) {
      return res.status(200).json(authorBooks);
  } else {
      return res.status(404).json({message: "No books found for this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   let values = Object.values(books);
  let titleBooks = values.filter(book => book.title === req.params.title);
  if (titleBooks.length > 0) {
      return res.status(200).json(titleBooks);
  } else {
      return res.status(404).json({message: "No books found for this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let values = Object.values(books);
  let book = values.filter(book => book.isbn === req.params.isbn);

  if (book.length > 0) {
      return res.status(200).json(book[0].reviews);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
