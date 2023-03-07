const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const { response } = require('express');
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

const axios = require('axios');

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get(booksUrl);
        const books = response.data;
        res.send(JSON.stringify(books, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching books');
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`${booksUrl}/${isbn}.json`);
        const book = response.data;
        res.send(JSON.stringify(book, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching book details');
    }
});


// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(booksUrl);
        const books = response.data;
        const matchingBooks = books.filter(book => book.author === author);
        res.send(JSON.stringify(matchingBooks, null, 4));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching book details');
    }
});


// Get all books based on title

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
      const response = await axios.get(booksUrl);
      const books = response.data;
      const matchingBooks = books.filter(book => book.title === title);
      res.send(JSON.stringify(matchingBooks, null, 4));
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching book details');
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
