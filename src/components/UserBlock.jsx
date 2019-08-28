import React from 'react';
import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';

import { dateOptions } from '../constance';

export const UserBlock = ({ user, handleDeleteUser }) => {
    return(
        <React.Fragment>
            <Avatar size={68} icon="user" />
            <div className="user-block-info">
                <div className="user-name">
                    
                        <Link to={`/user/${user.id}`} ><span>{user.first_name + " " + user.last_name}</span></Link> 
                    
                </div>
                <div>
                    <span>Birthday: </span>
                    <span>{new Date(user.birth_date).toLocaleString("en", dateOptions)}</span>
                </div>
                <div>
                    <span>Gender: </span>
                    <span>{user.gender}</span>
                </div>
                <div className="buttons">
                    <Button>
                        <Link to={`/edit_user/${user.id}`}>
                           Edit 
                        </Link>
                    </Button>
                    <Button type="danger" onClick={handleDeleteUser}>Delete</Button>
                </div>
            </div>
        </React.Fragment>
    )
}