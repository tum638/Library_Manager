import { AssignmentReturned, BarChart, Book, ContentPaste } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List';
import React from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Container = styled.div`
    display: flex;
    flex: 1;
    margin: 35px;
    flex-direction: column;
`
const Top = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: white;
`
const Logo = styled.h1`
    color: white;
    font-weight: 500;
    font-size: 25px;
`
const Middle = styled.div`
    display: flex;
    flex: 4;
    align-items: center;
    justify-content: center;
`
const Menu = styled.ul`
    list-style-type: none;
    margin: 0; 
    padding: 0;
`
const MenuItem = styled.li`
    padding: 13px;
    font-weight: 300;
`
const Option = styled.div`
    display: flex;
    padding: 10px;
    color: blue;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`


const Bottom = styled.div`
    display: flex;
    position: relative;
    flex: 1;
    align-items: center;
    justify-content: center;
`



const SidePanel = () => {
  return (
    <Container>
        <Top>
            <Book/>
            <Logo>Mako Library</Logo>
        </Top>
        <Middle>
            <Menu>
                <MenuItem><Option><ListIcon style={{marginRight: '10px'}}/> Books List</Option></MenuItem>
                <MenuItem><Option><AddCircleIcon style={{marginRight: '10px'}}/>Enter Book</Option></MenuItem>
                <MenuItem><Option><ContentPaste style={{marginRight: '10px'}}/> Issue Book</Option></MenuItem>
                <MenuItem><Option><AssignmentReturned style={{marginRight: '10px'}}/> Return Book</Option></MenuItem>
                <MenuItem><Option><BarChart style={{marginRight: '10px'}}/> Statistics</Option></MenuItem>

            </Menu>
        </Middle>
        <Bottom>Bottom</Bottom>
    </Container>
  )
}

export default SidePanel