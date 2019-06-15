import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Alert from '../../hoc/Alert/Alert';
const styles = theme => ({

    formControl: {
        margin: theme.spacing.unit,

    },
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },

});


class SimpleFormExample extends React.Component {
    state = {
        formData: {
            user_name: '',
            email: '',
            password: '',
            repeatPassword: '',
            designation: '',
            salary: '',
            experience: '',
            timeIn: '',
            timeOut: '',
            gender: 'female'
        },
        open: false,
        message: '',
        message_type: ''


    }

    componentDidMount() {

        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { formData } = this.state;
            if (value !== formData.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = async () => {
        try {
            const { formData } = this.state;
            let registration = await axios.post('users/reg',
                {
                    name: formData.user_name,
                    email: formData.email,
                    password: formData.password,
                    isAdmin: false,
                    designation: formData.designation,
                    gender: formData.gender,
                    experience: formData.experience,
                    salary: formData.salary,
                    timeIn: formData.timeIn,
                    timeOut: formData.timeOut
                })

            this.setState({
                open: true,
                message: registration.data.message,
                message_type: 'success',
                name: '',
                email: '',
                password: '',
                designation: '',
                gender: '',
                experience: '',
                salary: '',
                timeIn: '',
                timeOut: '',

            })
        } catch (error) {
            this.setState({ open: true, message: error.response.data, message_type: 'error' })
        }
    }

    handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    render() {
        const { formData, open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />;

        } else {
            alert = ''
        }
        return (
            <center>
                {alert}
                <Card className={styles.card} >
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <h2>Registration Form</h2>
                        <TextValidator
                            label="Name"
                            onChange={this.handleChange}
                            name="user_name"
                            value={formData.user_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />
                        <TextValidator
                            label="Email"
                            onChange={this.handleChange}
                            name="email"
                            value={formData.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <br />
                        <FormControl component="fieldset" >

                            <RadioGroup
                                aria-label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={this.handleChange}
                            >

                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <FormControl className={styles.formControl}>
                            <InputLabel htmlFor="age-simple">Designation</InputLabel>
                            <Select
                                style={{ width: '100px' }}
                                value={formData.designation}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'designation',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'hod'}>
                                    HOD</MenuItem>
                                <MenuItem value={'faculty'}>Faculty</MenuItem>

                            </Select>
                        </FormControl>
                        <br />
                        <TextValidator
                            label="Experience(yrs)"
                            onChange={this.handleChange}
                            name="experience"
                            value={formData.experience}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />
                        <TextValidator
                            label="Salary"
                            onChange={this.handleChange}
                            name="salary"
                            value={formData.salary}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />
                        <br />

                        <TextField
                            id="start"
                            label="Start Time"
                            name="timeIn"
                            type="time"
                            onChange={this.handleChange}
                            defaultValue="07:30"
                            className={styles.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }}
                        />
                        <TextField
                            id="end"
                            label="End Time"
                            name="timeOut"
                            type="time"
                            onChange={this.handleChange}
                            defaultValue="07:30"
                            className={styles.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }}
                        />
                        <br />
                        <TextValidator
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            value={formData.password}
                            type="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br />

                        <TextValidator
                            label="Repeat password"
                            onChange={this.handleChange}
                            name="repeatPassword"
                            type="password"
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['password mismatch', 'this field is required']}
                            value={formData.repeatPassword}
                        />
                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: "#111111", color: '#FFFFFF' }}
                            variant="contained"
                            type="submit"
                        >
                            Register
                </Button>

                        <br /> <br />
                    </ValidatorForm>
                </Card>

            </center>
        );
    }
}
export default withRouter(SimpleFormExample);