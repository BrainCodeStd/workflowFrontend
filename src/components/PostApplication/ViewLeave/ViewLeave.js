import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});
class AlertDialogSlide extends React.Component {



  handleClose = () => {
    this.props.open_close(false);
  };

  render() {

    return (
      <div>
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Detail of Leave You Posted Previously"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Paper className={styles.root} elevation={1}>
                {this.props.detail[0].reason}
              </Paper>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
