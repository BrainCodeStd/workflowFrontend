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
        all_papers: [],
        email: ''
    };
    componentDidMount() {
        this.setState({ all_papers: this.props.papers })

    }

    componentWillReceiveProps(newProps) {
        this.setState({ all_papers: newProps.papers })
    }

    changeDateFormat = (dateString) => {
        var today = new Date(dateString);
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1);
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();


        today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min;
        return today
    }


    render() {

        return (


            <Table style={{ marginTop: '' }} className={styles.table}>

                <TableHead>
                    <TableRow>
                        <CustomTableCell align="center">Name</CustomTableCell>
                        <CustomTableCell align="center">Date</CustomTableCell>
                        <CustomTableCell align="center">Status</CustomTableCell>
                        <CustomTableCell align="center">Download</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.papers.map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" align="center" scope="row">
                                {row.file_name}
                            </TableCell>
                            <TableCell align="center">{this.changeDateFormat(row.date)}</TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {row.status}
                            </TableCell>
                            <TableCell align="center">
                                <Button href={`http://localhost:4000/${row.file_path}`} variant="contained" style={{ backgroundColor: '#A66A17' }}>
                                    <i class="fa fa-download" aria-hidden="true"></i>
                                </Button>

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleTable));
