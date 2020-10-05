# Graph App Starter - React

<div style="text-align:center">
<img src="https://github.com/adam-cowley/use-neo4j/raw/main/img/neo4j.png" height="100">
<img src="https://github.com/adam-cowley/use-neo4j/raw/main/img/arrow.svg" height="100">
<img src="https://github.com/adam-cowley/use-neo4j/raw/main/img/react.png" height="100">
</div>


This repository is your starter kit for [building a Graph App](https://neo4j.com/developer/graph-apps/building-a-graph-app/) for [Neo4j Desktop](https://neo4j.com/download/).  Feel free to fork this project.

## Getting Started

The repository uses the [`use-neo4j` hooks](https://github.com/adam-cowley/use-neo4j) to communicate with Neo4j using [Cypher Statements](https://neo4j.com/developer/cypher/).  This is a package intended to speed up the development by reducing the amount of boilerplate code required.  It is not intended for public-facing/production applications used by external users.

### Provider

The `Neo4jProvider` is included in in `src/index.ts` and is used to wrap the app.  When you first run the app, you will be presented with a login form which is used to create a driver within the `Neo4jContext`.  This context (exported from `use-neo4j`) can then be used to obtain the driver instance.

You can default the scheme, host, port, username, password or database

Alternatively you can pass a driver instance to the `Neo4jProvider` if you know the Neo4j credentials up front.

```tsx
import { Neo4jProvider, createDriver } from 'use-neo4j'

const driver = createDriver('neo4j', 'localhost', 7687, 'neo4j', 'letmein')

ReactDOM.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```


### Querying Neo4j

`use-neo4j` provides `useReadCypher` and `useWriteCypher` hooks for querying Neo4j.  Both hooks return a `Neo4jResultState` which provides helpers for accessing the query state and results.

```ts
useReadCypher(cypher: string, params?: Record<string, any>, database?: string): Neo4jResultState
```

Example code:

```tsx
function MyComponent() {
    const query = `MATCH (m:Movie {title: $title}) RETURN m`
    const params = { title: 'The Matrix' }

    const { loading, first } = useReadCypher(query, params)

    if ( loading ) return (<div>Loading...</div>)

    // Get `m` from the first row
    const movie = first.get('m')

    return (
        <div>{movie.properties.title} was released in {movie.properties.year}</div>
    )
}
```

For more information, [check the `use-neo4j` README](https://github.com/adam-cowley/use-neo4j).


## Testing Your Graph App

To test your Graph App, open up Neo4j Desktop and navigate to the **Application Settings** tab.  Under *Developer Tools*, check *Enable development mode*, enter `http://localhost:3000` (or the URL to this app from `yarn start`) into the Entry Point and `/` into the Root Path.

Next, open the *Action Bar* using Ctrl+K on Windows/Linux or CMD+K on a Mac and start to type `Development App` - hit enter when **Open Development App** is highlighted.


## Building your Graph App

To build your Graph App, use the `yarn build` command.  This will generate a `dist/` folder with the built assets.  Running `npm pack` will generate a `.tgz` file which can be dragged into the Install form at the bottom of the **Graph Apps** pane.


## Releasing your Graph App

You can publish your Graph App to `npm` or share the `.tgz` file with your colleagues.

[Let us know about your app on the Neo4j Community Site](https://community.neo4j.com/c/neo4j-graph-platform/graph-apps/95) or if you would like a link added to [The Graph App Gallery](https://install.graphapp.io/).
