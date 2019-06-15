import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ViewComments from '../ViewComments/ViewComments';
import PostComments from '../PostComments/PostComments';
import axios from 'axios';
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
        comments: [],
        open: false
    }
     componentDidMount() {
        this.getAllForums(this.props.topic_id);
    
    }
    getAllForums = async (id) => {
        try {
            let comments = await axios.get(`comment/${id}`)         
            this.setState({ comments: comments.data })
        } catch (error) {
            console.log(error)
        }
    }


    handleClose = () => {
        this.props.dialog(false);
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
                    <AppBar className={classes.appBar}style={{backgroundColor:'#111111'}}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" align="center" className={classes.flex}>
                               {this.props.topic_title}
              </Typography>
                        </Toolbar>
                    </AppBar>
                    <Paper>
                    {this.state.comments.length!==0?
                    <ViewComments comments={this.state.comments}/>
                    :null}
                     </Paper>
                    <PostComments
                    getComments={this.getAllForums}
                        creater_email={this.props.loggedinEmail}
                        topic_id={this.props.topic_id} 
                        getAllForums={this.getAllForums}
                        />
                   
                       
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
