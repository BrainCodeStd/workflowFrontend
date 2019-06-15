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
import FormControl from '@material-ui/core/FormControl';
import Alert from '../../../hoc/Alert/Alert';
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
    input: {
        display: 'none',
    },

});


class SimpleFormExample extends React.Component {
    state = {
        formData: {
            designation: '',
            salary: '',
            timeIn: '',
            timeOut: ''

        },
        anchorEl: null,
        message: '',
        open: false,
        message_type: ''
    }

    componentDidMount() {

        this.getUser(this.props.trackingId);
    }
    getUser = async (id) => {
        const { formData } = this.state;
        let user = await axios.get(`principal/member/${id}`)
        formData['designation'] = user.data.designation;
        formData['salary'] = user.data.salary;
        formData['timeIn'] = user.data.timeIn;
        formData['timeOut'] = user.data.timeOut;
        this.setState({
            formData
        });

    }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = async (e) => {


        try {
            const { formData } = this.state;
            e.preventDefault();

            let response = await axios.put(`principal/updateInfo/${this.props.trackingId}`,
                {
                    designation: formData.designation,
                    salary: formData.salary,
                    timeIn: formData.timeIn,
                    timeOut: formData.timeOut,
                }
            )
            this.setState({ open: true, message: response.data.message, message_type: 'success' })
        this.props.getAllRegisteredUsers();
        } catch (error) {
            this.setState({ open: true, message: error.response.data, message_type: 'success' })

        }



    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
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
                <Card className={styles.card} style={{ marginTop: '30px' }} >


                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    ><h3>Edit The Profile</h3>

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
                            value={formData.timeIn}
                            onChange={this.handleChange}
                            defaultValue="07:30"
                            className={styles.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />

                        <TextField
                            id="end"
                            label="End Time"
                            name="timeOut"
                            type="time"
                            value={formData.timeOut}
                            onChange={this.handleChange}
                            defaultValue="07:30"
                            className={styles.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: '#111111', color: '#FFFFFF' }}
                            variant="contained"
                            type="submit"
                        >
                            Update
                </Button>

                        <br /> <br />
                    </ValidatorForm>
                </Card>

            </center>
        );
    }
}
export default withRouter(SimpleFormExample);