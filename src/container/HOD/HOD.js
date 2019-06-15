import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import HODTabs from '../../components/HODtabs/HODtabs'
import AuthHelperMethods from '../../components/Auth/Auth'
class Home extends Component {
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
                <HODTabs designation={this.state.designation} loggedinEmail={this.state.email} />
            </Layout>
        );
    }
}

export default Home;