import { getProjectFiles, relateApiToken,  getFileContentsAsJson, saveFile } from "./desktop";
import store from "./store";
import { init, QueriesState, Query } from "./store/actions";
import { Dashboard, Report, DashboardsState } from "./store/reducers/dashboards";

export const DASHBOARD_LOCAL_STORAGE_KEY = 'dashboards'
export const QUERIES_LOCAL_STORAGE_KEY = 'queries'

const DASHBOARD_FILE = 'charts-dashboards.json'
const QUERIES_FILE = 'charts-queries.json'

interface DashboardState {
    dashboards: Dashboard[];
    reports: Report[];
}

interface InitialState extends DashboardState {
    queries: Query[];
}

export function saveDashboards(state: DashboardsState): DashboardsState {
    if ( relateApiToken ) {
        saveFile(DASHBOARD_FILE, JSON.stringify(state))
    }

    window.localStorage.setItem(DASHBOARD_LOCAL_STORAGE_KEY, JSON.stringify(state))

    return state
}

export function saveQueries(state: QueriesState): QueriesState {
    if ( relateApiToken ) {
        saveFile(QUERIES_FILE, JSON.stringify(state))
    }

    window.localStorage.setItem(QUERIES_LOCAL_STORAGE_KEY, JSON.stringify(state))

    return state;
}


function getDashboardDataFromDesktop(files): Promise<DashboardState> {
    const dashboardsFile = files.find(file => file.name === DASHBOARD_FILE)

    if ( !dashboardsFile ) {
        return Promise.resolve({
            dashboards: [],
            reports: [],
        })
    }

    return getFileContentsAsJson(dashboardsFile.name, dashboardsFile.downloadToken)
        .catch(e => {
            console.log(`Error loading ${DASHBOARD_FILE}, using default state`);
            console.log(e);

            return {
                dashboards: [],
                reports: [],
            }
        })
}

function getQueryDataFromDesktop(files): Promise<Query[]> {
    const queriesFile = files.find(file => file.name === QUERIES_FILE)

    if ( !queriesFile ) {
        return Promise.resolve([])
    }

    return getFileContentsAsJson(queriesFile.name, queriesFile.downloadToken)
        .catch(e => {
            console.log(`Error loading ${QUERIES_FILE}, using default`);
            console.log(e);

            return {
                dashboards: [],
                reports: [],
            }
        })
}

function getStateFromDesktop(): Promise<InitialState> {
    return getProjectFiles()
        .then(files => {
            return Promise.all([
                getDashboardDataFromDesktop(files),
                getQueryDataFromDesktop(files),
            ])
        })
        .then(([ dashboardData, queries ]) => ({
            dashboards: dashboardData ? (dashboardData as Record<string, any>).dashboards : [],
            reports: dashboardData ? (dashboardData as Record<string, any>).reports : [],
            queries: queries || []
        }) as InitialState)
        .catch(e => {
            console.log('Error loading state from Neo4j Desktop', e)

            return getStateFromLocalStorage()
        })
}

function getStateFromLocalStorage(): Promise<InitialState> {
    const { dashboards, reports } = JSON.parse( window.localStorage.getItem(DASHBOARD_LOCAL_STORAGE_KEY) || '{"dashboards":[],"reports":[]}' )
    const queries = JSON.parse( window.localStorage.getItem(QUERIES_LOCAL_STORAGE_KEY) || '[]' )

    return Promise.resolve({ dashboards, reports, queries })
}


export function getInitialState() {
    if ( relateApiToken ) {
        getStateFromDesktop()
            .then((state: InitialState) => {
                console.log('state from', state);

                store.dispatch(init( state.dashboards, state.reports, state.queries ))
            })
    }
    else {
        getStateFromLocalStorage()
            .then((state: InitialState) => store.dispatch(init( state.dashboards, state.reports, state.queries )) )
    }
  }