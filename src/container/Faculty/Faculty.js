import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import FacultyTabs from '../../components/FacultyTabs/FacultyTabs'
import AuthHelperMethods from '../../components/Auth/Auth'
class User extends Component {
    state = {
        designation: '',
        email: ''
    }

    componentWillMount() {
        const Auth = new AuthHelperMethods();
        const result = Auth.getConfirm();
        this.setState({ designation: result.designation, email: result.email });
    }
    render() {
        return (
            <Layout designation={this.state.designation} loggedinEmail={this.state.email}>
                <FacultyTabs loggedinEmail={this.state.email} />
            </Layout>
        );
    }
}

export default User;