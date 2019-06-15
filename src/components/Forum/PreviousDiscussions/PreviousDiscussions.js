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
import Dialog from '../Comments/Comments';
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
        
        open: false,topic_id:'',topic_title:''
    };

    handleOpenClose = (status,id,title) => {
        this.setState({ open: status,topic_id:id,topic_title:title })
    }


    render() {
        const { open } = this.state;

        if (open) {
            var dialog = 
            <Dialog
            topic_title={this.state.topic_title}
             dialog={this.handleOpenClose} 
            topic_id={this.state.topic_id} 
            loggedinEmail={this.props.loggedinEmail} 
            />;
        }
        return (
            <div>
                {dialog}
                <Table style={{ marginTop: '' }} className={styles.table}>

                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="center"> Created By</CustomTableCell>
                            <CustomTableCell align="center"> Topic</CustomTableCell>
                            <CustomTableCell align="center">Open</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.forums.map(row => (
                            <TableRow key={row._id}>
                                <TableCell align="center" component="th" scope="row">
                                    {row.creater_email}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.topic}
                                </TableCell>

                                <TableCell align="center">
                                    <Button onClick={() => this.handleOpenClose(true,row._id,row.topic)} variant="contained" style={{backgroundColor:'#F67300'}}>
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
