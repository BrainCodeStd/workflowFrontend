import React from 'react';
import {
    BrowserRouter as Router,
    Route, Switch, Redirect
} from 'react-router-dom';

import Home from '../container/Home/Home';
import Faculty from '../container/Faculty/Faculty';
import Principal from '../container/Principal/Principal';
import HOD from '../container/HOD/HOD';
import Verify from '../components/VerifyUser/VerifyUser';
import AuthHelperMethods from '../components/Auth/Auth';
const Routers = () => {
    const PrivateRoute = ({ component: Component, roles, ...rest }) => (
        <Route {...rest} render={props => {
            const Auth = new AuthHelperMethods();
            if (!Auth.loggedIn()) {
                // not logged in so redirect to login page with the return url
                return <Redirect exact to='/' />;
            }
            let role = Auth.getConfirm();
            // check if route is restricted by role
            if (roles && roles.indexOf(role.designation) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: `/${role.designation}` }} />
            }
            // authorised so return component
            return <Component {...props} />
        }} />
    )

    return (

        <Router>
            <Switch>

                <Route path='/' exact component={() => <Home page="home" />}
                />
                <PrivateRoute path='/faculty' roles="faculty" exact component={() => <Faculty faculty="faculty" />}
                />
                <PrivateRoute path='/admin' roles="admin" exact component={() => <Principal />}
                />
                <PrivateRoute path='/hod' roles="hod" exact component={() => <HOD />}
                />
                <Route path='/verify' exact component={Verify}
                />

            </Switch>
        </Router>

    );


}
export default Routers;