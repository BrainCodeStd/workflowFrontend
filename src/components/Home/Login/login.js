import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AuthHelperMethods from '../../Auth/Auth';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Alert from '../../../hoc/Alert/Alert'
class SimpleFormExample extends React.Component {


    state = {
        formData: {
            email: '',
            password: '',
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
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    handleSubmit = async () => {
        try {
            const { formData } = this.state;
            let result = await axios.post('users/login', {
                email: formData.email,
                password: formData.password
            })
            const Auth = new AuthHelperMethods();
            Auth.setToken(result.data);
            const designation = Auth.getConfirm();
            this.props.history.push(`/${designation.designation}`);
            window.location.reload();
        } catch (error) {

            this.setState({ open: true, message: error.response.data, message_type: 'error' })
        }


    }

    render() {
        const { formData, open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
        } else {
            alert = '';
        }
        return (
            <div>
                {alert}
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <h2>Login Form</h2>
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <br />
                    <TextValidator
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={formData.password}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />
                    <br />
                    <Button
                        style={{ backgroundColor: "#111111", color: '#FFFFFF' }}
                        variant="contained"
                        type="submit"
                    >
                        Login
                </Button>
                    <br /> <br />
                </ValidatorForm>
            </div>
        );
    }
}
export default withRouter(SimpleFormExample);