import { createStore } from "redux"

export const ADD_NODE = 'ADD_NODE'
export const SELECT_NODE = 'SELECT_NODE'
export const ADD_RELATIONSHIP = 'ADD_RELATIONSHIP'
export const SELECT_RELATIONSHIP = 'SELECT_RELATIONSHIP'
export const ADD_PREDICATE = 'ADD_PREDICATE'
export const REMOVE_PREDICATE = 'REMOVE_PREDICATE'
export const ADD_RETURN = 'ADD_RETURN'
export const REMOVE_RETURN = 'REMOVE_RETURN'



export type Condition = 'equals' | 'contains' | 'starts with' | 'ends with'


export interface TreeNode {
    id: string;
    label: string;
}

interface TreeRelationship {
    id: string;
    from: string;
    to: string;
    type: string;
    direction: string;
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
    selected?: string;
    nodes: TreeNode[];
    relationships: TreeRelationship[];
    predicates: TreePredicate[];
    output: TreeReturn[];
}

const initialState: TreeState = {
    selected: undefined,
    // selected: 'n1',
    nodes: [
        // {id: "n1", label: "User"},
        // {id: "n2", label: "Subscription"},
    ],
    relationships: [
        // {id: "r1", from: 'n1', to: 'n2', type: 'PURCHASED', direction: 'out' }
    ],
    predicates: [
        // {id: 'p1', alias: "n1", name: "name", type: "STRING", value: "fsddf", condition: 'equals'}

    ],
    output: [
        // { id: 'o1', alias: 'n1', name: 'firstName'},
        // { id: 'o2', alias: 'n2', name: 'id'},
    ],
}

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

function treeReducer(state: TreeState = initialState, action: Record<string, any>): TreeState {
    console.log('tate', state, action);

    switch (action.type) {
        case ADD_NODE:
            return {
                ...state,
                nodes: state.nodes.slice(0).concat({ ...action.payload, id: `n${state.nodes.length + 1}` })
            }

        case ADD_RELATIONSHIP:
            const to = `n${state.nodes.length + 1}`
            return {
                ...state,
                nodes: state.nodes.slice(0).concat({ label: action.payload.label, id: to }),
                relationships: state.relationships.slice(0).concat({ ...action.payload, to, id: `r${state.relationships.length + 1}` })
            }

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


//
export default createStore(treeReducer)