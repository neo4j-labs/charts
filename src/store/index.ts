import { combineReducers, createStore } from 'redux'
import currentQuery from './reducers/currentQuery'
import queries from './reducers/queries'

const rootReducer = combineReducers({
    queries,
    currentQuery,
})

export default createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
