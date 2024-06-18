import { Box, IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import { IoInformationCircle } from "react-icons/io5";
import React from 'react'

export default function ({ data }) {
    const { item, index } = data
    const { Title, Type, Year, Director, Poster } = item
    console.log(item);
    return (
        <ImageListItem key={index} sx={{ maxWidth: '80%', my: 1.2, boxShadow: 6, }}>
            <div className="image-container" style={{ backgroundImage: (Poster === 'N/A') ? `url(https://www.prokerala.com/movies/assets/img/no-poster-available.jpg)` : `url(${Poster})` }}>

            </div>

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
        </ImageListItem >
    )
}