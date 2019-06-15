import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import './TextArea.css'
import Alert from '../../hoc/Alert/Alert';
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


class SimpleFormExample extends React.Component {
    state = {
        formData: {
            topic: '',
            discussion_points: '',
            timming: '',
        },
        open: false,
        emails: [],
        users: [],
        message: '',
        message_type: '',


    }
    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = async () => {
        try {
            let user = await axios.get(`users/${this.props.designation}`);
            this.setState({ users: user.data });
        } catch (err) {

        }
    }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });

    }
    handleChangeMultiple = event => {
        this.setState({ emails: event.target.value });

    };
    handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    handleSubmit = async () => {
        try {
            const { formData } = this.state;
            let result = await axios.post('meeting/create_meeting/',
                {
                    topic: formData.topic,
                    discussion_points: formData.discussion_points,
                    timming: formData.timming,
                    sender_email: this.props.loggedinEmail,
                    reciever_email: this.state.emails,
                })

            this.setState({
                open: true,
                message: result.data.message,
                message_type: 'success',
                topic: '',
                discussion_points: '',
                timming: '',
                sender_email: '',
                reciever_email: '',


            })
        } catch (error) {
            this.setState({ open: true, message: error.response.data, message_type: 'error' })
        }

    }

    render() {
        const { formData, open } = this.state;
        if (open === true) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
        } else {
            alert = '';
        }
        return (
            <center>
                {alert}
                <Card className={styles.card} >

                    <messagePopUp messageTitle="You Registered Successfully!" />
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <h2>Create Meeting</h2>


                        <TextValidator
                            label="Topic"
                            onChange={this.handleChange}
                            name="topic"
                            value={formData.topic}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /><br />

                        <TextValidator
                            multiline
                            label="Discussion Points"
                            onChange={this.handleChange}
                            name="discussion_points"
                            value={formData.discussion_points}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            style={{ width: '195px' }}
                        /><br />
                        <br />
                        <TextField
                            onChange={this.handleChange}
                            id="datetime-local"
                            label="start Time "
                            name="timming"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            style={{ width: '195px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />


                        <br />
                        <FormControl style={{ maxWidth: '300px' }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Select Members</InputLabel>
                            <Select
                                style={{ width: '195px' }}
                                multiple
                                value={this.state.emails}
                                onChange={this.handleChangeMultiple}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {this.state.users.map(row => (
                                    <MenuItem key={row._id} value={row.email}>
                                        <Checkbox checked={this.state.emails.indexOf(row.email) > -1} />
                                        <ListItemText primary={row.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Button
                            style={{ backgroundColor: "#111111", color: '#FFFFFF' }}
                            variant="contained"
                            type="submit"
                        >
                            Create Meeting
                </Button>

                        <br /> <br />
                    </ValidatorForm>
                </Card>

            </center>
        );
    }
}
export default withRouter(SimpleFormExample);