import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';

import { AddCircleSharp, BookRounded, BookOutlined, Book } from '@material-ui/icons';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0
    },
    flex: {
        flex: 1
    },
    appbar: {
        background: '#0000ff'
    }
}));

const Nav = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.flex}>
                        Library
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            
        </div>
    )
}

export default Nav
