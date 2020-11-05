/* eslint-disable */
import React, { useEffect } from 'react';
import Queries from './views/Queries'
import QueryEditor from './views/QueryEditor'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import './App.css';
import Dashboard from './views/Dashboard';
import Dashboards from './views/Dashboards';
import { useSelector } from 'react-redux';

import { getInitialState } from './persistence';
import { RootState } from './store';


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
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/">Dashboards</Link>
          <Link className="text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700" to="/queries">Queries</Link>
        </div>
        <div className="flex flex-grow w-full bg-gray-100 overflow-auto">
          <Switch>
            <Route exact={true} path="/dashboards" component={Dashboards} />
            <Route exact={true} path="/queries" component={Queries} />
            <Route path="/dashboards/:id" component={Dashboard} />
            <Route path="/queries/:id" component={QueryEditor} />
            <Route path="*" component={Dashboards} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
