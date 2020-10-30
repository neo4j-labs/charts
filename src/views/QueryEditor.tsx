/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import useSchema from '../hooks/use-schema';
import Graph from '../components/Graph';
import InitialNodeSelector from '../components/querybuilder/InitialNodeSelector';
import Toolbar from '../components/querybuilder/Toolbar';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { loadQuery, setName } from '../store/reducers/currentQuery';
import { deleteQuery, updateQuery } from '../store/reducers/queries';


export default function QueryEditor({ history, match }) {
    const { loading, labels, types } = useSchema()

    const dispatch = useDispatch()

    const query = useSelector((state: RootState) => state.queries.find(query => query.id === match.params.id))

    useEffect(() => {
        if (query) dispatch(loadQuery(query))
    }, [query])

    if ( !query ) {
        return <Redirect to="/" />
    }

    if ( loading || !query ) {
        return (
            <div className="flex flex-col h-screen">
                <div className="flex flex-col h-full justify-center align-center">
                    <div className="bg-gray-200 p-4 rounded-md w-auto justify-center mx-auto text-center" style={{width: '200px'}}>
                        <p className="font-bold mb-4">Loading Schema...</p>
                    </div>
                </div>
            </div>
        )
    }

    return <QueryEditorForm history={history} labels={labels} types={types} />
}

function QueryEditorForm({ history, labels, types }) {
    const nodes = useSelector((state: RootState) => state.currentQuery.nodes)
    const selected = useSelector((state: RootState) => state.currentQuery.selected)

    let graph = <InitialNodeSelector labels={labels} />

    if ( nodes.length ) {
        graph = <Graph />
    }

    return (
        <div className="query-stage flex flex-col h-full">
            <QueryHeader history={history} />

            <div className="query-stage flex flex-grow-1 h-full flex-row bg-gray-100">
                {graph}

                {selected && <Toolbar labels={labels} types={types} />}
            </div>

            {/* <div className="query-ight flex flex-grow-1 min-w-64">

                {selected && <Toolbar labels={labels} types={types} />}

            </div> */}
        </div>
    )

}

function QueryHeader({ history }) {
    const dispatch = useDispatch()
    const currentQuery = useSelector((state: RootState) => state.currentQuery)

    const setUpdatedName = name => dispatch(setName(name))
    const handleUpdateQueryClick = () => {
        // TODO: Update on the go?  Or wait for a click?
        dispatch(updateQuery(currentQuery))
        // history.push('/')
    }
    const handleDeleteClick = () => dispatch(deleteQuery(currentQuery.id as string))

    return (
        <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4">
            <div className="flex justify-top flex-grow-0 mr-2 py-2">
                <Link className="block bg-transparent text-lg font-bold focus:outline-none border-b border-transparent focus:border-blue-400" to="/">
                    <span className="text-blue-600 mr-2">
                    Home
                    </span>
                    <span className="text-gray-400">
                    /
                    </span>
                </Link>
            </div>
            <div className="flex justify-top">
                <input className="bg-transparent text-lg font-bold focus:outline-none border-b border-transparent focus:border-blue-400" type="text" value={currentQuery.name} onChange={e => setUpdatedName(e.target.value)} />
            </div>
            <div className="flex flex-grow"></div>
            <div className="flex flex-row">
                { currentQuery.savedAt && <div className="p-2 text-gray-500 text-italic text-sm">Last saved {currentQuery.savedAt.toString()}</div> }
                <button className="px-4 py-1 rounded-md border border-red-600 text-red-600 text-sm ml-2" onClick={handleDeleteClick}>Delete Query</button>
                <button className="px-4 py-1 rounded-md border border-blue-600 bg-blue-600 text-white font-bold text-sm ml-2" onClick={handleUpdateQueryClick}>Save Changes</button>
            </div>
        </div>
    )
}