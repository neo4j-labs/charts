import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createDriver, Neo4jProvider } from 'use-neo4j';
import { Driver } from 'neo4j-driver'
import { version } from 'use-neo4j/package.json'
import appLogo from './logo.svg'
import 'semantic-ui-css/semantic.min.css'
import 'tailwindcss/dist/tailwind.css'
import './index.css';
import store from './store';

import { Provider as ReduxProvider } from 'react-redux'
import { Neo4jScheme } from 'use-neo4j/dist/neo4j-config.interface';

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

let driver: Driver | undefined = undefined

if ( process.env.REACT_APP_NEO4J_SCHEME ) {
  driver = createDriver(
    process.env.REACT_APP_NEO4J_SCHEME as Neo4jScheme,
    process.env.REACT_APP_NEO4J_HOST as string,
    process.env.REACT_APP_NEO4J_PORT as string,
    process.env.REACT_APP_NEO4J_USERNAME as string,
    process.env.REACT_APP_NEO4J_PASSWORD as string
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Neo4jProvider logo={logo()} footer={footer()}>
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
