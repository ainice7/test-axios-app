import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { Avatar } from 'antd'; 

import { dateOptions } from '../constance';

class User extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        const { users, match } = this.props;
        const userId = +match.params.id;
        const user = users.find(el => el.id === userId);
        
        this.setState({ user });
    }

    isOnline = () => {
        return this.state.user.is_active 
                ? "user-online"
                : "user-offline" 
    }

    render(){
        const { user } = this.state;

        return(
            <div className="user-page">
                <Avatar size={250} icon="user" />
                <div className="user-page-info">
                    <div>
                        <h1 className={this.isOnline()}>{user.first_name + " " + user.last_name}</h1>
                    </div>
                    <div>
                        <span>Birthday: </span>
                        <span>{new Date(user.birth_date).toLocaleString("en", dateOptions)}</span>
                    </div>
                    <div>
                        <span>Gender: </span>
                        <span>{user.gender}</span>
                    </div>
                    <div>
                        <span>Proffesion: </span>
                        <span>{user.job}</span>
                    </div>
                    <div>
                        <span>Biography: </span>
                        <span>{user.biography}</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.data.users
});

export const UserContainer = connect(mapStateToProps)(User);