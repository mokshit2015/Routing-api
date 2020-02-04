import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ListData extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    
    componentWillMount(){
        axios.get(`https://reqres.in/api/users?page=2`)
        .then(res => this.setState({
            users : res.data.data
        }));
    }

    deleteUser= (id) => {
        axios.delete(`https://reqres.in/api/users/` + id)
        .then(res => res.status===204?alert("data deleted Successfully"):alert("error"))
    }

    render(){
        return(
            <div>
                
                <table ><thead>
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
                                    <td> <img src={user.avatar}></img> </td>
                                    <td> <Link to={`list/${user.id}`}>Edit</Link> | <button onClick={() => this.deleteUser(`${user.id}`)}>Delete</button> </td>
                                </tr>
                            </tbody>
                    })
                }
                <tfoot>

                </tfoot>
                </table>
                
                
            </div>
        );
    }
}

export default ListData;