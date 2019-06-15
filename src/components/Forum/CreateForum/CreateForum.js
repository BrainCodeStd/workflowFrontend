import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Alert from '../../../hoc/Alert/Alert'
import './card.css'


class SimpleFormExample extends React.Component {
    state = {
        formData: {
            topic: '',
        },
        open: false,
        message: '',
        message_type: ''
    }


    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });

    }
    handleSubmit = async () => {
        const { formData } = this.state;
        try {

            let forum = await axios.post('forum/create_forum',
                {
                    topic: formData.topic,
                    creater_email: this.props.loggedinEmail,
                });

            this.setState({ open: true, message: forum.data.message, message_type: 'success' });
            this.props.getAllForums();
        } catch (err) {
            this.setState({ open: true, message: err.response.data, message_type: 'error' });
        }
    };
    handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    render() {
        const { formData, open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
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
                            style={{ width: '400px' }}
                            label="Topic"
                            onChange={this.handleChange}
                            name="topic"
                            value={formData.topic}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />





                        <Button
                            style={{ backgroundColor: "#111111", marginLeft: '15px', color: '#FFFFFF', marginTop: '12px' }}
                            variant="contained"
                            type="submit"
                        >
                            Create Discussion
                </Button>



                        <br /><br />


                    </ValidatorForm>
                </Card>

            </center>
        );
    }
}
export default withRouter(SimpleFormExample);