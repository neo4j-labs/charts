/* eslint-disable */
import React, { useEffect } from 'react';
import QueryEditor from './views/QueryEditor'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import DashboardView from './views/DashboardView';
import DashboardList from './views/DashboardList';
import QueryList from './views/QueryList'
import { useSelector } from 'react-redux';
import { getInitialState } from './persistence';
import { RootState } from './store';
import { version } from '../package.json'

function App() {
  const ready = useSelector((state: RootState) => state.dashboards.ready)

  useEffect(() => {
    getInitialState()
  }, [])

  if ( !ready ) {
    return <div>...</div>
  }

  return (
    <div className="App flex flex-col">
      <Router>
        <div className="flex flex-row w-full bg-gray-800 flex-grow-0 flex-shrink-0">
          <Link to="/" className="px-4 py-6 bg-gray-700 text-white hover:text-gray-200">
            <span>Graph</span><span className="font-bold text-gray-200">Panel</span>
          </Link>
          <div className="flex flex-grow"></div>
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/dashboards">Dashboards</Link>
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/queries">Queries</Link>
        </div>
        <div className="flex flex-col flex-grow w-full bg-gray-100 overflow-auto">
          <Switch>
            <Route exact={true} path="/dashboards" component={DashboardList} />
            <Route exact={true} path="/queries" component={QueryList} />
            <Route path="/dashboards/:id" component={DashboardView} />
            <Route path="/queries/:id" component={QueryEditor} />
            <Route path="*" component={DashboardList} />
          </Switch>
          {/* <div className="mt-4 bg-blue-100 text-blue-800">
            <div className="container mx-auto pt-8 pb-4 px-4 flex justify-between mb-12">
              <div>
                GraphPanel v{version} -
                <a href="https://neo4j.com/labs" className="inline-block ml-2 font-bold text-purple-700">Neo4j Labs</a>
              </div>
              <div>
                Is this graph app useful?
              </div>
            </div>
          </div> */}
        </div>
      </Router>
    </div>
  )
}

export default App;
