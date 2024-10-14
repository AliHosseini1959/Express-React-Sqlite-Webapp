// server/app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
// Enable CORS to allow React (running on a different port) to access this API
const app = express();
app.use(cors());
const dbName = '../database/Henkilo.db'
const db = new sqlite3.Database(dbName);

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Route to render the EJS template
app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file
});
// Serve React app
//app.get('/react', (req, res) => {
//	res.sendFile(path.join(__dirname, 'public/react/index.html'));
//});
// Route for the main form page
//app.get('/', (req, res) => {
//		res.render('index', { title: 'SQL Query Executor', results: null });
//});

// Route to handle form submission and SQL query execution
app.post('/api/query', (req, res) => {
	const { query } = req.body;
	db.all(query, [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows); // Send query result back to frontend
	});
});

/*app.post('/query', (req, res) => {
		const sqlQuery = req.body.sql;
		db.all(sqlQuery, [], (err, rows) => {
				if (err) {
						res.render('index', {
								title: 'SQL Query Executor',
								error: err.message,
								results: null,
						});
				} else {
						res.render('index', {
								title: 'SQL Query Executor',
								error: null,
								results: rows,
						});
				}
		});
});*/
const PORT = 3300;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
