import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from './Autocomplete';
import { Grid, Typography, Button } from '@material-ui/core';


class Student extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fullname: '',
            refcode: '',
            house: '',
            houses: ['CHA', 'CHI', 'MIC', 'PAT'],
         };
    }

    enterStudent = () =>{

        fetch('/api/scandb')
        .then((response) => {
          if (response.status >= 200 && response.status <= 299){
            return response.json();

          } else{
            throw Error(response.statusText);
          }
         })
        .then(selectedbook => {
            this.setState({selectedBook: selectedbook});
        }).catch((error) => {

          this.setState({error: 'Book not Found'});

        })
    }
    render() {
        return (

            <div>
            <Grid container direction="column" alignItems="center">
            <Grid item xs={12} >
                  <Typography variant="h3" className='heading'> Student </Typography>
              </Grid>
              <Grid item  container xs={12}>
              <form className='root' noValidate autoComplete="off">
              <TextField id="standard-basic" label="Fullname" onChange={(e) => this.setState({fullname: e.target.value})}/>
      <TextField id="outlined-basic" label="Ref Code" onChange={(e) => this.setState({refcode: e.target.value})}/>
      <Autocomplete suggestions={this.state.houses} onChange={(e) => this.setState({house: e.target.value})} label="House" selected={this.state.house}/>
      </form>
              </Grid>
              <Grid item container direction="row" xs={12} className='root'>

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
            
        );
    }
}

export default Student;
