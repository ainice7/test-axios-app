import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect }  from 'react-redux';

import { getUsers } from '../actions/index';
import { UserListContainer } from './UserListContainer';
import { Spin, Icon } from 'antd';
import '../assets/css/Main.css';
import { UserContainer } from './UserContainer';
import {UserCreatorContainer} from './UserCreatorContainer';

const antIcon = <Icon type="loading" style={{ fontSize: 128 }} spin />;

class Main extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { isLoading, loadingFail, error } = this.props;
        if(isLoading) {
            return <Spin indicator={antIcon} />
        } else if(loadingFail) {
            return <h1 className="error-message" >Error: {error}</h1>
        }

        return(
            <div className="content">
                <Switch>
                    <Route path='/' exact component={UserListContainer} />
                    <Route path='/user/:id' component={UserContainer} />
                    <Route path='/create_user/' component={UserCreatorContainer} />
                    <Route path='/edit_user/:id' component={UserCreatorContainer} />
                </Switch>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    isLoading: state.loading.isLoading,
    loadingFail: state.loading.loadingFail,
    error: state.loading.error
});

const mapDispatchToProps = {
    getUsers
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;