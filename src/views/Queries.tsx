/* eslint-disable */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addQuery, deleteQuery } from '../store/reducers/queries';
import Button from '../components/forms/button'
import Modal from '../components/modal';
import Card from '../components/card';

export default function Queries({ history }) {
    const dispatch = useDispatch()
    const queries = useSelector((state: RootState) => state.queries)

    const [showAddForm, setShowAddForm] = useState<boolean>(false)
    const [name, setName] = useState<string>('')

    const handleNameChange = e => setName(e.target.value)

    const handleAddQuery = () => {
        if (name !== '') {
            dispatch(addQuery(name))
            setName('')
            setShowAddForm(false)
        }
    }
    const handleShowAddFormClick = () => setShowAddForm(true)
    const handleHideAddFormClick = () => setShowAddForm(false)

    const handleDeleteQueryClick = id => {
        if (confirm('Are you sure you want to delete this query and all subsequent reports?')) {
            dispatch(deleteQuery(id))
        }
    }

    const goToQuery = id => history.push(`/queries/${id}`)

    return (
        <div className="flex flex-col w-full">
            <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4">
                <div className="flex justify-top flex-grow-0 mr-2 py-2">
                    <Link className="block bg-transparent text-lg font-bold focus:outline-none" to="/queries">
                        <span className="text-blue-600 mr-2">
                            Queries
                        </span>
                    </Link>
                </div>

                <div className="flex flex-grow"></div>

                <div className="ml-2">
                    <Button size="sm" colour="blue" text="Add Query" onClick={handleShowAddFormClick} />
                </div>
            </div>
            <div className="w-full">
                <div className="container m-auto">
                    <div className="flex flex-row flex-wrap pt-8">

                        {queries.map(query => (<div className="w-1/4 p-2" key={query.id}>
                            <Card title={query.name} onTitleClick={() => goToQuery(query.id)} tabs={[{ text: 'Delete', onClick: () => handleDeleteQueryClick(query.id) }]}>
                                <div className="flex flex-grow overflow-auto">
                                    {/* {query} */}
                                </div>
                                <div className="flex flex-grow-0 justify-end">
                                    <Link to={`/queries/${query.id}`} className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
                                        View Query
                                </Link>
                                </div>
                            </Card>
                        </div>))}

                        {!queries.length && <div className="flex flex-col w-full">
                            <div className="p-12 bg-white w-auto m-auto">
                                <h2 className="font-bold text-xl text-center text-blue-600">Let's get exploring!</h2>
                                <p className="mx-auto my-8 text-center">You can add a new query by clicking the <strong>Add Query</strong> button below</p>
                                <div className="text-center">
                                    <Button size="md" colour="blue" text="Add Query" onClick={handleShowAddFormClick} />
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

            {showAddForm && <Modal title="Add Query" onClose={handleHideAddFormClick}>
                <form>
                    <div>
                        <label htmlFor="description" className="block font-bold m-2">Description</label>
                        <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="mt-4">
                        <Button text="Add Query" onClick={handleAddQuery} />
                    </div>
                </form>
            </Modal>}
        </div>
    )
}
