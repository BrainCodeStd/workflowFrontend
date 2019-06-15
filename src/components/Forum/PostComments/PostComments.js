import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './card.css'


class SimpleFormExample extends React.Component {
    state = {
        formData: {
            comment: '',
            creater_email: '',
            topic_id: ''
        },
    }
componentDidMount()
{
    console.log(this.props.creater_email);
}

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });

    }
    handleSubmit = async () => {
        const { formData } = this.state;
        try {
             await axios.post('comment/comments',
                {
                    topic_id: this.props.topic_id,
                    comment_text: formData.comment,
                    commentBy_email: this.props.creater_email,
                });
           
           this.props.getAllForums(this.props.topic_id);
        } catch (err) { console.log(err.response) }
    };

    render() {
        const { formData } = this.state;

        return (
            <center>
                <div className="cardcomment">
                    <Card >
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                        >


                            <TextValidator
                                style={{ width: '400px' }}
                                label="Comment"
                                onChange={this.handleChange}
                                name="comment"
                                value={formData.comment}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />





                            <Button
                                style={{ backgroundColor: "#111111",marginLeft:'15px', color: '#FFFFFF', marginTop: '12px' }}
                                variant="contained"
                                type="submit"
                            >
                                comment
                </Button>



                            <br /><br />


                        </ValidatorForm>
                    </Card>
                </div>
            </center>
        );
    }
}
export default withRouter(SimpleFormExample);