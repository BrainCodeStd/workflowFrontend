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
                            Name
                            </TableCell>
                        <TableCell align="right">{this.props.name}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            E-mail
                            </TableCell>
                        <TableCell align="right">{this.props.email}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            Gender
                            </TableCell>
                        <TableCell align="right">{this.props.gender}</TableCell>
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
