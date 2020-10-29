import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createDriver, Neo4jProvider } from 'use-neo4j';
import appLogo from './logo.svg'
import { version } from 'use-neo4j/package.json'
import 'semantic-ui-css/semantic.min.css'

import 'tailwindcss/dist/tailwind.css'
import './index.css';
import store from './store';

import { Provider as ReduxProvider } from 'react-redux'

const logo = () => {
  return (<div className="logo"><img src={appLogo} alt="logo" /></div>)
}

const footer = () => {
  return (<div className="footer">
    <a href="https://github.com/adam-cowley/graphapp-starter-react" rel="noopener noreferrer" target="_blank">
      Built with GraphApp Starter Kit using<br />
      <code>use-neo4j</code> version {version}
    </a>
  </div>)
}

const driver = createDriver('neo4j', 'localhost', 7687, 'neo4j', 'neo')

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Neo4jProvider driver={driver} logo={logo()} footer={footer()}>
        <App />
      </Neo4jProvider>
    </ReduxProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
