import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Notifications from './ViewNotifications/ViewNotifications';
import AuthHelperMethods from '../Auth/Auth';
import { withRouter } from 'react-router';
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },


  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    designation: '',
    count: 0,
    notifications: [],
    open: false,
    tracking_id: '',
    viewed_id: '',


  };
  componentDidMount() {

    this.setState({ designation: 'admin' })


    this.getNotifications(this.props.loggedinEmail);


  }
  getNotifications = async (email) => {
    try {

      if (this.props.designation !== 'admin') {
        let notifications = await axios.get(`notifications/notifications/${email}`);
        this.setState({ notifications: notifications.data.notifications, count: notifications.data.count })
        setInterval(async () => {
          let notifications = await axios.get(`notifications/notifications/${email}`);
          this.setState({ notifications: notifications.data.notifications, count: notifications.data.count })

        }, 5000);
      }
    } catch (error) {
      console.log(error.response)
    }
  };
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  open = (status, topic_id, viewed_id) => {

    this.setState({ open: status, tracking_id: topic_id, viewed_id: viewed_id })
  }
  logout = () => {

    const Auth = new AuthHelperMethods();
    Auth.logout();
    if (!Auth.loggedIn()) {
      this.props.history.push('/');
    }
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderNotification = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {this.state.notifications.map((row) => (
          <div>
 
            <MenuItem id={row._id.toString()}  onClick={() => this.open(true, row.topic_id, row._id)} key={row._id}>{row.description}</MenuItem>
</div>
         
        ))}

      </Menu>
    );


    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >

        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={this.state.count} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    if (this.state.open) {
      var dialog = <Notifications open={this.open} topic_id={this.state.tracking_id} viewed_id={this.state.viewed_id} />
    }
    return (

      <div className={classes.root}>
        {dialog}
        <AppBar position="static" style={{ backgroundColor: '#111111' }}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Workflow Management
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit"
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}


              >
                {
                  this.props.page === 'home' ? null :

                    this.props.designation !== 'admin' ?

                      <Badge badgeContent={this.state.count} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                      : null}

              </IconButton>
              <Button color="inherit" variant="outlined" onClick={this.logout}>Logout</Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderNotification}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PrimarySearchAppBar));