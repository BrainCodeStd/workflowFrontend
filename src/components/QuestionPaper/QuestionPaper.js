import React, { Component } from 'react';
import UploadPaper from './UploadPaper/UploadPaper';
import ViewStatus from './ViewStatus/ViewStatus';
import axios from 'axios';
class abc extends Component {

    state = {
        all_papers: [],
        email: ''
    };
    componentDidMount() {

        this.getAllFiles(this.props.loggedinEmail);
    }

    getAllFiles = async (email) => {
        try {
            let result = await axios.get(`paper/faculty/${email}`)
            this.setState({ all_papers: result.data })
        } catch (error) {
        }
    }
    render() {
        var files = '';
        if (this.state.all_papers.length > 0) {
            files = <ViewStatus papers={this.state.all_papers} />;
        } else {
            files = '';
        }
        return (
            <div>
                <UploadPaper getAllFiles={this.getAllFiles} loggedinEmail={this.props.loggedinEmail} />
                {files}
            </div>
        );
    }
}

export default abc;