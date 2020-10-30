import { v4 } from 'uuid'
import { TreeState } from './currentQuery'

const LOCAL_STORAGE_KEY = 'queries'

const ADD_QUERY = 'ADD_QUERY'
const UPDATE_QUERY = 'UPDATE_QUERY'
const DELETE_QUERY = 'DELETE_QUERY'

export function addQuery(name: string) {
    return {
        type: ADD_QUERY,
        payload: { name },
    }
}

export function deleteQuery(id: string) {
    return {
        type: DELETE_QUERY,
        payload: { id },
    }
}

export function updateQuery(payload: TreeState) {
    return {
        type: UPDATE_QUERY,
        payload,
    }
}

// export interface Query {
//     id: string;
//     name: string;
//     savedAt?: Date;
//     tree?: TreeState;
// }

type QueriesState = TreeState[]


const initialState: QueriesState = JSON.parse( window.localStorage.getItem(LOCAL_STORAGE_KEY) || '[]' )


export default function queriesReducer(state: QueriesState = initialState, action) {
    console.log(action.type, action.payload);

    switch (action.type) {
        case ADD_QUERY:
            state = state.concat({
                id: v4(),
                name: 'Untitled Query',
                nodes: [],
                relationships: [],
                predicates: [],
                output: [],
                ...action.payload,
            } as TreeState)
            break;

        case UPDATE_QUERY:
            state = state.filter(query => query.id !== action.payload.id)
            .concat({
                ...action.payload,
                updated: false,
                savedAt: new Date()
            } as TreeState)

        //     console.log('wtf', state);
            break;


        case DELETE_QUERY:
            state = state.filter(query => query.id !== action.payload.id)
            break;
    }

    // Save state to local storage
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))

    return state
}