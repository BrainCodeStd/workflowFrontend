import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddMembers from '../AddMembers/AddMembers';
import ManageAll from '../PrincipalManageAllMembers/ManageAll';
import CreateMeeting from '../CreateMeeting/CreateMeeting';
import LeavesManagement from '../LeavesManagement/LeavesManagement'
import PaperApproval from '../PrincipalQuestionPaperApproval/PaperApproval'
import Forum from '../Forum/Forum';
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
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} >
        <AppBar position="static" color="default" style={{ backgroundColor: "#E0E0E0" }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="red"
            textColor="black"
          >
            <Tab label=" Add Members" icon={<i class="fas fa-user-plus"></i>} />
            <Tab label=" Manage Members" icon={<i class="fas fa-users-cog"></i>} />
            <Tab label=" Create Meeting" icon={<i class="fas fa-handshake"></i>} />
            <Tab label="Leaves" icon={<i class="fas fa-envelope-open-text"></i>} />
            <Tab label="Question Papers" icon={<i class="fas fa-paste"></i>} />
            <Tab label="Forum" icon={<i className="fas fa-restroom"></i>} />



          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>

          <Grid container
            spacing={24}>
            <Grid item md={4}>
            </Grid>
            <Grid item md={4}>
              <center>
                <AddMembers />
              </center>
            </Grid>
            <Grid item md={4}>
            </Grid>
          </Grid>

        </TabContainer>}
        {value === 1 && <TabContainer>

          <Grid container
            spacing={24}>
            <Grid item md={1}>
            </Grid>
            <Grid item md={10}>
              <center>
                <ManageAll loggedinEmail={this.props.loggedinEmail} />
              </center>
            </Grid>
            <Grid item md={1}>
            </Grid>
          </Grid>

        </TabContainer>}
        {value === 2 && <TabContainer>

          <Grid container
            spacing={24}>
            <Grid item md={4}>
            </Grid>
            <Grid item md={4}>
              <center>
                <CreateMeeting designation={this.props.designation} loggedinEmail={this.props.loggedinEmail} />
              </center>
            </Grid>
            <Grid item md={4}>
            </Grid>
          </Grid>

        </TabContainer>}
        {value === 3 && <TabContainer>

          <Grid container
            spacing={24}>
            <Grid item md={1}>
            </Grid>
            <Grid item md={10}>
              <center>
                <LeavesManagement loggedinEmail={this.props.loggedinEmail} />
              </center>
            </Grid>
            <Grid item md={1}>
            </Grid>
          </Grid>

        </TabContainer>}
        {value === 4 && <TabContainer>

          <Grid container
            spacing={24}>
            <Grid item md={1}>
            </Grid>
            <Grid item md={10}>
              <center>
                <PaperApproval loggedinEmail={this.props.loggedinEmail} />
              </center>
            </Grid>
            <Grid item md={1}>
            </Grid>
          </Grid>

        </TabContainer>}
        {value === 5 && <TabContainer>

          <Grid container
            spacing={24}>
            <Grid item md={1}>
            </Grid>
            <Grid item md={10}>
              <center>
                <Forum loggedinEmail={this.props.loggedinEmail} />
              </center>
            </Grid>
            <Grid item md={1}>
            </Grid>
          </Grid>

        </TabContainer>}

      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
