import React, { Component } from "react";
import styled from "styled-components";
import { Container, IconButton, Alert, Box, TextField } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material";

const FormWrapper = styled.div`
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 100%;
  height: 100%;
  margin: 20px;
  flex-direction: column;
`;
const Inputs = styled.div`
  display: flex;
  flex: 4;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 12px;
  gap: 30px;
`;
const FormControls = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Cover = styled.img`
  height: 300px;
  width: 300px;
`;

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        Title: "",
        parsed_isbn: "",
        Author: "",
        description: "",
        Publisher: "",
        Year: "",
        cover_url: "",
      },
      success: false,
      failure: false,
      message: "",
    };
    this.scan = this.scan.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }

  scan() {
    fetch("http://127.0.0.1:8000/api/scan/")
      .then((response) => response.json())
      .then((rbook) => {
        console.log(rbook);
        this.setState({ book: rbook });
      });
  }
  saveBook() {
    if (Object.keys(this.state.book).length === 0) {
      this.setState({ failure: true });
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.state.book.Title,
          isbn: this.state.book.parsed_isbn,
          author: this.state.book.Author,
          description: this.state.book.description,
          publisher: this.state.book.Publisher,
          year: this.state.book.Year,
          in_library: true,
          cover_url: this.state.book.cover_url,
        }),
      };
      fetch("http://127.0.0.1:8000/api/makbooks/savebook/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.setState({ message: data.success, success: true });
          } else if (data.failure) {
            this.setState({ message: data.failure, failure: true });
          }
          this.setState({
            book: {
              Title: "",
              parsed_isbn: "",
              Author: "",
              description: "",
              Publisher: "",
              Year: "",
              cover_url: "",
            },
          });
        });
    }
  }
  render() {
    return (
      <Container>
        <FormWrapper>
          <Inputs>
            <ImageContainer>
              <Cover src={this.state.book.cover_url} />
            </ImageContainer>
            <FormControls>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-error"
                  label="Title"
                  value={this.state.book.Title}
                />
                <TextField
                  id="outlined-error"
                  label="ISBN"
                  value={this.state.book.parsed_isbn}
                  onChange={(e) =>
                    this.setState({ book: { parsed_isbn: e.target.value } })
                  }
                />
                <TextField
                  id="outlined-error"
                  label="Author"
                  value={this.state.book.Author}
                  onChange={(e) =>
                    this.setState({ book: { Author: e.target.value } })
                  }
                />
                <TextField
                  id="outlined-error"
                  label="Description"
                  value={this.state.book.description}
                  onChange={(e) =>
                    this.setState({ book: { description: e.target.value } })
                  }
                />
                <TextField
                  id="outlined-error"
                  label="Publisher"
                  value={this.state.book.Publisher}
                  onChange={(e) =>
                    this.setState({ book: { Publisher: e.target.value } })
                  }
                />
                <TextField
                  id="outlined-error"
                  label="Year"
                  value={this.state.book.Year}
                  onChange={(e) =>
                    this.setState({ book: { Year: e.target.value } })
                  }
                />
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

          {this.state.failure ? (
            <Alert
              severity="error"
              onClose={() => {
                this.setState({ failure: false });
              }}
            >
              {this.state.message}
            </Alert>
          ) : (
            <></>
          )}
          {this.state.success ? (
            <Alert
              severity="success"
              onClose={() => {
                this.setState({
                  success: false,
                });
              }}
            >
              {this.state.message}
            </Alert>
          ) : (
            <></>
          )}
        </FormWrapper>
      </Container>
    );
  }
}

export default AddBook;
