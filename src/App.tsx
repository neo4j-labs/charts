import React from 'react';
import { useReadCypher } from 'use-neo4j'
import './App.css';

function App() {
  const { cypher, error, loading, first } = useReadCypher('MATCH (n) RETURN count(n) AS count')

  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)

  // Was there an error om the query?
  if ( error ) {
    result = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
    // Get the count
    const count = first?.get('count').toNumber()
    result = (<div>There are {count} nodes in the database.</div>)
  }

  return (
    <div className="App">
      <pre>{cypher}</pre>
      {result}
    </div>
  );
}

export default App;
