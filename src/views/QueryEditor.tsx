/* eslint-disable */
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import useSchema from '../hooks/use-schema';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { loadQuery } from '../store/actions';
import QueryEditorForm from '../components/querybuilder';

export default function QueryEditor({ match }) {
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

    return <QueryEditorForm labels={labels} types={types} />
}
