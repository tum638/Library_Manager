import React, { Component } from "react";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import {
  Autocomplete,
  Box,
  Icon,
  Typography,
  TextField,
  Stack,
  Button,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "../../Static/ReturnBookImageEdited.jpg";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SnackBarDisplay = (props) => {
  if (props.display) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      props.callback();
    };
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    return (
      <div>
        <Snackbar
          open={props.open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={props.message}
          action={action}
        />
      </div>
    );
  }
};

export class ReturnBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      failure: false,
      message: "",
      students: [],

      open: false,
    };
    this.LiveStudentSearch = this.LiveStudentSearch.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.loadStudentList = this.loadStudentList.bind(this);
    this.updateParentComponent = this.updateParentComponent.bind(this);

    this.handleStudentButtonClick = this.handleStudentButtonClick.bind(this);
  }
  componentDidMount() {
    this.loadStudentList();
  }
  updateParentComponent() {
    this.setState({
      open: false,
    });
  }

  handleStudentButtonClick() {
    fetch("http://127.0.0.1:8000/api/makstudents/return_book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student: sessionStorage.getItem("student"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            success: true,
            open: true,
            message: data.success,
          });
        } else if (data.failure) {
          this.setState({
            failure: true,
            open: true,
            message: data.failure,
          });
        }
      });
    sessionStorage.removeItem("student");
  }
  loadStudentList() {
    fetch("http://127.0.0.1:8000/api/students/")
      .then((response) => response.json())
      .then((studentsList) => {
        this.setState({
          students: studentsList,
        });
      });
  }

  handleStudentChange(event, value) {
    sessionStorage.setItem("student", value.name);
  }

  LiveStudentSearch() {
    const student_names = [];
    this.state.students.map((student) => {
      student_names.push(student);
    });

    return (
      <Autocomplete
        onChange={(event, value) => {
          this.handleStudentChange(event, value);
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
          <TextField
            {...params}
            label="Name of student"
            sx={{
              backgroundColor: "#fff",
              width: "400px",
              marginTop: 3,
            }}
          />
        )}
      />
    );
  }
  render() {
    return (
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${Image})`,
          justifyContent: "center",
          alignItems: "center",
          width: "1000px",
          height: "565px",
          borderRadius: 8,
          boxShadow: 6,
        }}
      >
        <SnackBarDisplay
          severity={this.state.severity}
          callback={this.updateParentComponent}
          open={this.state.open}
          message={this.state.message}
          display={this.state.message !== "" ? true : false}
        />
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 60,
            }}
            variant="h4"
          >
            Return Book
          </Typography>
        </Box>
        <Box>{this.LiveStudentSearch()}</Box>
        {/* <Box>{this.LiveBookSearch()}</Box> */}
        <Box sx={{ marginTop: 3 }}>
          <Button
            sx={{
              width: "400px",
              height: "56px",
              backgroundColor: "black",
              ":hover": {
                bgcolor: "#d3d3d3",
                color: "black",
                fontweight: "bold",
              },
              borderRadius: 10,
            }}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={this.handleStudentButtonClick}
          >
            Return Book
          </Button>
        </Box>
      </Container>
    );
  }
}

export default ReturnBook;
