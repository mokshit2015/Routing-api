import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class New extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			updatedFName : "",
			updatedLName : "",
			updatedId : "",
			newFName : "",
			newLName : "",
			show : false,
			isEdit : false,
			isAdd : false
		}
	}

	dataUpdate = (event) => this.setState({ [event.target.name]: event.target.value });

	
	getData = (id) => {
		if(this.state.show == false)	
		{
			axios.get(`https://reqres.in/api/users/${id}`)
			.then(res => this.setState({
				updatedFName : res.data.data.first_name,
				updatedLName : res.data.data.last_name,
				updatedId : res.data.data.id,
				show : true
			}));
		}		
	 } 

	 updateUser = () => {
		 this.setState({
			 isEdit : true
		 })
		axios.put(`https://reqres.in/api/users/${this.state.updatedId}`,{
			name : this.state.updatedFName,
			job : this.state.updatedLName
		})
		.then(res => {if(res.status===200)
			{
				this.setState({
					updatedFName:'',
					updatedLName:'',
					updatedId:'',
					show:false
				})
				alert("Successfully Updated"); 
				this.props.history.push('/list');
			}
		  	else
		   alert("error")
		});
	 }

	 addUser = () => {
		this.setState({
			isAdd : true
		})
		axios.post(`https://reqres.in/api/users`,{
			name : this.state.newFName,
			job : this.state.newLName
		})
		.then(res => {if(res.status===201)
			{
				this.setState({
					newFName:'',
					newLName:'',
				})
				alert("Successfully Inserted"); 
				this.props.history.push('/list');		
			}
		  	else
		   alert("error")
		});
	 }

	render() {
		const { params } = this.props.match;
		const { updatedFName , updatedLName,isEdit,isAdd} = this.state;
		let element;
		if (params.id === "new") {
			element = <Form>
				<Form.Group as={Row} controlId="formPlaintextEmail">
					<Form.Label column sm="2">
						First Name :
					</Form.Label>
					<Col sm="4">
						<input type="text" name="newFName"  className="form-control" onChange={this.dataUpdate} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formPlaintextEmail">
					<Form.Label column sm="2">
						Last Name :
    			</Form.Label>
					<Col sm="4">
						<input type="text" name="newLName"  className="form-control" onChange={this.dataUpdate} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} >
				<Col sm="1">	
				<Button variant="outline-success" onClick={this.addUser}>{isAdd ? 'Adding...' : 'Submit'}</Button>
				</Col>
				<Col sm="1">
				<Link column  to={`/list`}><Button variant="outline-danger" >Cancel</Button></Link>
				</Col>
				</Form.Group>
						
			</Form>;
		}
		else {
				this.getData(params.id);
			element = this.state.show && <Form>
			<Form.Group as={Row} controlId="formPlaintextEmail">
				<Form.Label column sm="3">
					First Name :
				</Form.Label>
				<Col sm="9">
					<input type="text" name="updatedFName" value={updatedFName} className="form-control" onChange={this.dataUpdate} />
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="formPlaintextEmail">
				<Form.Label column sm="3">
					Last Name :
			</Form.Label>
				<Col sm="9">
					<input type="text" name="updatedLName" value={updatedLName} className="form-control" onChange={this.dataUpdate} />
				</Col>
			</Form.Group >
			<Form.Group as={Row} >
			<Col sm="1">
			<Button variant="outline-success" onClick={this.updateUser}>{isEdit ? 'Editing...' : 'Edit'}</Button>
			</Col>
			<Col sm="1">
			<Link to={`/list`}><Button variant="outline-danger" >Cancel</Button></Link>
			</Col>
			</Form.Group>
		</Form>;
		}
		return (
			<div>
				{element}
			</div>
		);
	}
}

export default New;