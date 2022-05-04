import React from 'react'
import { List as BooksList, Book, AddBook } from './components/Books'
import {
  HashRouter as Router, Link, Route, Routes
} from 'react-router-dom'
import styled from 'styled-components'
import { Toolbar, AppBar, IconButton, Typography, Box, CssBaseline, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import { Add,  AssignmentReturn,  AssignmentReturnOutlined,  AutoGraph,  ListAlt,  Menu } from '@mui/icons-material'



const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

`
const MainContent = styled.div`

  margin-top: 80px;

`
const App = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);    
  }
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <Link to="/add">
          <ListItem button>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Book" />
          </ListItem>
          </Link>
          <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Books List" />
          </ListItem>
          </Link>
          <Link to="/return">
          <ListItem button>
            <ListItemIcon>
              <AssignmentReturnOutlined />
            </ListItemIcon>
            <ListItemText primary="Return Book" />
          </ListItem>
          </Link>
          <Link to="/statistics">
          <ListItem button>
            <ListItemIcon>
              <AutoGraph />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItem>
          </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed" sx={{width: { sm: `calc(100% - 240px)` },ml: { sm: `240px` },}}>
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Library Management
          </Typography>
          </Toolbar>
        </AppBar>
        <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
        <Toolbar />
      <MainContent>
      <Routes>
      <Route path="/" element={<BooksList/>}/>
      <Route path="/add" element={<AddBook/>}/>
      <Route path="/book" element={<Book/>} />
      </Routes>
      </MainContent>
      </Box>
    </Router>
  )
}

export default App