import Spinner from 'react-bootstrap/Spinner'
import React from 'react'

const spinner =()=> (
    <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
    </Spinner>
);

export default spinner ;
