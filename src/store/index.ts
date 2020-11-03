import { combineReducers, createStore } from 'redux'
import currentQuery from './reducers/currentQuery'
import queries from './reducers/queries'
import dashboards from './reducers/dashboards'

const rootReducer = combineReducers({
    queries,
    currentQuery,
    dashboards,
})

export default createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
