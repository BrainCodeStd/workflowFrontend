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
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
        topic: []
    };
    componentDidMount() {
        console.log(this.props);
        this.getDetail(this.props.topic_id, this.props.viewed_id);
    }
    getDetail = async (topic_id, viewed_id) => {

        try {
            let topic = await axios.get(`notifications/topic/${topic_id}`);
            this.setState({ topic: topic.data })
            await axios.put(`notifications/viewed/${viewed_id}`);
        } catch (error) {
            console.log(error)
        }
    }
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
                                View notification
              </Typography>
                        </Toolbar>
                    </AppBar>


                    <Grid container spacing={24}>
                        <Grid item md={2}>
                        </Grid>
                        <Grid item md={8}>
                            <Card style={{ marginTop: '30px' }}>
                                <Table className={styles.table}>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Topic</TableCell>
                                            <TableCell align="center">Discussion Points</TableCell>
                                            <TableCell align="center">Timming</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow >
                                            <TableCell align="center" component="th" scope="row">
                                                {this.state.topic.topic}
                                            </TableCell>

                                            <TableCell align="center">

                                                {this.state.topic.discussion_points}
                                            </TableCell>
                                            <TableCell align="center">

                                                {this.state.topic.timming}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>



                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Ok
            </Button>

                                </DialogActions>
                            </Card>
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
