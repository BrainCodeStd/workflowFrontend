import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import PrincipalTabs from '../../components/PrincipalTabs/Principal'
import { withRouter } from 'react-router-dom';
import AuthHelperMethods from '../../components/Auth/Auth'

class Admin extends Component {

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
                <PrincipalTabs designation={this.state.designation} loggedinEmail={this.state.email} />
            </Layout>
        );
    }
}

export default withRouter(Admin);