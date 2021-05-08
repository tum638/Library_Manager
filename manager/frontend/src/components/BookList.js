import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

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

componentDidMount() {
    fetch('/api/books')
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ books: booksList });
    });
}



  render(){

    return (
      <div>
      <ul>
      {this.state.books.map((book) => (
          <li key={book.id}>{book.title}</li>
      ))}
  </ul>
  </div>
    )


  }
}


export default BookList