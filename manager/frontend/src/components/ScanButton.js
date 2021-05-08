import React from 'react'
import { Button } from '@material-ui/core';



const scanBook = () => {
    fetch('/api/scan')
    .then((response) => response.json())
    .then(book => {
        console.log(book.data)
        return book;

    });
}

const ScanButton = () => {

    return(

        <Button onClick={scanBook} variant="contained" color="primary">
        Scan
    </Button>
    )
};

export default ScanButton