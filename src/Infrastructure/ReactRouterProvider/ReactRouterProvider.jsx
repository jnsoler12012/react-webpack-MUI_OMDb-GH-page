import React, { useContext } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { ErrorPage, Home } from '../../UI/Pages'
import { SnackbarAlert } from '../../UI/Components/AlertsUI'
import { MainContext } from '../App'
import { TopBar } from '../../UI/Components/Bars'

function ReactRouterProvider() {
    const [mainContext, setMainContext] = useContext(MainContext)

    const { responsePetition } = mainContext

    return (
        <HashRouter>
            <div className='overflow-hidden' style={{ height: '100%', height: '100%' }}>
                <SnackbarAlert statusResponse={responsePetition?.status} setMainContext={setMainContext} />
                <TopBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="*">
                        <ErrorPage />
                    </Route>
                </Switch>
            </div>
        </HashRouter>

    )
}

export default ReactRouterProvider