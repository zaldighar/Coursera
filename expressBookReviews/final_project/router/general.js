const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username === undefined || password === undefined) {
      return res.status(400).json({ message: "Username and password are required" });
  }

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
public_users.get('/', async function (_, res) {
  try {
    // Example: Fetch books from an external API (replace URL as needed)
    const response = await axios.get("./booksdb.js");
    res.json({ books: response.data });

    // If you want to keep local books:
    // res.json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    // Example: Fetch book details from an external API (replace URL as needed)
    const response = await axios.get(`booksdb.js ${req.params.isbn}`);
    return res.status(200).json(response.data);

    // If you want to keep local books:
    let values = Object.values(books);
    let book = values.filter(book => book.isbn === req.params.isbn);

    if (book.length > 0) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
    const response = await axios.get(`booksdb.js?author=${req.params.author}`);
    return res.status(200).json(response.data);

    let values = Object.values(books);
    let authorBooks = values.filter(book => book.author === req.params.author);
    if (authorBooks.length > 0) {
      return res.status(200).json(authorBooks);
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  try {
    const response = await axios.get(`booksdb.js?title=${req.params.title}`);
    return res.status(200).json(response.data);

    let values = Object.values(books);
    let titleBooks = values.filter(book => book.title === req.params.title);
    if (titleBooks.length > 0) {
        return res.status(200).json(titleBooks);
    } else {
        return res.status(404).json({message: "No books found for this title"});
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
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
