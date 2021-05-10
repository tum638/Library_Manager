import React, { useState } from 'react'
import { Button } from '@material-ui/core';




const ScanButton = () => {


    const {book, setBook } = useState([]);

    const fetchBook = async () => {
        const { data } = fetch('/api/scan');

        setBook(data);
    }

    console.log(book)

    return(

        <Button onClick={fetchBook} variant="contained" color="primary">
        Scan
    </Button>
    )
};

export default ScanButton