import React from 'react';
import Entry from './Entry';
import Return from './Return';
import Borrow from './Borrow';
import Student from './Student';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router,
    Switch,
  Route,
Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    root: {
        margin: theme.spacing(8),

    },
    header: {
        color: "#3f51b5"
    }
}));

const MainPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="column">
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.header}>Library Management</Typography>
                </Grid>
                <Router>

                <Grid item container xs={12}>
                    <Grid item>
                        <Link to="/borrow"><Button variant="outlined" color="primary">Borrow</Button></Link>
                    </Grid>
                    <Grid item>
                        <Link to="/return"><Button variant="outlined" color="primary">Return</Button></Link>
                    </Grid>
                    <Grid item>
                        <Link to="/enter-book"><Button variant="outlined" color="primary">Enter Book</Button></Link>
                    </Grid>
                    <Grid item>
                        <Link to="/enter-student"><Button variant="outlined" color="primary">Enter Student</Button></Link>
                    </Grid>
                </Grid>

                <Switch>
          <Route exact path="/borrow">
            <Borrow />
          </Route>
          <Route exact path="/return">
            <Return />
          </Route>
          <Route exact path="/enter-book">
            <Entry />
          </Route>
          <Route exact path="/enter-student">
              <Student />
          </Route>
        </Switch>

                </Router>

            </Grid>
            
        </div>
    )
}

export default MainPage
