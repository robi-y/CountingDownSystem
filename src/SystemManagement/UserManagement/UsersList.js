import React, {Component} from 'react'
import {connect } from 'react-redux'
import axios from 'axios';
import { Link , BrowserRouter , useLocation  } from 'react-router-dom'; //link to different routs


class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          DB_users_info : {},
          data_length:0,
          curr_user:'', //the current user permission
        };
      }
   componentDidMount() {
    axios.get('http://localhost:5000/users/') //GET REQUEST
      .then(response => {
      if (response.data.length===0)return;
      this.setState({ DB_users_info :response.data, data_length:response.data.length })
    })

    .catch((error) => { //catch errors 
      console.log(error);
    })
    try {
      const login_info_state = localStorage.getItem("login_info"); 
      if(login_info_state !== null)
      {
        let chosen_info = JSON.parse(JSON.parse(login_info_state ))
        this.setState({ curr_user: chosen_info })
      }
    } catch (err) {
      return err;
    }
  }
  _delete_chosen_user(id){
    axios.delete('http://localhost:5000/users/'+id)
    .then(response => { console.log(response.data)});
  }
//////////////////////////
show_all_users_fromDB(){
    let temp=[]
    for (let i=0 ; i <  this.state.DB_users_info.length ; i++)
    {
      temp.push(<tr key={i}>
        <th>{this.state.DB_users_info[i].user_info.username}</th>
        <th>{this.state.DB_users_info[i].user_info.permissions}</th>
        <th>
        {this.state.curr_user.username === this.state.DB_users_info[i].user_info.username &&
        this.state.curr_user.permissions === this.state.DB_users_info[i].user_info.permissions ? 
        <div style={{color:"red"}}onClick={()=>alert("פעולה לא חוקית")}>
        your user 
        </div>
        
       : <Link to={"/usersList"}   onClick={()=>

         this._delete_chosen_user(this.state.DB_users_info[i]._id)}>delete </Link>
        }

            
        </th>
    </tr>)
    }
    return temp
  }
/////////////////////////

  render(){

    return (
        <div style={{ width : "60%" , paddingLeft:"100px"}}>
            
            <h4 >Users List</h4>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User name</th>
              <th>Permissions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
              <tr  >
                <td></td>
            </tr>
                {this.show_all_users_fromDB()} 
          </tbody>
        </table>
      
 
      </div>
    
    );
  }


}
const mapStateToProps = (state)=> ({
    state:state
})
export default connect(mapStateToProps)(UsersList) ;
