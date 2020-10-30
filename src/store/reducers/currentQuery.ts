import { ApocDirection, Condition } from "../../constants"

export const LOAD_QUERY = 'LOAD_QUERY'
export const ADD_NODE = 'ADD_NODE'
export const SELECT_NODE = 'SELECT_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'
export const ADD_RELATIONSHIP = 'ADD_RELATIONSHIP'
export const SELECT_RELATIONSHIP = 'SELECT_RELATIONSHIP'
export const REMOVE_RELATIONSHIP = 'REMOVE_RELATIONSHIP'
export const ADD_PREDICATE = 'ADD_PREDICATE'
export const REMOVE_PREDICATE = 'REMOVE_PREDICATE'
export const ADD_RETURN = 'ADD_RETURN'
export const REMOVE_RETURN = 'REMOVE_RETURN'

export const SET_NAME = 'SET_NAME'

export function setName(name: string | undefined) {
    return {
        type: SET_NAME,
        payload: { name },
    }
}


export function loadQuery(payload) {
    return {
        type: LOAD_QUERY,
        payload,
    }
}


export interface TreeNode {
    id: string;
    label: string;
}

export interface TreeRelationship {
    id: string;
    from: string;
    to: string;
    type: string;
    direction: ApocDirection;
}

interface TreePredicatePayload {
    alias: string;
    name: string;
    type: any;
    condition: Condition;
    negative?: boolean;
    value: any;
}

interface TreePredicate extends TreePredicatePayload {
    id: string;
}

interface TreeReturnPayload {
    alias: string;
    name: string;
}

interface TreeReturn extends TreeReturnPayload {
    id: string;
}

export interface TreeState {
    loaded: boolean;
    updated: boolean;
    id?: string;
    name?: string;
    savedAt?: Date;

    selected?: string;
    nodes: TreeNode[];
    relationships: TreeRelationship[];
    predicates: TreePredicate[];
    output: TreeReturn[];
}

const initialState: TreeState = {
    updated: false,
    loaded: false,
    nodes: [],
    relationships: [],
    predicates: [],
    output: [],
}

// {
//     updated: false,

//     id: v4(),
//     name: 'My Query',
//     savedAt: undefined,
//     selected: undefined,
//     nodes: [
//         { id: 'n1', label: 'Actor' }
//     ],
//     relationships: [],
//     predicates: [],
//     output: [],
// }

export function addNode(label: string) {
    return {
        type: ADD_NODE,
        payload: { label },
    }
}

export function selectNode(payload: string) {
    return {
        type: SELECT_NODE,
        payload,
    }
}

export function removeNode(id: string) {
    return {
        type: REMOVE_NODE,
        payload: { id },
    }
}

export function addRelationship(payload: TreeRelationship) {
    return {
        type: ADD_RELATIONSHIP,
        payload,
    }
}
export function selectRelationship(payload: string) {
    return {
        type: SELECT_RELATIONSHIP,
        payload,
    }
}
export function removeRelationship(id: string) {
    return {
        type: REMOVE_RELATIONSHIP,
        payload: { id },
    }
}


export function addPredicate(payload: TreePredicatePayload) {
    return {
        type: ADD_PREDICATE,
        payload
    }
}

export function removePredicate(id: string) {
    return {
        type: REMOVE_PREDICATE,
        payload: { id }
    }
}

export function addReturn(payload: TreeReturnPayload) {
    return {
        type: ADD_RETURN,
        payload
    }
}

export function removeReturn(id: string) {
    return {
        type: REMOVE_RETURN,
        payload: { id }
    }
}

function removeRelationshipFromTree(id: string, state: TreeState): TreeState {
    const toRemove = state.relationships.find(rel => rel.id === id)

    // Remove the end node of this relationship
    if ( toRemove ) {
        state = removeNodeFromTree(toRemove!.to, state)
    }

    // Remove the relationship from the state
    state.relationships = state.relationships.filter(rel => rel.id !== id)

    // Remove predicates
    state.predicates = state.predicates.filter(p => p.alias !== id)

    // Remove Return
    state.output = state.output.filter(p => p.alias !== id)

    // Reset selected
    state.selected = undefined

    return state
}


function removeNodeFromTree(id: string, state: TreeState): TreeState {
    const atStart = state.relationships.filter(row => row.from === id)

    // If node is at the start, remove all relationships further down the chain
    // eslint-disable-next-line
    atStart.map(rel => {
        state = removeNodeFromTree(rel.to, state)
    })

    // Remove relationships where the node is at the end
    state.relationships = state.relationships.filter(row => row.to !== id)

    // Remove the node from the node tree
    state.nodes = state.nodes.filter(node => node.id !== id)

    // Remove predicates
    state.predicates = state.predicates.filter(p => p.alias !== id)

    // Remove Return
    state.output = state.output.filter(p => p.alias !== id)

    // Reset selected
    state.selected = undefined

    return state
}

export default function queryReducer(state: TreeState = initialState, action: Record<string, any>): TreeState {
    state.updated = false

    switch (action.type) {
        case LOAD_QUERY:
            return action.payload as TreeState


        case SET_NAME:
            return {
                ...state,
                name: action.payload.name
            }

        // case DELETE_QUERY:
        //     // TODO: Move to another reducer
        //     return {
        //         name: 'xxx',
        //         id: v4(),
        //         nodes: [],
        //         relationships: [],
        //         predicates: [],
        //         output: []
        //     }

        case ADD_NODE:
            return {
                ...state,
                nodes: state.nodes.slice(0).concat({ ...action.payload, id: `n${state.nodes.length + 1}` })
            }

        case REMOVE_NODE:
            return removeNodeFromTree(action.payload.id, state)

        case ADD_RELATIONSHIP:
            const to = `n${state.nodes.length + 1}`
            return {
                ...state,
                nodes: state.nodes.slice(0).concat({ label: action.payload.label, id: to }),
                relationships: state.relationships.slice(0).concat({ ...action.payload, to, id: `r${state.relationships.length + 1}` })
            }
        case REMOVE_RELATIONSHIP:
            return removeRelationshipFromTree(action.payload.id, state)

        case SELECT_NODE:
        case SELECT_RELATIONSHIP:
            return {
                ...state,
                selected: action.payload
            }

        case ADD_PREDICATE:
            return {
                ...state,
                predicates: state.predicates.slice(0).concat({ ...action.payload, id: `p${state.predicates.length+1}` })
            }

        case REMOVE_PREDICATE:
            return {
                ...state,
                predicates: state.predicates.slice(0).filter(p => p.id !== action.payload.id)
            }

        case ADD_RETURN:
            return {
                ...state,
                output: state.output.slice(0).concat({ ...action.payload, id: `o${state.output.length+1}` })
            }

        case REMOVE_RETURN:
            return {
                ...state,
                output: state.output.slice(0).filter(p => p.id !== action.payload.id)
            }
      }

      return state
}
