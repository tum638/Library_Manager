import React from 'react';

import { Grid } from '@material-ui/core';
import  Nav  from './components/Nav';

import MainPage from './components/MainPage';
const App = () => {
  return (
    <div>

      <Grid container direction="column">
        <Grid item>
          <Nav />
        </Grid>
        <Grid item container>
          <Grid item  sm={2} />
          <Grid item container direction="column" xs={8}>

            <MainPage />
            
          </Grid>
          
          <Grid item  sm={2} />
        </Grid>
      </Grid>
      
    </div>
  )
}

export default App

