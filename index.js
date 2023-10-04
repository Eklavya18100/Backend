const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234Ek@1234',
  database: 'users'
});

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL');
  }
});

// Create an Express server
const app = express(); 

app.use(cors());
app.use(express.json());


// Define an endpoint to retrieve a name based on query ID
app.get('/name', (req, res) => {
  const queryId = req.query.id;

  // Query the database for the name
  const query = `SELECT name FROM user WHERE id = ${queryId}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Name not found' });
    } else {
      const name = results[0].name;
      res.json({ name });
    }
  });
});

// Start the server
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});

// Export the Express API
module.exports = app
