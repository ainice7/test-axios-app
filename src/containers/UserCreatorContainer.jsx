import React from 'react';
import { Form, DatePicker, Input, Button, Select, Checkbox } from 'antd';
import { connect }  from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { addUser, changeUser } from '../actions/index';
import {formatDate} from '../constance';

const { Option } = Select;
const { TextArea } = Input;

export class UserCreator extends React.Component {
    state = {
        first_name: '',
        last_name: "",
        birth_date: "",
        gender: "",
        job: "",
        biography: "",
        is_active: false,
        redirect: false
    }

    userId = 0;
    isChangingUser = false;

    componentDidMount() {
        // console.log(this.props);
        const { users, match } = this.props;
        if(match.path !== '/create_user/') {
            this.userId = +match.params.id;
            const user = users.find(el => el.id === this.userId);
            this.isChangingUser = true;
            debugger;
            this.props.form.setFieldsValue({
                first_name: user.first_name,
                last_name: user.last_name,
                job: user.job,
                biography: user.biography,
                gender: user.gender
            });
            this.setState({
                first_name: user.first_name,
                last_name: user.last_name,
                job: user.job,
                biography: user.biography,
                gender: user.gender,
                is_active: user.is_active
            });
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values = {...values, 
                    birth_date: formatDate(new Date(values.birth_date)), 
                    is_active: this.state.is_active
                };
                // console.log('Received values of form: ', values);
                if(!this.isChangingUser) {
                    this.setState({redirect: true});
                    this.props.addUser(values);
                } else {
                    // console.log('state', this.state);
                    this.setState({redirect: true});
                    this.props.changeUser(values, this.state.userId);
                }
            }
        });
    }

    onChangeFirstName = (e) => {
        const { value } = e.target;
        this.setState({ first_name: value });
    }

    onChangeLastName = (e) => {
        const { value } = e.target;
        this.setState({ last_name: value });
    }

    onChangeDatePicker = (date, dateString) => {
        this.setState( {birth_date: dateString} );
    }

    handleSelectChange = value => {
        this.setState({ gender: value });
    };

    onChangeJob = (e) => {
        const { value } = e.target;
        this.setState({ job: value });
    }

    onChangeBio = (e) => {
        const { value } = e.target;
        this.setState({ biography: value });
    }

    onChangeCheckBox = (e) => {
        this.setState({is_active: e.target.checked});
        // console.log(`checked = ${e.target.checked}`);
    }

    render() {
        const { is_active } = this.state;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        
        if(this.state.redirect) {
            return <Redirect to='/'/>;
        } 

        return(
            <React.Fragment>
                <Form {...formItemLayout} onSubmit={this.submitForm}>
                    <Form.Item label="First Name">
                        {getFieldDecorator('first_name', {
                            rules: [{ required: true, message: 'Please input your first name!' }],
                        })(
                            <Input name="firstName" onChange={this.onChangeFirstName} maxLength={256} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator('last_name', {
                            rules: [{ required: true, message: 'Please input your last name!' }],
                        })(
                            <Input name="lastName" onChange={this.onChangeLastName} maxLength={256}/>,
                        )}
                    </Form.Item>
                    <Form.Item label="DatePicker" >
                        {getFieldDecorator('birth_date', config)(
                            <DatePicker onChange={this.onChangeDatePicker} />
                        )}
                    </Form.Item>
                    <Form.Item label="Gender">
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: 'Please select your gender!' }],
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Job">
                        {getFieldDecorator('job', {
                            rules: [{ required: true, message: 'Please input your job!' }],
                        })(
                            <Input name="job" onChange={this.onChangeJob} maxLength={256} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Biography">
                        {getFieldDecorator('biography', {
                            rules: [{ required: true, message: 'Please input your biography!' }],
                        })(
                            <TextArea rows={4} onChange={this.onChangeBio} maxLength={1024} />,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Checkbox onChange={this.onChangeCheckBox} checked={is_active} >Online</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            {!this.isChangingUser ? 'Create' : 'Save'} 
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment> 
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.data.users
});

const mapDispatchToProps = {
    addUser,
    changeUser
};

const UserCreatorForm = Form.create({ name: 'register' })(UserCreator);

export const UserCreatorContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserCreatorForm));