import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
	const [students, setStudents] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const API_BASE =
		process.env.NODE_ENV === "development"
			? `http://localhost:8000/api/v1`
			: `https://crudapidemo-becc90297b0f.herokuapp.com/api/v1`;
	// : process.env.REACT_APP_BASE_URL;

	let ignore = false;

	useEffect(() => {
		if (!ignore) {
			getStudents();
		}

		return () => {
			ignore = true;
		};
	}, []);

	const getStudents = async () => {
		setLoading(true);
		try {
			await fetch(`${API_BASE}/students`)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setStudents(data);
				});
		} catch (error) {
			setError(error.message || "Unexpected error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Students:</h1>
				<ul>
					<li>Students</li>
				</ul>
				{/* {loading && <p>Loading...</p>}
				{error && <p style={{ color: "red" }}>Error: {error}</p>}
				{students && (
					<ul>
						{students.map((student) => (
							<li key={student._id}>
								{student.name} - {student.class}
							</li>
						))}
					</ul>
				)} */}
			</header>
		</div>
	);
}

export default App;
