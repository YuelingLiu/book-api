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
      path.join(__dirname, '../books.json'),
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

// delete a book
const deleteBook = async (req, res) => {
  try {
    // 1. read all the books
    const books = await readBooks(); // Using the async version
    // 2. find the book by id
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));

    // 3. Check if book exists
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // 4 remove the book from array  Syntax: array.splice(startIndex, deleteCount) [0] means remove only that book
    const deleteBook = books.splice(bookIndex, 1)[0];
    console.log('checkign the deletebook', deleteBook);
    // 5 write back to json
    await saveBooks(books);

    const updatedBooks = await readBooks();
    console.log('Books after save:', updatedBooks); // verify
    // 6. Return success (204 No Content or the deleted book)
    res.status(200).json(deleteBook);
  } catch (err) {
    console.log('delete error', err);
    res.status(500).json({ error: 'Failed to delete a book' });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
};
