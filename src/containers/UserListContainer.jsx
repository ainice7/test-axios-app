import React from 'react';
import { connect }  from 'react-redux'; 
import { UserBlock } from '../components/UserBlock';
import { deleteUser } from '../actions/index';

const UserList = ({ users, deleteUser }) => {
    console.log("users", users);
    
    const handleDeleteUser = (userId, i) => {
        deleteUser(userId, i);
    }
    
    return(
        <React.Fragment>
            <div className="user-list" >
                {users.map((item, i) => (
                    <div className="user-block" key={i}>
                        <UserBlock user={item} handleDeleteUser={(e) => handleDeleteUser(item.id, i)} />
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
};

const mapStateToProps = (state) => ({
    users: state.data.users
});

const mapDispatchToProps = {
    deleteUser
}

export const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList);