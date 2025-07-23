const express = require('express');
const bodyParser = require('body-parser');
const booksRoute = require('./routes/book');
const app = express();

// to parse the incoming Json file or form data in request bodies
app.use(bodyParser.json());

// connect the routes
app.use('/api/books', booksRoute);
const PORT = 3000;

// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
