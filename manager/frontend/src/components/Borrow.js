import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { Grid, Typography, Button } from '@material-ui/core';
import ScanButton from './ScanButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

  heading: {
      color: "#3f51b5"
  },

  button: {
      background: "#3f51b5"
  }


}));


const Borrow = () => {
    const classes = useStyles();


    return (
        <div>
            <Grid container direction="column">
              <Grid item xs={12} alignItems="center">
                  <Typography variant="h3" className={classes.heading}>Borrow Book</Typography>
              </Grid>
              <Grid item xs={12}>
    <form className={classes.root} noValidate autoComplete="off">

    </form>
    <Grid item container direction="row" xs={12} className={classes.root}>

        <Grid item>

        <Button variant="outlined">
            Borrow
        </Button>
        </Grid>
        <Grid item>
          <ScanButton />
        </Grid>

    </Grid>
    </Grid>
            </Grid>
            
        </div>
    )
}

export default Borrow
