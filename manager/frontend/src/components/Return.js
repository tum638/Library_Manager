import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import { Grid, Button, Typography, Radio, RadioGroup, TextField, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import { Link } from 'react-router-dom'


class Return extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [],
            students: [],
            selectedBook: {
            },
            selectedStudent: {

            }

         };


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
        .then((response) => response.json())
        .then(selectedbook => {
            this.setState({selectedBook: selectedbook})
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
            Return Book
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
          >
            Return
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
            
            
        </div>
        );
    }
}

export default Return;