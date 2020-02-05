import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import LoadingButton from './loadingbutton.gif';
class ListData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: true,
			active: 2
		}
	}

	componentDidMount() {
		axios.get(`https://reqres.in/api/users?page=2`)
			.then(res => this.setState({
				users: res.data.data,
				loading: false
			}));
	}


	getUsers = (id) => {
		axios.get(`https://reqres.in/api/users?page=${id}`)
			.then(res => this.setState({
				users: res.data.data,
				loading: false,
				active: id
			}));
	}

	deleteUser = (id) => axios.delete(`https://reqres.in/api/users/` + id)
		.then(res => res.status === 204 ? alert("data deleted Successfully") : alert("error"));



	render() {
		var ele;
		if (this.state.loading) {
			ele = <img src={LoadingButton} alt={'Loading...'} style={{ height: "60px", width: "70px" }} />
		}
		return (
			<div>
				{ele}
				<Table striped bordered hover size="sm"><thead>
					<tr>
						<th> First Name </th>
						<th> Last Name </th>
						<th> Avatar </th>
						<th> Edit/Delete </th>
					</tr>
				</thead>
					{
						this.state.users.map((user) => {
							return <tbody>
								<tr key={user.id}>
									<td> {user.first_name} </td>
									<td> {user.last_name} </td>
									<td> <img src={user.avatar} width="60px" height="60px" alt="image"></img> </td>
									<td>
										<Link to={`list/${user.id}`}><Button variant="outline-warning" >Edit</Button></Link> |&nbsp;
							
                    <Button variant="outline-danger" onClick={() => this.deleteUser(`${user.id}`)}>Delete</Button>
									</td>
								</tr>
							</tbody>
						})
					}
					<tfoot>
					</tfoot>
				</Table>
				<div className="pagination">
					{/* <a href="#">&laquo;</a> */}
					<button onClick={() => this.getUsers(1)} className={this.state.active === 1 ? 'active' : ''}> 1 </button>
					<button onClick={() => this.getUsers(2)} className={this.state.active === 2 ? 'active' : ''}> 2 </button>
					<button onClick={() => this.getUsers(3)} className={this.state.active === 3 ? 'active' : ''}> 3 </button>
					{/* <a href="#">&raquo;</a> */}
				</div>

			</div>
		);
	}
}

export default ListData;