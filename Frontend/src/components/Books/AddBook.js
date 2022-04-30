import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, IconButton, Alert, Box, TextField } from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SaveIcon from '@mui/icons-material/Save';

const FormWrapper = styled.div`
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 100%;
    height: 70vh;
    margin: 20px;
    flex-direction: column;

`
const Inputs = styled.div`
    display: flex;
    flex: 4;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`

const Actions = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding: 12px;
    gap: 30px;
`
const FormControls = styled.div`
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    justify-content: center;
    align-items: center;
`
const ImageContainer = styled.div`
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
`

class AddBook extends Component{
    constructor(props){
        super(props)
        this.state = {
            book: {
            },
            success: false,
            failure: false,

        }
        this.scan = this.scan.bind(this)
        this.saveBook = this.saveBook.bind(this)
    }
    scan(){
        fetch('http://127.0.0.1:8000/api/scan/')
        .then((response) => response.json())
        .then(rbook => {
            this.setState({book: rbook})
        })
    }
    saveBook(){
        if(Object.keys(this.state.book).length === 0){
            this.setState({failure: true})
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: this.state.book.Title,
                    isbn: this.state.book.parsed_isbn,
                    author: this.state.book.Authors[0],
                    description: this.state.book.description,
                    publisher: this.state.book.Publisher,
                    year: this.state.book.Year,
                    in_library: false,
                    cover_url: this.state.book.cover_url
                 })
            };
            fetch('http://127.0.0.1:8000/api/books/', requestOptions)
            this.setState({success: true})
        }

    }
    render(){
        return(
            <Container>

                {this.state.failure? <Alert severity="error">Book entry failed. Try again.</Alert>: <></>}
                {this.state.success? <Alert severity="success">Book saved!</Alert>: <></>}

                <FormWrapper>
                    <Inputs>
                        <ImageContainer>
                            <img src={this.state.cover_url}/>
                        </ImageContainer>
                        <FormControls>
                            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
                            <TextField id="outlined-error" label="Title" defaultValue={this.state.book.Title}/>
                            </Box>
                        </FormControls>
                    </Inputs>
                    <Actions>
                        <IconButton variant="outlined" onClick={this.scan}>
                            <QrCodeScannerIcon />
                        </IconButton>
                        <IconButton variant="outlined" onClick={this.saveBook}>
                            <SaveIcon />
                        </IconButton>
                    </Actions>
                </FormWrapper>
                {this.state.book.Title}
                {this.state.book.cover_url}

            </Container>
        )
    }
}

export default AddBook