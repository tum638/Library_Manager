import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import { Grid, Button, Typography, Radio, RadioGroup, TextField, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab';

class Borrow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [],
            students: [],
            selectedBook: {},
            selectedStudent: {},
            error: null,
         };


    }


    borrowBook = () => {
        fetch('/api/book/borrow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
    }


    fetchStudents = () => {
        fetch('/api/students')
        .then((response) => response.json())
        .then(stud => {
            this.setState({ students: stud });

        });
    
    }


    fetchBooks = () => {
        fetch('/api/books')
        .then((response) => response.json())
        .then(booksList => {
            this.setState({ books: booksList });

        });
    
    }

    scanBook = () => {
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


    componentDidMount() {
        this.fetchBooks();
        this.fetchStudents();
    }



    render() {
        return (
            <div>



            <Grid container spacing={1} direction="row">
        <Grid item xs={12} align="center">
          <Typography component="h4" className="heading" variant="h4">
            Borrow Book
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Book Title</div>
            </FormHelperText>
            <Autocomplete className="padding" selected={this.state.selectedBook.Title} suggestions={this.state.books.map((book) => (
book.title
))}
/>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
  <Autocomplete className="padding" onChange={(e) => this.setState({
    book: {
    selectedStudent: {
    fullname:  e.target.value} }})}
    
    selected={this.state.selectedStudent.fullname} suggestions={this.state.students.map((student) => (
    student.fullname
    ))}
    />
            <FormHelperText>
              <div align="center">Student Name</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.scanBook}
          >
            Scan
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.borrowBook}
          >
            Borrow
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
     { this.state.error && <Alert severity="error">{this.state.error}</Alert>} 
            
        </div>
        );
    }
}

export default Borrow;