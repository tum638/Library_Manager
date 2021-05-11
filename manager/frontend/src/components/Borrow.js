import React, { Component } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { Grid, Button, Typography, TextField} from '@material-ui/core';


class Borrow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [],

         };


    }

    fetchBooks = () => {
        fetch('/api/books')
        .then((response) => response.json())
        .then(booksList => {
            this.setState({ books: booksList });
        });
    
    }

    componentDidMount() {
        this.fetchBooks();
    }

    render() {
        return (
            <div>
            <Grid container direction="column">
              <Grid item container xs={12} alignItems="center">
                  <Typography variant="h3" className="heading">Borrow Book</Typography>
              </Grid>
              <Grid item xs={12}>
    <form className='root' noValidate autoComplete="off">
    <Autocomplete
name="country"
style={{ width: 260 }}
options={this.state.books.map((book) => (
  book.title
))}
classes={{
  option: 'suggestion',
  }}
autoHighlight
renderOption={(book) => (
<React.Fragment>
{book.title}
</React.Fragment>
)}

renderInput={(params) => (
<TextField
{...params}
label="Country"
variant="outlined"
inputProps={{
  ...params.inputProps,
  autoComplete: 'new-password', // disable autocomplete and autofill
}}
/>
)}
onChange={(e) => setCountry(e.target.value)}
/>

    </form>
    <Grid item container direction="row" xs={12} className='root'>

        <Grid item>

        <Button variant="outlined">
            Borrow
        </Button>
        </Grid>
        <Grid item>
            <Button variant="contained" color="primary">
                Scan
            </Button>
        </Grid>

    </Grid>
    </Grid>
            </Grid>
            
        </div>
        );
    }
}

export default Borrow;