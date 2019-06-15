import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import ViewLeave from '../ViewLeave/ViewLeave';
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
        all_leaves: [],
        open: false
    };
    componentDidMount() {
        this.setState({ all_leaves: this.props.leaves });
    }
    open_close = (status) => {
        this.setState({ open: status })
    }
    render() {
        var dialog = '';
        if (this.state.open) {
            dialog = <ViewLeave detail={this.state.all_leaves} open_close={this.open_close} />
        }
        return (
            <div>
                {dialog}
                <Table style={{ marginTop: '64px' }} className={styles.table}>

                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center">Status</CustomTableCell>
                            <CustomTableCell align="center">Open</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.leaves.map(row => (
                            <TableRow key={row._id}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.status}
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => this.open_close(true)} variant="contained" style={{ backgroundColor: '#F67300' }}>
                                        <i class="fas fa-folder-open"></i>
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
