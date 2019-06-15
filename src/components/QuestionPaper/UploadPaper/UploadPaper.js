import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Alert from '../../../hoc/Alert/Alert'
class AddFiles extends Component {
    state = {
        file: null,
        reciever_email: '',
        name: '',
        open: false,
        message: '',
        message_type: '',

    }


    componentDidMount() {
        this.getPrincipalEmail();
    }
    getPrincipalEmail = async () => {
        try {
            let name = await axios.get('paper/email');
            this.setState({ reciever_email: name.data.email })
        } catch (error) {
            console.log(error);
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    handlechange = (e) => {
        this.setState({ file: e.target.files[0], name: e.target.files[0].name });
    };
    handlesubmit = async (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append('sender_email', this.props.loggedinEmail);
        formdata.append('reciever_email', this.state.reciever_email);
        formdata.append('paper', this.state.file);
        try {
            let response = await axios.post('paper/', formdata);
            this.setState({ open: true, message: response.data.message, message_type: 'success' });
            this.props.getAllFiles(this.props.loggedinEmail);
        } catch (err) {
            this.setState({ open: true, message: err.response.data, message_type: 'error' });
        }
    };

    render() {
        const { open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
        } else {
            alert = '';
        }
        return (
            <div>
                {alert}
                <Card>

                    <center>
                        <Typography variant="h6" color="inherit" >
                            Upload The Question Paper For Principal Approval
          </Typography>
                        <form>
                            <input accept=".docx" onChange={(e) => this.handlechange(e)} style={{ display: 'none' }} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <IconButton color="inherit" variant="outlined" size="large" style={{ borderRadius: '0px' }} varient="outline" component="span">
                                    <i style={{ fontSize: '50px' }} class="fa fa-file" aria-hidden="true"></i>
                                </IconButton>
                                {this.state.name}
                            </label>
                            <Button style={{ marginLeft: '5%', backgroundColor: '#111111', color: "#FFFFFF" }} onClick={(e) => this.handlesubmit(e)} variant="contained" color="default" >
                                Upload
        <CloudUploadIcon />
                            </Button>

                        </form>
                    </center>
                </Card>

            </div>
        );
    }
}

export default withRouter(AddFiles);