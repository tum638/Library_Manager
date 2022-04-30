import { Container, Grid, IconButton } from '@mui/material'
import React, { Component } from 'react'
import { Book } from './'
import RefreshIcon from '@mui/icons-material/Refresh';

class List extends Component{
    constructor(props){
        super(props)
        this.state = {
            books: []
        }
        this.getBooks = this.getBooks.bind(this)
    }

    getBooks(){
        fetch('http://127.0.0.1:8000/api/books/')
        .then((response) => response.json())
        .then(booksList => {
            this.setState({ books: booksList })
        })
    }
    componentDidMount(){
        this.getBooks()
    }
    render(){
        return(
            <>
                <IconButton onClick={this.getBooks}>
                    <RefreshIcon />
                </IconButton>
                <Grid container spacing={3}>
                    {this.state.books.map((book) => (
                    <Grid item>
                        <Book book={book} />
                    </Grid>                        
                    ))}

                </Grid>
                </>

        )
    }
}

export default List