import React, { createContext, useEffect, useState } from 'react'

import ReactRouterProvider from './ReactRouterProvider/ReactRouterProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export const MainContext = createContext(null)


export const MainApp = () => {

  const queryClient = new QueryClient();

  const [main, setMain] = useState({
    reloadReq: false,
    loadingState: false,
    filterOptions: {
      search: 'Godfather',
      page: 1
    },
    responsePetition: {
      data: null,
      status: {
        code: null,
        message: null
      }
    },
  })




  useEffect(() => {
    console.log('-------------CAMBIO MAIN STATE', main);


  }, [main.responsePetition])





  return (
    <QueryClientProvider client={queryClient}>
      <MainContext.Provider value={[main, setMain]}>

        <ReactRouterProvider />

      </MainContext.Provider>
    </QueryClientProvider>
  )
}

export default MainApp