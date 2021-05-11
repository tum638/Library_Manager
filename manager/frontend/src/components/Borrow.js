import React, { Component } from 'react';
import Autocomplete from './Autocomplete';


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
              <Grid item xs={12} alignItems="center">
                  <Typography variant="h3" className={classes.heading}>Return Book</Typography>
              </Grid>
              <Grid item xs={12}>
    <form className={classes.root} noValidate autoComplete="off">
      <Autocomplete
      suggestions = {this.state.books.map((book) => (
          book.title
      ))}
    />
    <Button color="primary" size="small">search by subject</Button>
          <Autocomplete
      id="country-select-demo"
      style={{ width: 260 }}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          {option.label} ({option.code})
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Student Ref Code"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    /><Button color="primary" size="small">search by name</Button>
    </form>
    <Grid item container direction="row" xs={12} className={classes.root}>

        <Grid item>

        <Button variant="outlined">
            Return
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