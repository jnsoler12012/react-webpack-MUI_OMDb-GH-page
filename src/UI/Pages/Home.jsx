import React, { useContext, useEffect, useRef, useState } from 'react'
import Image1 from 'Images/Logo.png';
import Button from '@mui/material/Button';
import { MainContext } from '../../Infrastructure';
import axios from 'axios';
import { Box } from '@mui/material';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { queriesMovies, queriesMoviesDetails, queryMovie } from '../../Application/ReactQuery';
import { MovieCard, MovieCardContainer } from '../Components/MovieCard';
import { AsideBar } from '../Components/Bars';

async function testing(filterOptions, setMainContext) {
    console.log('estamos aca adentro');
    const { search, page } = filterOptions;


    return await new Promise((resolve, reject) => {
        const { isError, data: movies, isLoading: moviesLoading } = queryMovie({ search, page, apiKey: 'be478cec' });


        const MoviesDetailsQuery = queriesMoviesDetails({ movies, apiKey: 'be478cec' });

        const detailedMovies = MoviesDetailsQuery.map(result => ({
            data: result.data,
            isLoading: result.isLoading
        })).filter(Boolean);

        // console.log('testing', detailedMovies);
        if (!moviesLoading) {
            if (!(Array.isArray(movies)))
                return resolve(movies)
            if (detailedMovies.every(movie => !movie.isLoading))
                return resolve(detailedMovies)
        }

    })
}

export default function () {
    //use Context
    // Access the client
    const queryClient = useQueryClient()


    const [mainContext, setMainContext] = useContext(MainContext);

    const { reloadReq, loadingState, filterOptions, responsePetition } = mainContext;

    const { data } = responsePetition

    console.log(data);

    const execFilterSearch = ({ searchName }) => {
        console.log(searchName.value, 'asdasdasd');
        setMainContext((prevState) => ({
            ...prevState,
            reloadReq: true,
            filterOptions: {
                search: searchName.value,
                page: 1
            }
        }))
    }


    if (!data || reloadReq)
        (
            () => {
                (async function () {
                    await testing(filterOptions, setMainContext)
                        .then((response) => {
                            console.log('foma;', response);
                            if (response !== undefined && response) {
                                console.log('habemus algo');
                                setMainContext((prevState) => ({
                                    ...prevState,
                                    reloadReq: false,
                                    responsePetition: !(Array.isArray(response))
                                        ? ({
                                            data: [],
                                            status: {
                                                code: 400,
                                                message: `${response?.Error || 'Error Searching'}`
                                            }
                                        })
                                        : ({
                                            data: response.reduce((reducer, movie) => {
                                                reducer.push(movie.data);
                                                return reducer;
                                            }, []),
                                            status: {
                                                code: 200,
                                                message: 'Success'
                                            }
                                        })
                                }))
                            }
                        }).finally((ress) => {
                            console.log('final', ress);
                        })
                })();
            }
        )()


    return (
        <Box
            id='homeMainContainer'
            sx={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'green',
                height: 'auto',
                width: '100%'
            }}>
            <AsideBar movieList={data} execFilterSearch={execFilterSearch}>
                <MovieCardContainer movieList={data} />
            </AsideBar>
        </Box>
    )
}

