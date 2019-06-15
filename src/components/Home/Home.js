import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from './Login/login';


import Card from './Cardcontainer/Container';
const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 3}px`,
        marginTop: 20
    },

});

const Home = (props) => {

    return (
        <div  >
            <Grid container
                spacing={24}>

                <Grid item md={4}>

                </Grid>
                <Grid item xs={4}>
                    <Card >
                        <center>
                            <Login />
                        </center>

                    </Card>

                </Grid>

<Grid item md={4}>

                </Grid>

            </Grid>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);