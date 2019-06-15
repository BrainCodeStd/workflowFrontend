import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
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
    input: {
        display: 'none',
    },

});


class SimpleFormExample extends React.Component {
    state = {
        formData: {
            user_name: '',
            password: '',
            repeatPassword: '',
            id: ''
        },

        open: false,
        message: '',
        message_type: '',
        file: null,
        imagePreviewUrl: '',
    }

    componentDidMount() {
        const { formData } = this.state;
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {

            if (value !== formData.password) {
                return false;
            }
            return true;
        });
        formData['user_name'] = this.props.profile.name;
        formData['id'] = this.props.profile._id;
        this.setState({ formData });
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
    handleSubmit = async (e) => {

        if (this.state.imagePreviewUrl.length === 0) {
            this.setState({ open: true, message: 'Please Upload Image!', message_type: 'error' })
        } else {

            try {
                const { formData } = this.state;
                e.preventDefault();
                var formdata = new FormData();
                formdata.append('name', formData.user_name);
                formdata.append('password', formData.password);
                formdata.append('profileImage', this.state.file);

                let response = await axios.put(`users/updateInfo/${formData.id}`,
                    formdata
                )

                this.setState({ open: true, message: response.data.message, message_type: 'success' })
                this.props.getImage();
                this.props.getRegisteredUser(this.props.loggedinEmail);
            } catch (error) {
                this.setState({ open: true, message: error.response.data, message_type: 'error' })

            }
        }


    }
    handlechangeFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        var file_name = e.target.files[0].name;
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                name: file_name
            });
        }
        reader.readAsDataURL(file)
    };

    render() {
        const { formData, imagePreviewUrl, open } = this.state;
        var imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl}
                style={{
                    width: '185px',
                    borderRadius: '0px',
                    height: '110px'
                }}
                alt='PreviewImage'
            />);
        } else {
            imagePreview = <i className="fa fa-user" aria-hidden="true" style={{ fontSize: '100px' }}></i>;
        }
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
        } else {
            alert = '';
        }
        return (
            <center>
                {alert}
                <Card className={styles.card} >

                    <div>
                        <input onChange={(e) => this.handlechangeFile(e)} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton component="span" style={{
                                width: '185px',
                                borderRadius: '0px',
                                height: '110px',
                                color: '#111111'
                            }}>
                                {imagePreview}
                            </IconButton>
                        </label>
                    </div>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <TextValidator
                            label="Name"
                            onChange={this.handleChange}
                            name="user_name"
                            value={formData.user_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br />
                        <TextValidator
                            label="New Password"
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