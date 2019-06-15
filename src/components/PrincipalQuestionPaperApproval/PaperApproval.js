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
        allpapers: [],
        open: false,
        message: '',
        message_type: ''
    };
    componentDidMount() {
        this.getAllPendingPapers(this.props.loggedinEmail);


    }
    getAllPendingPapers = async (email) => {
        let papers = await axios.get(`paper/principal/${email}`)
        this.setState({ allpapers: papers.data })
    }


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    changeStatus = async (id, status) => {
        try {
            let update_status = await axios.put(`paper/change_status/${id}/${status}`);
            this.setState({ open: true, message: update_status.data.message, message_type: 'success' })
            this.getAllPendingPapers(this.props.loggedinEmail);
        } catch (err) {
            this.setState({ open: true, message: err.respose.data, message_type: 'error' })
        }
    }


    render() {
        const { open } = this.state;
        if (open) {
            var alert = <Alert handleClose={this.handleClose} message={this.state.message} type={this.state.message_type} />
        } else {
            alert = '';
        }
        return (
            <div>
                {alert}
                <Table style={{ marginTop: '' }} className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center"> Title</CustomTableCell>
                            <CustomTableCell align="center"> Send By</CustomTableCell>
                            <CustomTableCell align="center">Actions</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allpapers.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" align="center" scope="row">
                                    {row.file_name}
                                </TableCell>
                                <TableCell align="center">{row.sender_email}</TableCell>
                                <TableCell align="center">


                                    <Button onClick={() => this.changeStatus(row._id, 'disapproved')} variant="contained" style={{ backgroundColor: '#144697' }}>
                                        <i class="fa fa-ban" aria-hidden="true"></i>
                                    </Button>
                                    <Button onClick={() => this.changeStatus(row._id, 'approved')} variant="contained" style={{ backgroundColor: '#46AC2F' }} >
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                    </Button>

                                    <Button href={'http://localhost:4000/' + row.file_path} variant="contained" style={{ backgroundColor: '#A66A17' }}>
                                        <i class="fa fa-download" aria-hidden="true"></i>
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
