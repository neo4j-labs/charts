import { v4 } from 'uuid'
import Dashboard from '../../views/Dashboard';
import { neo4jDesktopGraphAppId } from '../../desktop/client';
import { saveDashboards } from '../../persistence';
import { ADD_DASHBOARD, ADD_REPORT, APP_INIT, DELETE_DASHBOARD, DELETE_REPORT, UPDATE_DASHBOARD, UPDATE_REPORT } from '../actions';

export type Source = 'cypher' | 'query'

export interface Dashboard {
    id: string;
    name: string;
    description: string;
    savedAt: Date;
}

export interface Report {
    id: string;
    dashboard: string;
    database?: string;
    name: string;
    order: number;
    savedAt: Date;

    columns: number;

    type: string; // TODO: type
    source: Source; // TODO: type
    query: string; // Cypher or ID
}

export interface DashboardsState {
    ready: boolean;
    dashboards: Dashboard[];
    reports: Report[];
}

export function deleteReport(id: string) {
    return {
        type: DELETE_REPORT,
        payload: { id },
    }
}

const initialState: DashboardsState = { dashboards: [], reports: [], ready: false }

function saveState(state: DashboardsState) {
    if ( neo4jDesktopGraphAppId ) {
        saveDashboards(state)
    }

    return state
}

export default function dashboardsReducer(state: DashboardsState = initialState, action: Record<string, any>) {
    switch (action.type) {
        case APP_INIT:
            state = {
                ...state,
                dashboards: action.payload.dashboards,
                reports: action.payload.reports,
                ready: true,
            }
            return state;

        case ADD_DASHBOARD:
            state = {
                ...state,
                dashboards: state.dashboards.concat({ id: v4(), savedAt: new Date(), ...action.payload }),
            }
            return saveState(state);

        case UPDATE_DASHBOARD:
            state = {
                ...state,
                dashboards: state.dashboards.filter(d => d.id !== action.payload.id).concat({
                    ...action.payload,
                    savedAt: new Date()
                })
            }
            return saveState(state);

        case DELETE_DASHBOARD:
            state = {
                ...state,
                dashboards: state.dashboards.filter(d => d.id !== action.payload.id),
                reports: state.reports.filter(d => d.dashboard !== action.payload.id),
            }
            return saveState(state);

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
            return saveState(state);

        case UPDATE_REPORT:
            // TODO: Re-order reports around the updated report
            state = {
                ...state,
                reports: state.reports.filter(d => d.id !== action.payload.id).concat({
                    ...action.payload,
                    savedAt: new Date()
                })
            }
            return saveState(state);

        case DELETE_REPORT:
            // TODO: Re-order reports around the deleted report
            state = {
                ...state,
                reports: state.reports.filter(d => d.id !== action.payload.id),
            }
            return saveState(state);
    }

    return state;
}