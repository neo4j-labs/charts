import { v4 } from 'uuid'

interface Dashboard {
    id: string;
    name: string;
    description: string;
    savedAt: Date;
}

export interface Report {
    id: string;
    dashboard: string;
    name: string;
    order: number;
    savedAt: Date;

    columns: number;

    type: string; // TODO: type
    source: string; // TODO: type
    query: string; // Cypher or ID
}

interface DashboardsState {
    dashboards: Dashboard[];
    reports: Report[];
}



const LOCAL_STORAGE_KEY = 'dashboards'

export const ADD_DASHBOARD = 'ADD_DASHBOARD'
export const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD'
export const DELETE_DASHBOARD = 'DELETE_DASHBOARD'
export const ADD_REPORT = 'ADD_REPORT'
export const UPDATE_REPORT = 'UPDATE_REPORT'
export const DELETE_REPORT = 'DELETE_REPORT'


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

export function addReport(dashboard: string, name: string, type: string, source: string, query: string, columns: number) {
    return {
        type: ADD_REPORT,
        payload: {
            dashboard,
            name,
            type,
            source,
            query,
            columns
        },
    }
}

export function updateReport(id: string, dashboard: string, name: string, type: string, source: string, query: string, columns: number, order: number) {
    return {
        type: UPDATE_REPORT,
        payload: {
            id,
            dashboard,
            name,
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

const initialState: DashboardsState = JSON.parse( window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{"dashboards":[],"reports":[]}' )

export default function dashboardsReducer(state: DashboardsState = initialState, action: Record<string, any>) {
    switch (action.type) {
        case ADD_DASHBOARD:
            state = {
                ...state,
                dashboards: state.dashboards.concat({ id: v4(), savedAt: new Date(), ...action.payload }),
            }
            break;

        case UPDATE_DASHBOARD:
            state = {
                ...state,
                dashboards: state.dashboards.filter(d => d.id !== action.payload.id).concat({
                    ...action.payload,
                    savedAt: new Date()
                })
            }
            break;

        case DELETE_DASHBOARD:
            state = {
                ...state,
                dashboards: state.dashboards.filter(d => d.id !== action.payload.id),
                reports: state.reports.filter(d => d.dashboard !== action.payload.id),
            }
            break;

        case ADD_REPORT:
            const order = state.reports.filter(report => report.dashboard === action.payload.dashboard).length

            state = {
                ...state,
                reports: state.reports.concat({
                    id: v4(),
                    savedAt: new Date(),
                    order,
                    ...action.payload,
                })
            }

            break;

        case UPDATE_REPORT:
            // TODO: Re-order reports around the updated report
            state = {
                ...state,
                reports: state.reports.filter(d => d.id !== action.payload.id).concat({
                    ...action.payload,
                    savedAt: new Date()
                })
            }
            break;

        case DELETE_REPORT:
            // TODO: Re-order reports around the deleted report
            state = {
                ...state,
                reports: state.reports.filter(d => d.id !== action.payload.id),
            }
            break;



    }

    // Save state to local storage
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))


    return state;
}