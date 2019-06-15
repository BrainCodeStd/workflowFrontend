import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EditForm from '../EditForm/EditBox';
import Grid from '@material-ui/core/Grid'
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.open(false);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>

                <Dialog
                    fullScreen
                    open={true}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{ backgroundColor: '#111111' }} className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {this.props.name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={24}>
                        <Grid item md={2}>
                        </Grid>
                        <Grid item md={8}>
                            <EditForm getAllRegisteredUsers={this.props.getAllRegisteredUsers} trackingId={this.props.trackingId} />
                        </Grid>
                        <Grid item md={2}>
                        </Grid>
                    </Grid>


                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
