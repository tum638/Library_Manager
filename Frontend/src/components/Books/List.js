import { Container, Grid, IconButton } from '@mui/material'
import React, { Component } from 'react'
import { Book } from './'
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link } from 'react-router-dom'

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
            <Container>
                <IconButton onClick={this.getBooks}>
                    <RefreshIcon />
                </IconButton>
                <Grid container spacing={3}>
                    {this.state.books.map((book) => (
                       
                    <Grid key={book.id} item lg={4} md={6} sm={12}>
                        <Book book={book} />
                    </Grid> 
                                           
                    ))}

                </Grid>
                </Container>

        )
    }
}

export default List