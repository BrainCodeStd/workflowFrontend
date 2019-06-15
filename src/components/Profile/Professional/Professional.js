import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


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
        render() {

        return (

  <Table style={{ marginTop: '' }} className={styles.table}>

                <TableBody>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            Designation
                            </TableCell>
                        <TableCell align="right">{this.props.designation}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" scope="row">
                           Experience
                            </TableCell>
                        <TableCell align="right">{this.props.experience}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            Salary
                            </TableCell>
                        <TableCell align="right">{this.props.salary}</TableCell>
                    </TableRow>
                       <TableRow >
                        <TableCell component="th" scope="row">
                            Time-In
                            </TableCell>
                        <TableCell align="right">{this.props.timeIn}</TableCell>
                    </TableRow>
                       <TableRow >
                        <TableCell component="th" scope="row">
                            Time-Out
                            </TableCell>
                        <TableCell align="right">{this.props.timeOut}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
