import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Logo from 'Images/Logo.png';
import { Box } from '@mui/material';

export default function () {
    return (
        <Toolbar sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'red',
            height: '10%'
        }}>
            <Box
                component="img"
                sx={{
                    height: { xs: '70%', md: '100%' },
                    width: { xs: 'auto', md: 'auto' }
                }}
                alt="Webpage Logo"
                src={Logo}
            />
        </Toolbar>
    )
}