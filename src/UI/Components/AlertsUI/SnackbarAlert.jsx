import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { IoClose } from "react-icons/io5";
import { Alert } from '@mui/material';


export default function ({ statusResponse, setMainContext }) {
    const { code, message } = statusResponse

    console.log('status');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMainContext((prevState) => ({
            ...prevState,
            responsePetition: {
                ...prevState.responsePetition,
                status: {
                    code: null,
                    message: null
                }
            },
        }));
    };

    return (
        <Snackbar
            sx={{
                width: 'auto'
            }}
            open={(code) ? true : false}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                variant="filled"
                sx={{ width: '100%' }}
                severity={(code === 400) ? 'error' : 'success'}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <IoClose fontSize="big" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
}