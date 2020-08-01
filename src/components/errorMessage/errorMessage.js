import React from 'react';
import img from './error.png';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt="error"/>
            <span>ERROR</span>
        </>
    )
}

export default ErrorMessage;