import { Box, IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import { IoInformationCircle } from "react-icons/io5";
import React from 'react'

export default function ({ data }) {
    const { item, index } = data
    const { Title, Type, Year, Director, Poster } = item
    console.log(item);
    return (
        <ImageListItem key={index} sx={{ width: '80%', my: 1.2 }}>
            <img
                srcSet={`${Poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${Poster}?w=248&fit=crop&auto=format`}
                alt={'test'}
                loading="lazy"
            />
            <ImageListItemBar
                title={Title}
                subtitle={`${Director}-${Year}`}
                actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${Title}`}
                    >
                        <IoInformationCircle />
                    </IconButton>
                }
            />
        </ImageListItem>
    )
}