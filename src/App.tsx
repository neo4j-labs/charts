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
import Help from './views/Help';

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
          <Link to="/" className="px-4 py-6 bg-gray-700 text-white hover:text-gray-200 font-bold">
            <span>Charts</span>
          </Link>
          <div className="flex flex-grow"></div>
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/dashboards">Dashboards</Link>
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/queries">Queries</Link>
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/help">
            Help
          </Link>
        </div>
        <div className="flex flex-col flex-grow w-full bg-gray-100 overflow-auto">
          <Switch>
            <Route exact={true} path="/dashboards" component={DashboardList} />
            <Route exact={true} path="/queries" component={QueryList} />
            <Route path="/dashboards/:id" component={DashboardView} />
            <Route path="/queries/:id" component={QueryEditor} />
            <Route path="/help" component={Help} />
            <Route path="*" component={DashboardList} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
