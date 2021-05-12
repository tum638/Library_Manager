import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import { Grid, Button, Typography, TextField} from '@material-ui/core';


class Borrow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [],
            selectedBook: {},
         };


    }

    fetchBooks = () => {
        fetch('/api/books')
        .then((response) => response.json())
        .then(booksList => {
            this.setState({ books: booksList });

        });
    
    }

    scanBook = () => {
        fetch('/api/scan')
        .then((response) => response.json())
        .then(selectedbook => {
            this.setState({selectedBook: selectedbook});
        })
        
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

        <Autocomplete selected={this.state.selectedBook.Title} suggestions={this.state.books.map((book) => (
            book.title
        ))}
        />


    </form>
    <Grid item container direction="row" xs={12} className='root'>

        <Grid item>

        <Button variant="outlined">
            Borrow
        </Button>
        </Grid>
        <Grid item>
            <Button onClick={this.scanBook} variant="contained" color="primary">
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