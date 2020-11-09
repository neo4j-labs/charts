import { AggregationFunction } from "@neode/querybuilder"
import { ApocDirection, Condition } from "../constants"
import { Dashboard, Report } from "./reducers/dashboards"

export type QueriesState = Query[]

export interface Query {
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

export interface TreePredicatePayload {
    alias: string;
    name: string;
    type: any;
    condition: Condition;
    negative?: boolean;
    value: any;
}

export interface TreePredicate extends TreePredicatePayload {
    id: string;
}

export interface TreeReturnPayload {
    alias: string;
    name: string;
    aggregate?: AggregationFunction;
    as?: string;
}

export interface TreeReturn extends TreeReturnPayload {
    id: string;
}


export const APP_INIT = 'APP_INIT'
export const ADD_DASHBOARD = 'ADD_DASHBOARD'
export const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD'
export const DELETE_DASHBOARD = 'DELETE_DASHBOARD'
export const ADD_REPORT = 'ADD_REPORT'
export const UPDATE_REPORT = 'UPDATE_REPORT'
export const DELETE_REPORT = 'DELETE_REPORT'

export const ADD_QUERY = 'ADD_QUERY'
export const UPDATE_QUERY = 'UPDATE_QUERY'
export const DELETE_QUERY = 'DELETE_QUERY'

/**
 * Init app
 */
export function init(dashboards: Dashboard[], reports: Report[], queries: Query[]) {
    return {
        type: APP_INIT,
        payload: { dashboards, reports, queries },
    }
}

/**
 * Dashboards
 */
export function addDashboard(name: string, description: string) {
    return {
        type: ADD_DASHBOARD,
        payload: { name, description },
    }
}

export function updateDashboard(id: string, name: string, description: string) {
    return {
        type: UPDATE_DASHBOARD,
        payload: { id, name, description },
    }
}

export function deleteDashboard(id: string) {
    return {
        type: DELETE_DASHBOARD,
        payload: { id },
    }
}

export function addReport(dashboard: string, name: string, database: string | undefined, type: string, source: string, query: string, columns: number) {
    return {
        type: ADD_REPORT,
        payload: {
            dashboard,
            name,
            database,
            type,
            source,
            query,
            columns
        },
    }
}

export function updateReport(id: string, dashboard: string, name: string, database: string | undefined,  type: string, source: string, query: string, columns: number, order: number) {
    return {
        type: UPDATE_REPORT,
        payload: {
            id,
            dashboard,
            name,
            database,
            type,
            source,
            query,
            columns,
            order,
        },
    }
}

export function deleteReport(id: string) {
    return {
        type: DELETE_REPORT,
        payload: { id },
    }
}

/**
 * Queries
 */
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

export function updateQuery(payload: Query) {
    return {
        type: UPDATE_QUERY,
        payload,
    }
}


/**
 * Query Builder
 */
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
