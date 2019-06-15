import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} style={{ marginTop: "20px", background: "transparent", border: "1px solid #61616b" }}>

      {props.children}

    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
