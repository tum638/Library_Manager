import React from 'react'
import styled from 'styled-components'
import { Typography, IconButton, Modal, Chip, Skeleton } from '@mui/material'
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



const Book = ({ book }) => {
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
            {loading? <Skeleton variant="rectangular" width={280} height={300}/> : <Cover src={book.cover_url} onLoad={handleImageLoad}/>}
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
                        {loading ? <Skeleton variant="rectangular" width={280} height={300} /> : <Cover src={book.cover_url} onLoad={handleImageLoad}/>}
                    </Right>
                </Description>
            </Modal>
            <IconButton>
                <OutboundIcon />
            </IconButton>
        </Actions>
    </Container>
  )
}

export default Book