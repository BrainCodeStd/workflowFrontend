import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
class VerifyUser extends Component {


    state = {
        formData: {
            token: '',

        }
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = async () => {
        try {
            const { formData } = this.state;
            let result = await axios.post('users/verify', {
                secretToken: formData.token,
            })
            alert(result.data.message)
            this.props.history.push('/');
        } catch (error) {
            //alert(error.response.data)
            console.log(error.response.statusText)

        }
    }


    render() {
        return (
            <Layout>

                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <center>
                        <h2>Enter The Token To Verify</h2>
                        <TextValidator
                            label="Token"
                            onChange={this.handleChange}
                            name="token"
                            value={this.state.formData.token}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: "#E0E0E0" }}
                            variant="contained"
                            type="submit"
                        >
                            verify
                </Button>
                    </center>
                    <br /> <br />
                </ValidatorForm>
            </Layout>
        );
    }
}

export default withRouter(VerifyUser);