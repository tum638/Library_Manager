import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { Grid, Typography, Button } from '@material-ui/core';

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

const Student = () => {
    const classes = useStyles();
    return (
        <div>
            <Grid container direction="column">
            <Grid item xs={12} alignItems="center">
                  <Typography variant="h3" className={classes.heading}> Student </Typography>
              </Grid>
              <Grid item  container xs={12}>
              <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Name" />
      <TextField id="outlined-basic" label="Surname" />
      <TextField id="outlined-basic" label="Ref Code" />
      <TextField id="outlined-basic" label="House" />
      </form>
              </Grid>
              <Grid item container direction="row" xs={12} className={classes.root}>

<Grid item>

<Button variant="outlined">
    Save
</Button>
</Grid>
<Grid item>
</Grid>

</Grid>
            </Grid>
            
        </div>
    )
}

export default Student
