/* eslint-disable */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addQuery } from '../store/reducers/queries';

export default function Home({ match }) {
    const dispatch = useDispatch()

    const queries = useSelector((state: RootState) => state.queries)
        .map(query => <Link class="text-blue-600 font-bold mb-2" key={query.id} to={`/query/${query.id}`}>{query.name}</Link>)


    const [ name, setName ] = useState<string>('')

    const handleNameChange = e => setName(e.target.value)
    const handleAddQuery = () => {
        if ( name !== '' ) {
            dispatch(addQuery(name))
            setName('')
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full justify-center">
                <div className="bg-gray-200 p-4 rounded-md w-auto justify-center mx-auto" style={{width: '320px'}}>
                    {queries.length ? <div>
                        <p className="font-bold mb-4">Select Query</p>
                        {queries}
                    </div> : ''}

                    <p className="font-bold mt-8 mb-4">Add New Query</p>
                    <input className="w-full rounded-md border border-gray-400 p-2 mb-2" type="text" value={name} onChange={handleNameChange} />
                    <button className="block w-full px-4 py-2 rounded-md border font-bold border-blue-600 bg-white text-blue-600" onClick={handleAddQuery}>Add Query</button>
                </div>
            </div>
        </div>
    )
}
