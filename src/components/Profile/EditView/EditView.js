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
import EditForm from '../../EditProfile/EditProfile';
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
        this.props.closeDialog(false);
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
                    <AppBar className={classes.appBar} style={{ backgroundColor: '#111111', color: '#FFFFFF' }}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Edit Profile
              </Typography>
                        </Toolbar>
                    </AppBar>

                    <EditForm loggedinEmail={this.props.loggedinEmail} getRegisteredUser={this.props.getRegisteredUser} getImage={this.props.getImage} profile={this.props.profile} />

                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
