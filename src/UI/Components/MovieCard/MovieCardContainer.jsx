import { Box, ImageList, ImageListItem, ListSubheader, Pagination, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import MovieCard from './MovieCard'

export default function ({ movieList, dataResponse, execNewPage }) {

    const { data, counterPage } = dataResponse

    const matchesSm = useMediaQuery('(max-width:900px)');
    const matchesMd = useMediaQuery('(max-width:1200px)');
    const matchesXL = useMediaQuery('(max-width:1650px)');

    return (
        <Box
            id='MovieCardContainer'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                background: 'rgb(255, 255, 255)',
                background: 'linear - gradient(180deg, rgba(255, 255, 255, 0) 0 %, rgba(255, 255, 255, 0) 100 %)',
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
            <Stack spacing={2} style={{ margin: '1rem 0', backgroundColor: 'white' }}>
                <Pagination
                    count={counterPage}
                    showFirstButton
                    showLastButton
                    size="large"
                    onChange={execNewPage}
                />
            </Stack>
        </Box>
    )
}