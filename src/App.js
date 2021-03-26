import React, { Component } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'Silvin Pradhan',
			age: '',
			salary: '',
			hobby: 'N/A',
		};
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state);
		try {
			axios.post('https://sheet.best/api/sheets/12d5e487-9e9b-4319-9e6b-e4d3e2f04cde', this.state).then((res) => {
				console.log(res);
			});
			toast.success(`Your data has been saved to Google Sheets successfully`);
			this.setState({ name: '', age: '', salary: '', hobby: '' });
		} catch (err) {
			console.log(err);
			toast.dark(`Check your internet connection.`);
		}
	};

	render() {
		const { name, age, salary, hobby } = this.state;
		return (
			<>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover
				/>
				<Container fluid className="container">
					<Header as="h2">React Google Sheets!</Header>
					<Form className="form" onSubmit={this.submitHandler}>
						<Form.Field>
							<label>Name</label>
							<input
								placeholder="Enter your name"
								type="text"
								name="name"
								required
								value={name}
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Age</label>
							<input
								placeholder="Enter your age"
								type="number"
								name="age"
								required
								value={age}
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Salary</label>
							<input
								placeholder="Enter your salary"
								type="number"
								name="salary"
								value={salary}
								required
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Hobby</label>
							<input
								placeholder="Enter your hobby"
								type="text"
								name="hobby"
								value={hobby}
								onChange={this.changeHandler}
							/>
						</Form.Field>

						<Button color="blue" type="submit">
							Submit
						</Button>
					</Form>
				</Container>
			</>
		);
	}
}
