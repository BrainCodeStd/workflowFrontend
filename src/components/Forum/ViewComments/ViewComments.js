import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
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
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'red',
        },
    },
});

class SimpleTable extends React.Component {
    state = {
        comments: [],
        open: false
    }
    componentDidMount() {
        this.setState({ comments: this.props.comments })
    }

    handleOpenClose = (status) => {
        this.setState({ open: status })
    }


    render() {

        return (
            <div style={{}}>
                <Grid container spacing={24}>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={8}>
                        <Table style={{marginTop:'10px'}}className={styles.table}>

                            <TableHead>
                                <TableRow>
                                    <CustomTableCell align="center">
                                        <Typography style={{color:'white'}} variant="h6" component="h6" >
                                            Comments
        </Typography>
                                    </CustomTableCell >

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.comments.map(row => (
                                    <TableRow className={styles.row} key={row._id}>
                                        <TableCell align="center" component="th" scope="row">
                                            <div style={{ width: '100%' }}>
                                                <Typography variant="p" align="left">
                                                    {row.commentBy_email}
                                                </Typography>
                                            </div>
                                            <Typography variant="h6" component="h6" >
                                                {row.comment_text}
                                            </Typography>

                                        </TableCell>




                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </Grid>
                    <Grid item md={2}>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleTable));
