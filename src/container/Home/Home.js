import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import HomebackGround from '../../components/Home/Home'
class Home extends Component {
    render() {
        return (
         <Layout page={this.props.page}>
<HomebackGround/>
             </Layout>
        );
    }
}

export default Home;