import React, { Component } from 'react';
import CreateForum from './CreateForum/CreateForum';
import PreviousDiscussions from './PreviousDiscussions/PreviousDiscussions';
import axios from 'axios';
class Forum extends Component {
      state = {
        forums: [],
           };

        componentDidMount() {
        
        this.getAllForums(this.props.loggedinEmail);
    }
    getAllForums = async (email) => {
        try {
            let forums = await axios.get('forum/')
            this.setState({ forums: forums.data })
          
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <CreateForum getAllForums={this.getAllForums} loggedinEmail={this.props.loggedinEmail}/>
                {this.state.forums.length>0?
                <PreviousDiscussions forums={this.state.forums} loggedinEmail={this.props.loggedinEmail}/>       
                :null}
            </div>
        );
    }
}

export default Forum;