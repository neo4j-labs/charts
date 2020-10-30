/* eslint-disable */
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { useReadCypher } from 'use-neo4j'
import Home from './views/Home'
import QueryEditor from './views/QueryEditor'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        {/* <Menu> */}
          {/* <Menu.Item as={Link} to='/'> */}
            {/* Home */}
          {/* </Menu.Item> */}
        {/* </Menu> */}
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/query/:id" component={QueryEditor} />
        </Switch>
      </Router>
    </div>
  )



  // return (
  //   <div className="App">
  //     <Container>

  //       <Card header="Top Posters">
  //       <LineChart cypher="
  //   MATCH (u:User) WITH u ORDER BY size((u)-[:POSTED]->()) DESC LIMIT 10

  //   MATCH (u)-[:POSTED]->(m)
  //   WHERE m.createdAt >= datetime()-duration($interval)

  //   WITH u, {x: datetime.truncate('day', m.createdAt), y: count(*)} AS data
  //   ORDER BY data.x ASC
  //   RETURN u.display_name AS id, collect(data) AS data
  //   " params={{interval: 'P3M'}} />
  //   </Card>

  //       {/* <Grid>
  //         <Grid.Row>
  //           <Grid.Column width="8">
  //             <Card>
  //               foo
  //             </Card>
  //           </Grid.Column>

  //         </Grid.Row>
  //       </Grid> */}


  //     </Container>
  //   </div>
  // );
}

export default App;
