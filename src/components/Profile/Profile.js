import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonalInfo from './Personal_info/PersonalInfo';
import Professional from './Professional/Professional';
import Account from './Account/Account';
import EditFormDialog from './EditView/EditView';
import axios from 'axios';
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 200,
    },
});
class MediaCard extends React.Component {
    state = {
        value: 0,
        open: false,
        profile: []
        , image: '',
        image_path: '',

    };
    componentDidMount() {
        this.getRegisteredUser(this.props.loggedinEmail);

    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleOpenClose = (status) => {
        this.setState({ open: status });
    }
    getRegisteredUser = async (email) => {
        let user = await axios.get(`users/profile/${email}`)
        this.setState({ profile: user.data })
        this.changePathSlashes(this.state.profile.file_path);
    }
    changePathSlashes = (originalpath) => {
        var path = originalpath;
        var path2 = path.replace(/\\/g, "/");
        this.setState({ image_path: path2 })
    }
    getImage = () => {

        return `http://localhost:4000/${this.state.image_path}`;
    }
    render() {
        const { classes } = this.props;
        const { value, open } = this.state;
        var dialogOpenClose = ''
        if (open) {
            dialogOpenClose = <EditFormDialog loggedinEmail={this.props.loggedinEmail} getRegisteredUser={this.getRegisteredUser} getImage={this.getImage} closeDialog={this.handleOpenClose} profile={this.state.profile} />;
        } else {
            dialogOpenClose = '';
        }
        return (
            <Card style={{ width: '440px' }}>
                {dialogOpenClose}
                <CardMedia
                    className={classes.media}
                    image={this.getImage()}
                    title="Profile Image"
                    style={{ backgroundSize: '300px 200px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.state.profile.name}
                    </Typography>

                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab label="Personal Info" />
                                <Tab label="Professional" />
                                <Tab label="Account" />

                            </Tabs>
                        </AppBar>
                        {value === 0 && <TabContainer><PersonalInfo
                            name={this.state.profile.name}
                            email={this.state.profile.email}
                            gender={this.state.profile.gender}
                        /></TabContainer>}
                        {value === 1 && <TabContainer><Professional
                            designation={this.state.profile.designation}
                            experience={this.state.profile.experience}
                            salary={this.state.profile.salary}
                            timeIn={this.state.profile.timeIn}
                            timeOut={this.state.profile.timeOut}
                        /></TabContainer>}
                        {value === 2 && <TabContainer><Account
                            email={this.state.profile.email}
                            accountStatus={this.state.profile.accountStatus}
                        /></TabContainer>}

                    </div>
                </CardContent>

                <CardActions>
                    <Button size="small" variant="outlined" color="inherit" onClick={() => this.handleOpenClose(true)}>
                        Edit Profile
        </Button>

                </CardActions>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
