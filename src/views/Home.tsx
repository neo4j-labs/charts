/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { addDashboard } from '../store/reducers/dashboards'


export default function Home() {
    const dispatch = useDispatch()
    const dashboards = useSelector((n: RootState) => n.dashboards.dashboards)

    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')

    const handleAddDashboardClick = () => {
        if ( name !== '' ) {
            dispatch(addDashboard(name, description))
            setName('')
            setDescription('')
        }
    }

    return (
        <div className="flex flex-col w-full">

            <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4">
                <div className="flex justify-top flex-grow-0 mr-2 py-2">
                    <Link className="block bg-transparent text-lg font-bold focus:outline-none" to="/">
                        <span className="text-blue-600 mr-2">
                        Dashboards
                        </span>
                    </Link>
                </div>
            </div>

            <div className="w-full">
                <div className="container m-auto">
                    <div className="flex flex-row flex-wrap">
                        {dashboards.map(dashboard => <div className="w-1/4 p-2" key={dashboard.id}>
                            <div className="flex flex-col bg-white shadow-sm rounded-md p-4">
                                <Link key={dashboard.id} to={`/dashboards/${dashboard.id}`} className="text-xl text-gray-600 font-bold mb-4">
                                    {dashboard.name}
                                </Link>

                                {dashboard.description}

                                <div className="text-gray-400 mt-2 text-sm">
                                {dashboard.savedAt.toString()}
                                </div>
                            </div>
                        </div>)}
                    </div>

                    <div className="py-4">
                        <input type="text" onChange={e => setName(e.target.value)} />
                        <br />
                        <input type="text" onChange={e => setDescription(e.target.value)} />
                        <br />

                        <button onClick={handleAddDashboardClick}>Add Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
