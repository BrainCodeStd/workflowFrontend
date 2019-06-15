import React from 'react';
import Navbar from '../NavBar/NavBar';

const Layout = (props) => {
    return (
        <div>
            <Navbar page={props.page} designation={props.designation} loggedinEmail={props.loggedinEmail} />
            <main >{props.children}</main>
        </div>
    );
};

export default Layout;