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
			firstName: 'Silvin',
			lastName: 'Pradhan',
			age: '',
			skills: 'N/A',
			classification: 'Freshman',
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
			this.setState({ firstName: '', lastName: '', age: '', skills: '', classification: '' });
		} catch (err) {
			console.log(err);
			toast.dark(`Check your internet connection.`);
		}
	};

	render() {
		const { firstName, lastName, age, skills, classification } = this.state;
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
							<label>First Name</label>
							<input
								placeholder="Enter your first name"
								type="text"
								name="firstName"
								required
								value={firstName}
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Last Name</label>
							<input
								placeholder="Enter your last name"
								type="text"
								name="lastName"
								required
								value={lastName}
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Age</label>
							<input
								placeholder="Enter your age"
								type="number"
								name="age"
								value={age}
								required
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Skills</label>
							<input
								placeholder="Enter your Skills"
								type="text"
								name="skills"
								value={skills}
								required
								onChange={this.changeHandler}
							/>
						</Form.Field>
						<Form.Field>
							<label>Classification</label>
							<input
								placeholder="Enter your classification"
								type="text"
								name="classification"
								value={classification}
								required
								onChange={this.changeHandler}
							/>
						</Form.Field>

						<Button color="green" type="submit">
							Submit
						</Button>
					</Form>
				</Container>
			</>
		);
	}
}
