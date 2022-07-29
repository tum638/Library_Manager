import React from "react";
import styled from "styled-components";
import {
  Typography,
  IconButton,
  Modal,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Stack,
  TextField,
  Button,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Done, Info } from "@mui/icons-material";

import OutboundIcon from "@mui/icons-material/Outbound";
import { Box } from "@mui/system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 12px;
  align-items: center;
`;
const ImageContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;
const Cover = styled.img`
  height: 300px;
  width: 280px;
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Description = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: white;
  box-shadow: 24;
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 10px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BorrowFormWrapper = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const Book = ({ book }) => {
  const [students, setStudents] = React.useState([]);
  const [form, setForm] = React.useState(false);

  const closeForm = () => setForm(false);
  function refreshPage() {
    window.location.reload(true);
  }

  function loadStudentList() {
    fetch("http://127.0.0.1:8000/api/students/")
      .then((response) => response.json())
      .then((studentsList) => {
        setStudents(studentsList);
        setForm(true);
      });
  }
  const [openchildmodal, setOpenChildModal] = React.useState(false);
  const handleOpenChildModal = () => {
    setOpenChildModal(true);
  };
  function ChildModal() {
    const handleClose = () => {
      setOpenChildModal(false);
    };

    return (
      <React.Fragment>
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          hideBackdrop
          open={openchildmodal}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            marginTop={8}
            borderRadius={3}
            sx={{
              width: 900,
              height: 200,
              bgcolor: "white",
              border: 2,
              margin: "auto",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} align="center">
                <Typography variant="h5" sx={{ marginTop: 4 }}>
                  Enter student name below
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                {LiveStudentSearch()}
              </Grid>
              <Grid item xs={6} align="center">
                <Button
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                  variant="contained"
                  onClick={() => {
                    sessionStorage.setItem("showAlert", true);
                    const data = borrowBook();
                    if (data) {
                      sessionStorage.setItem("borrowStatus", false);
                    } else {
                      sessionStorage.setItem("borrowStatus", true);
                    }
                    refreshPage();
                  }}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={6} align="center">
                <Button
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    ":hover": {
                      color: "black",
                    },
                  }}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Quit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  //   }
  function handleStudentChange(event, value) {
    if (sessionStorage.getItem("student") !== null) {
      sessionStorage.removeItem("student");
      sessionStorage.setItem("student", value.name);
    } else {
      sessionStorage.setItem("student", value.name);
    }
  }

  function LiveStudentSearch() {
    const student_names = [];
    students.map((student) => {
      student_names.push(student);
    });

    return (
      <Stack sx={{ width: 300 }}>
        <Autocomplete
          onChange={(event, value) => {
            handleStudentChange(event, value);
          }}
          disablePortal
          id="student_demo"
          getOptionLabel={(student_names) => `${student_names.name}`}
          options={student_names}
          sx={{ widht: 300 }}
          isOptionEqualToValue={(option, value) => {
            option.name === value.name;
          }}
          noOptionsText={"No available Student"}
          renderOption={(props, student_names) => (
            <Box component="li" {...props} key={student_names.id}>
              {student_names.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Name of student" />
          )}
        />
      </Stack>
    );
  }

  function borrowBook() {
    fetch("http://127.0.0.1:8000/api/makstudents/borrow/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student: sessionStorage.getItem("student"),
        book_id: book.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          return data.message;
        } else {
          return null;
        }
      });
  }

  React.useEffect(() => {
    if (students) console.log(students);
  }, [students]);

  const [info, setInfo] = React.useState(false);
  const openInfo = () => setInfo(true);
  const closeInfo = () => setInfo(false);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <Container>
      <Header>
        <Typography component="div" variant="h5">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {book.author}
        </Typography>
      </Header>
      <ImageContainer>
        <Cover src={book.cover_url} onLoad={handleImageLoad} />
      </ImageContainer>
      <Actions>
        <IconButton onClick={openInfo}>
          <Info />
        </IconButton>
        <Modal open={info} onClose={closeInfo}>
          <Description>
            <Left>
              <Typography variant="h4" gutterBottom component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {book.description}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {book.author}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {book.publisher}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                {book.year}
              </Typography>
              {book.in_library ? (
                <Chip
                  label="Available In Library"
                  color="success"
                  deleteIcon={<Done />}
                />
              ) : (
                <Chip
                  label="Not Available In Library"
                  color="warning"
                  deleteIcon={<Done />}
                />
              )}
            </Left>
            <Right>
              <Cover src={book.cover_url} onLoad={handleImageLoad} />
            </Right>
          </Description>
        </Modal>
        <IconButton onClick={loadStudentList}>
          <OutboundIcon />
        </IconButton>

        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={form}
          onClose={closeForm}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            borderRadius={3}
            sx={{
              width: 700,
              height: 500,
              bgcolor: "white",
              border: 2,
              margin: "auto",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} align="center">
                <Typography
                  style={{ fontWeight: 1000 }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  mt={2}
                  marginX={2}
                >
                  {book.title}
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Box component="img" alt="" src={book.cover_url} />
              </Grid>
              <Grid item xs={12} align="center">
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ fontWeight: 600 }}
                >
                  {book.author}
                </Typography>
              </Grid>
              <Grid item xs={6} align="center">
                <Typography component="h6" variant="h6" mt={5}>
                  Do you want to borrow this book?
                </Typography>
              </Grid>
              <Grid item xs={2} align="center" mt={5}>
                <Button
                  sx={{
                    backgroundColor: "black",
                  }}
                  color="primary"
                  variant="contained"
                  onClick={handleOpenChildModal}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item xs={2} align="center" mt={5}>
                <Button
                  sx={{
                    backgroundColor: "black",
                  }}
                  color="secondary"
                  variant="contained"
                  onClick={closeForm}
                >
                  No
                </Button>
              </Grid>
            </Grid>
            <ChildModal />
          </Box>
        </Modal>
      </Actions>
    </Container>
  );
};

export default Book;
