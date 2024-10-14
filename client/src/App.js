// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
	const [sqlQuery, setSqlQuery] = useState('');
	const [result, setResult] = useState([]);
	const [error, setError] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError(''); // Clear previous errors
		try {
			const response = await axios.post('http://localhost:3300/api/query', {
				query: sqlQuery,
			});
			setResult(response.data); // Set the result state with the response data
		} catch (error) {
			setError(error.response ? error.response.data.error : 'Unknown error');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					SQL Query:
					<input
						type="text"
						value={sqlQuery}
						onChange={(e) => setSqlQuery(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<h2>Query Result:</h2>
			<table border="1">
				<thead>
					<tr>
						{result.length > 0 && Object.keys(result[0]).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{result.map((row, index) => (
						<tr key={index}>
							{Object.values(row).map((value, i) => (
								<td key={i}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;