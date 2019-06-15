import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ViewBox from './ViewBox/ViewBox';
import Alert from '../../hoc/Alert/Alert';
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },


});

class SimpleTable extends React.Component {
    state = {
        allusers: [],
        open: false,
        tracking_id: '',
        user_name: '',
        open_alert: false,
        message: '',
        message_type: ''
    };
    componentDidMount() {
        this.getAllRegisteredUsers();
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open_alert: false });
    };
    getAllRegisteredUsers = async () => {
        let users = await axios.get('principal/all_members')
        this.setState({ allusers: users.data })
    }
    removeAccount = async (identity) => {
        try {
            let removeAccount = await axios.delete(`principal/removeUser/${identity}`);
            this.setState({ open_alert: true, message: removeAccount.data.message, message_type: 'success' })
            this.getAllRegisteredUsers();
        } catch (error) {
            this.setState({ open_alert: true, message: error.response.data, message_type: 'error' })
        }
    }


    changeStatus = async (identity, status) => {
        try {
            let changeStatus = await axios.put(`principal/update/${identity}/${status}`);

            this.setState({ open_alert: true, message: changeStatus.data.message, message_type: 'success' })
            this.getAllRegisteredUsers();
        } catch (err) {
            this.setState({ open_alert: true, message: err.response.data, message_type: 'error' })
        }
    }

    open = (status, id, name) => {
        this.setState({ open: status, tracking_id: id, user_name: name })
    }
    render() {
        const { open, open_alert } = this.state;
        if (open) {
            var dialog = <ViewBox getAllRegisteredUsers={this.getAllRegisteredUsers} name={this.state.user_name} open={this.open} trackingId={this.state.tracking_id} />
        }
        if (open_alert) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
        }
        else {
            alert = '';
        }
        return (
            <div>
                {dialog}
                {alert}
                <Table style={{ marginTop: '' }} className={styles.table}>

                    <TableHead>
                        <TableRow>
                            <CustomTableCell> Name</CustomTableCell>
                            <CustomTableCell align="center">Email</CustomTableCell>
                            <CustomTableCell align="center">Catagory</CustomTableCell>
                            <CustomTableCell align="center">Account Status</CustomTableCell>
                            <CustomTableCell align="center">Actions</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allusers.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.designation}</TableCell>
                                <TableCell align="center">{row.accountStatus}</TableCell>
                                <TableCell align="center">


                                    <Button onClick={() => this.changeStatus(row._id, 'deactive')} variant="contained" style={{ backgroundColor: '#144697' }}>
                                        <i class="fa fa-ban" aria-hidden="true"></i>
                                    </Button>
                                    <Button onClick={() => this.changeStatus(row._id, 'active')} variant="contained" style={{ backgroundColor: '#46AC2F' }}>
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                    </Button>

                                    <Button onClick={() => this.removeAccount(row._id)} variant="contained" style={{ backgroundColor: '#E42916' }}>
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </Button>
                                    <Button onClick={() => this.open(true, row._id, row.name)} variant="contained" style={{ backgroundColor: '#F67300' }}>
                                        <i class="fa fa-folder" aria-hidden="true"></i>
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleTable));
