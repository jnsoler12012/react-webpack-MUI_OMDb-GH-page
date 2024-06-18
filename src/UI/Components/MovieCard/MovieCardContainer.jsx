import { Box, ImageList, ImageListItem, ListSubheader, useMediaQuery } from '@mui/material'
import React from 'react'
import MovieCard from './MovieCard'

export default function ({ movieList }) {

    const matchesSm = useMediaQuery('(max-width:900px)');
    const matchesMd = useMediaQuery('(max-width:1200px)');
    const matchesXL = useMediaQuery('(max-width:1536px)');

    return (
        <Box
            id='MovieCardContainer'
            sx={{
                backgroundColor: ' #4dff88',
                height: '100%',
                mt: 2
            }}
        >
            <ImageList cols={matchesSm ? 1 : matchesMd ? 2 : matchesXL ? 3 : 4} sx={{ width: '100%', height: '100%', justifyItems: 'center', alignItems: 'center' }} >
                {
                    (movieList) && (Array.isArray(movieList) && movieList.length > 0)
                        ? movieList.map((item, index) => (
                            <MovieCard key={index} data={{ item, index }} />
                        ))
                        : (<Box>
                            There are no movies with the specified name
                        </Box>)
                }
            </ImageList>
        </Box>
    )
}