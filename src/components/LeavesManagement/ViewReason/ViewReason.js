import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Alert from '../../../hoc/Alert/Alert';
const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
    state = {
        message: '',
        message_type: '',
        open: false

    }
    handleChangeStatus = async (id, status) => {
        try {
            let change_status = await axios.put(`leave/change_status/${id}/${status}`);
            this.setState({ open: true, message: change_status.data.message, message_type: 'success' })
            this.props.getAllPendingLeaves(this.props.loggedinEmail);
        } catch (error) {
            this.setState({ open: true, message: error.response.data, message_type: 'success' })
        }
    };



    handleClose = () => {
        this.props.openCloseDialog(false);
    };
    handleClosePopup = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    render() {
        const { open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClosePopup} message={this.state.message} type={this.state.message_type} />
        } else {
            alert = '';
        }
        return (
            <div>
                {alert}
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={true}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        {this.props.email}
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            Reason:{this.props.reason}
                        </Typography>
                        <Typography gutterBottom>
                            From:{this.props.from}
                        </Typography>
                        <Typography gutterBottom>
                            to:{this.props.to}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleChangeStatus(this.props.id, 'approved')} color="primary">
                            Approve Leave
            </Button>
                        <Button onClick={() => this.handleChangeStatus(this.props.id, 'disapproved')} color="primary">
                            Disapprove Leave
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomizedDialogDemo;
