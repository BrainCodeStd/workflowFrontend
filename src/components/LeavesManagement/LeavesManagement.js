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
import Dialog from './ViewReason/ViewReason';
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
        allLeaves: [],
        open: false,
        sender_email: '',
        reason: '',
        id: '',
        from: '',
        to: ''
    };
    componentDidMount() {

        this.getAllPendingLeaves(this.props.loggedinEmail);
    }
    getAllPendingLeaves = async (email) => {

        let leaves = await axios.get(`leave/principal/${email}`)
        this.setState({ allLeaves: leaves.data })
    }



    openCloseDialog = (id, status, email, reason, from, to) => {
        this.setState({ from: from, to: to, id: id, open: status, sender_email: email, reason: reason });
    }
    render() {
        const { open } = this.state;
        var dialog_on_off = '';
        if (open) {
            dialog_on_off = <Dialog from={this.state.from} to={this.state.to} loggedinEmail={this.props.loggedinEmail} getAllPendingLeaves={this.getAllPendingLeaves} id={this.state.id} reason={this.state.reason} email={this.state.sender_email} openCloseDialog={this.openCloseDialog} />
        }

        return (

            <div>
                {dialog_on_off}

                <Table style={{ marginTop: '' }} className={styles.table}>

                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center"> Send By</CustomTableCell>
                            <CustomTableCell align="center">Open</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allLeaves.map(row => (
                            <TableRow key={row._id}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.sender_email}
                                </TableCell>

                                <TableCell align="center">

                                    <Button onClick={() => this.openCloseDialog(row._id, true, row.sender_email, row.reason, row.from, row.to)} variant="contained" style={{ backgroundColor: '#F67300' }}>
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
