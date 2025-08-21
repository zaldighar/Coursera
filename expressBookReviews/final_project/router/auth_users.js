const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const user = req.body.user;
      if (!user) {
          return res.status(404).json({ message: "Body Empty" });
      }
      // Generate JWT access token
      let accessToken = jwt.sign({
          data: user
      }, 'access', { expiresIn: 60 * 60 });
  
      // Store access token in session
      req.session.authorization = {
          accessToken
      }
      return res.status(200).send("User successfully logged in");
  });
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  // Get username from session (assuming it's stored after login)
  const username = req.session && req.session.authorization && req.session.authorization.user;
  const book = books[isbn];
  if (!book) {
      return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews) {
      book.reviews = [];
  }

  book.reviews.push({ username, review });
  return res.status(200).json({ message: "Review added successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
