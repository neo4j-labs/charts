/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { addDashboard, deleteDashboard } from '../store/actions'
import Button from '../components/forms/button'
import Modal from '../components/modal'
import Card from '../components/card'
import Column from '../components/grid/Column'
import ColdStart from '../components/ColdStart'
import Header from '../components/header'
import { FeedbackForm } from '../components/feedback/FeedbackForm'


export default function Dashboards({ history, match }) {
    const dispatch = useDispatch()
    // @ts-ignore
    const dashboards = useSelector((n: RootState) => n.dashboards.dashboards)

    const [ showAddForm, setShowAddForm ] = useState<boolean>(false)
    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')

    const handleShowAddClick = () => {
        setShowAddForm(true)
    }
    const handleAddDashboardClick = () => {
        if ( name !== '' ) {
            dispatch(addDashboard(name, description))
            setName('')
            setDescription('')
            setShowAddForm(false)
        }
    }

    const handleDeleteDashboardClick = id => {
        if ( confirm('Are you sure you want to delete this dashboard?') ) {
            dispatch(deleteDashboard(id))
        }
    }

    const goToDashboard = id => history.push(`/dashboards/${id}`)

    return (
        <div className="flex flex-col w-full">
            <Header
                sectionLink="/dashboards"
                sectionText="Dashboards"
                buttons={[
                    { colour: 'blue', text: 'Add Dashboard', onClick: handleShowAddClick, },
                ]}
            />

            <div className="w-full">
                <div className="container m-auto">
                    <div className="flex flex-row flex-wrap pt-8">
                        {dashboards && dashboards.map(dashboard => <Column columns={1} key={dashboard.id}>
                            <Card
                                title={dashboard.name}
                                onTitleClick={() => goToDashboard(dashboard.id)}
                                tabs={ [ { text: 'Delete', onClick: () => handleDeleteDashboardClick(dashboard.id) } ] }
                                actions={ [ {text: 'View Dashboard', to: `/dashboards/${dashboard.id}`} ] }
                            >
                                    {dashboard.description}
                            </Card>
                        </Column>)}

                        {!dashboards || !dashboards.length && <ColdStart
                            title="Let's get exploring!"
                            buttonText="Add Dashboard"
                            onButtonClick={handleShowAddClick}
                        >
                            <p className="mx-auto my-8 text-center">You can add a new dashboard by clicking the <strong>Add Dashboard</strong> button below</p>
                        </ColdStart>}
                    </div>
                </div>
            </div>

            {showAddForm && <Modal title="Add Dashboard" onClose={() => setShowAddForm(false)}>
                <form>
                    <div>
                        <label htmlFor="name" className="block font-bold m-2">Name</label>
                        <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" type="text" onChange={e => setName(e.target.value)} placeholder="name" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-bold m-2">Description</label>
                        <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" type="text" onChange={e => setDescription(e.target.value)} placeholder="description" />
                    </div>

                    <div className="mt-4">
                        <Button text="Add Dashboard" onClick={handleAddDashboardClick} />
                    </div>
                </form>
            </Modal>
            }

            <FeedbackForm page={match.path} />
        </div>
    )
}
