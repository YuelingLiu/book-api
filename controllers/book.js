// import the built in File System(fs) module
const fs = require('fs');
const path = require('path'); // Get the directory name of the current module

// read books
const readBooks = async () => {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, '../books.json'),
      'utf-8'
    );

    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading books');
    return [];
  }
};

const saveBooks = async (data) => {
  try {
    await fs.promises.writeFile(
      path.join(__dirname, 'books.json'),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.error('Error saving books:', err);
  }
};

// CRUD
const getAllBooks = async (req, res) => {
  try {
    const books = await readBooks(); // Using the async version
    console.log('Current books:', books); // Debug log

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load books' });
  }
};

const createBook = async (req, res) => {
  try {
    const books = await readBooks();
    const newBook = { id: Date.now(), ...req.body };
    books.push(newBook);
    await saveBooks(books);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
};

module.exports = {
  getAllBooks,
  createBook,
};
