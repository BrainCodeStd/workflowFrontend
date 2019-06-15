import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './card.css'
import PreviousLeaves from './PreviousLeaves/PreviousLeaves';
import TextField from '@material-ui/core/TextField';
import Alert from '../../hoc/Alert/Alert';
class SimpleFormExample extends React.Component {
    state = {
        formData: {
            reason: '',
            from: '',
            to: '',
        },
        leaves: [],
        admin_email: '',
        open: false,
        message: '',
        message_type: ''
    }

    componentDidMount() {
        this.reteriveLeaves(this.props.loggedinEmail);
        this.getAdmin();
    }
    getAdmin = async () => {
        try {
            let admin = await axios.get('users/find_admin');
            this.setState({ admin_email: admin.data[0].email });
        } catch (err) {

        }
    }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });

    }
    handleSubmit = async () => {
        const { formData } = this.state;
        try {
            let leave = await axios.post('leave/leave',
                {
                    reason: formData.reason,
                    sender_email: this.props.loggedinEmail,
                    reciever_email: this.state.admin_email,
                    from: formData.from,
                    to: formData.to
                });
            this.setState({
                open: true,
                message: leave.data.message,
                message_type: 'success',
                reason: ''
            })

            this.reteriveLeaves(this.props.loggedinEmail);
        } catch (err) {
            this.setState({ open: true, message: err.response.data, message_type: 'error' })

        }
    }

    handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    reteriveLeaves = async (email) => {
        let leaves = await axios.get(`leave/faculty_hod/${email}`);
        this.setState({ leaves: leaves.data });
    }

    render() {
        const { formData, open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />;
        } else {
            alert = '';
        }
        return (
            <center>
                {alert}
                <Card className="card">
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >


                        <TextValidator
                            multiline
                            style={{ width: '400px' }}
                            label="Reason"
                            onChange={this.handleChange}
                            name="reason"
                            value={formData.reason}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />


                        <br />
                        <br />
                        <TextField
                            id="start"
                            label="Start"
                            name="from"

                            onChange={this.handleChange}
                            type="date"
                            defaultValue="2017-05-24"


                        />

                        <TextField
                            id="end"
                            label="End"
                            name="to"

                            onChange={this.handleChange}
                            type="date"
                            defaultValue="2017-05-24"



                        />
                        <br />
                        <Button
                            style={{ backgroundColor: "#111111", color: '#FFFFFF', marginTop: '12px' }}
                            variant="contained"
                            type="submit"
                        >
                            Post Leave
                </Button>



                        <br /><br />


                    </ValidatorForm>
                </Card>
                {this.state.leaves.length !== 0 ? <PreviousLeaves leaves={this.state.leaves} /> : null}

            </center>
        );
    }
}
export default withRouter(SimpleFormExample);