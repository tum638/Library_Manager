import React from 'react'
import styled from 'styled-components'
import { Typography, IconButton, Modal, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Done, Info } from '@mui/icons-material'
import OutboundIcon from '@mui/icons-material/Outbound';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 6%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
const Header = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 12px;
    align-items: center;
`
const ImageContainer = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
`
const Cover = styled.img`
    height: 300px;
    width: 280px;

`
const Actions = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Description = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    background-color: white;
    box-shadow: 24;
    display: flex;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    margin-bottom: 12px;
    padding: 10px;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
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
`



const Book = ({ book }) => {
    const [students, setStudents] = React.useState([])
    const [form, setForm] = React.useState(false)
    const closeForm = () => setForm(false)

    function loadStudentList(){
        fetch('http://127.0.0.1:8000/api/students/')
        .then((response) => response.json())
        .then(studentsList => {
            setStudents(studentsList)
            setForm(true)
        })
    }

    React.useEffect(() => {
        if (students) console.log(students)
     }, [students])
     


    


    const [studentid, setStudentId ] = React.useState('')
    const handleSelect = (event) => setStudentId(event.target.value)

    const [info, setInfo] = React.useState(false)
    const openInfo = () => setInfo(true)
    const closeInfo = () => setInfo(false)

    const [loading, setLoading] = React.useState(true)
    const handleImageLoad = () => {
        setLoading(false)
    }
    return (
    <Container>
        <Header>
            <Typography component="div" variant="h5">
                {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            { book.author } 
          </Typography>
        </Header>
        <ImageContainer>
            <Cover src={book.cover_url} onLoad={handleImageLoad}/>
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
                        {book.in_library? <Chip label="Available In Library" color="success" deleteIcon={<Done />} /> : <Chip label="Not Available In Library" color="warning" deleteIcon={<Done />} />}
                    </Left>
                    <Right>
                        <Cover src={book.cover_url} onLoad={handleImageLoad}/>
                    </Right>
                </Description>
            </Modal>
            <IconButton onClick={loadStudentList}>
                <OutboundIcon />
            </IconButton>
            <Modal open={form} onClose={closeForm}>
                <BorrowFormWrapper>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={studentid}
                            label="Student"
                            onChange={handleSelect}
                        >
                        {students.map((student) => {
                            <MenuItem value={student.id}>{student.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>

                </BorrowFormWrapper>

            </Modal>
        </Actions>
    </Container>
  )
}

export default Book


class DummyBook extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <Container>
            <Header>
                <Typography component="div" variant="h5">
                    {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                { book.author } 
              </Typography>
            </Header>
            <ImageContainer>
                <Cover src={book.cover_url} onLoad={handleImageLoad}/>
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
                            {book.in_library? <Chip label="Available In Library" color="success" deleteIcon={<Done />} /> : <Chip label="Not Available In Library" color="warning" deleteIcon={<Done />} />}
                        </Left>
                        <Right>
                            <Cover src={book.cover_url} onLoad={handleImageLoad}/>
                        </Right>
                    </Description>
                </Modal>
                <IconButton onClick={loadStudentList}>
                    <OutboundIcon />
                </IconButton>
                <Modal open={form} onClose={closeForm}>
                    <BorrowFormWrapper>
    
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={studentid}
                                label="Student"
                                onChange={handleSelect}
                            >
                            {students.map((student) => {
                                <MenuItem value={student.id}>{student.name}</MenuItem>
                            })}
    
                        </Select>
                    </FormControl>
    
                    </BorrowFormWrapper>
    
                </Modal>
            </Actions>
        </Container>
        )
    }
}