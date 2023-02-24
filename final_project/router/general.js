const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const {response} = require('express');
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});});
  

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books, null, 4))
    return res.status(300).json;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    // Check if the index is valid
    if (books[isbn]) {
        const book = books[isbn];
        // If the book is found, return its information
        return res.json(book);
    } else {
        // If the book is not found, return an error message
        return res.status(404).json({ message: "Book not found" });
    }
});


// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author;
    let matchingBooks = [];

    // Search for the books with the given author in the books list
    for (let bookId in books) {
        const book = books[bookId];
        if (book.author === author) {
            matchingBooks.push(book);
        }
    }

    // If books are found, return their information
    if (matchingBooks.length > 0) {
        return res.json(matchingBooks);
    } else {
        return res.status(300).json({ message: "Yet to be implemented" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let matchingBooks = [];

    // Search for the books with the given title in the books list
    for (let bookId in books) {
        const book = books[bookId];
        if (book.title === title) {
            matchingBooks.push(book);
        }
    }

    // If books are found, return their information
    if (matchingBooks.length > 0) {
        return res.json(matchingBooks);
    } else {
        return res.status(404).json({ message: "No books found for the given title" });
    }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    // Check if the index is valid
    if (books[isbn]) {
        const book = books[isbn];
        // If the book is found, return its reviews
        const reviews = book.reviews;
        return res.json(reviews);
    } else {
        // If the book is not found, return an error message
        return res.status(404).json({ message: "Book not found" });
    }
});



module.exports.general = public_users;
