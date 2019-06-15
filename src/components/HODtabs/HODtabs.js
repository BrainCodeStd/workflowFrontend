import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CreateMeeting from '../CreateMeeting/CreateMeeting';
import Forum from '../Forum/Forum';
import Profile from '../Profile/Profile';
import PostLeave from '../PostApplication/PostApplication';
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class ScrollableTabsButtonForce extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root} >
                <AppBar position="static" color="default" style={{ backgroundColor: "#E0E0E0" }}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="red"
                        textColor="black"
                    >

                        <Tab label=" Profile" icon={<i class="fas fa-user"></i>} />
                        <Tab label=" Create Meeting" icon={<i class="fas fa-handshake"></i>} />
                        <Tab label="Leaves" icon={<i class="fas fa-envelope-open-text"></i>} />
                        <Tab label="Forum" icon={<i className="fas fa-restroom"></i>} />



                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>

                    <Grid container
                        spacing={24}>
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={10}>
                            <center>
                                <Profile loggedinEmail={this.props.loggedinEmail} />
                            </center>
                        </Grid>
                        <Grid item md={1}>
                        </Grid>
                    </Grid>

                </TabContainer>}
                {value === 1 && <TabContainer>

                    <Grid container
                        spacing={24}>
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={10}>
                            <center>
                                <CreateMeeting designation={this.props.designation} loggedinEmail={this.props.loggedinEmail} />
                            </center>
                        </Grid>
                        <Grid item md={1}>
                        </Grid>
                    </Grid>

                </TabContainer>}
                {value === 2 && <TabContainer>

                    <Grid container
                        spacing={24}>
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={10}>
                            <center>
                                <PostLeave loggedinEmail={this.props.loggedinEmail} />
                            </center>
                        </Grid>
                        <Grid item md={1}>
                        </Grid>
                    </Grid>

                </TabContainer>}
                {value === 3 && <TabContainer>

                    <Grid container
                        spacing={24}>
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={10}>
                            <center>
                                <Forum loggedinEmail={this.props.loggedinEmail} />
                            </center>
                        </Grid>
                        <Grid item md={1}>
                        </Grid>
                    </Grid>

                </TabContainer>}


            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
