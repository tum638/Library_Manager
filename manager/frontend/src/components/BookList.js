import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class BookList extends Component{

  constructor(props){
    super(props);
    this.state = {
      books: [],
      loaded: false,

    };


  }

  fetchBooks = () => {
    fetch('/api/books')
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ books: booksList });
    });

}


  render(){

    return (
      <div>
        <Button onClick={this.fetchBooks} variant='outlined'>Load Books</Button>
  <TableContainer component={Paper}>
      <Table aria-label="books table">
        <TableHead>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Publisher</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Borrowed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.books.map((book) => (
            <TableRow key={book.id}>
              <TableCell component="th" scope="row">
                {book.Title}
              </TableCell>
              <TableCell align="right">{book.subject}</TableCell>
              <TableCell align="right">{book.Publisher}</TableCell>
              <TableCell align="right">{book.Country}</TableCell>
              <TableCell align="right">{book.borrowed.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
    )


  }
}


export default BookList