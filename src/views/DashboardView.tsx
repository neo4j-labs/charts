/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { RootState } from '../store'
import { addReport, deleteDashboard, updateDashboard } from '../store/actions'
import Button from '../components/forms/button'
import Modal from '../components/modal'
import Column from '../components/grid/Column'
import Report from '../components/reports/Report'
import ReportForm from '../components/reports/ReportForm'
import ColdStart from '../components/ColdStart'

export default function Dashboard({ match }) {
    const dispatch = useDispatch()
    const dashboard = useSelector((state: RootState) => state.dashboards.dashboards.find(row => row.id === match.params.id))
    const reports = useSelector((state: RootState) => state.dashboards.reports.filter(row => row.dashboard === match.params.id))

    // Sort reports by `order`
    reports.sort((a, b) => a.order < b.order ? -1 : 1)

    if (!dashboard) {
        return <Redirect to="/" />
    }

    const [name, setName] = useState(dashboard.name)
    const [description, setDescription] = useState(dashboard.description)

    const [ showAddReport, setShowAddReport ] = useState<boolean>(false)

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this dashboard?')) {
            dispatch(deleteDashboard(match.params.id))
        }
    }

    const handleUpdateClick = () => {
        dispatch(updateDashboard(match.params.id, name, description))
    }


    const handleAddReport = (dashboard, name, database, type, source, query, columns) => {
        dispatch( addReport(dashboard, name, database, type, source, query, columns) )

        setShowAddReport(false)
    }

    const handleShowAddReportClick = () => setShowAddReport(true)

    return (
        <div className="flex flex-col w-full">
            <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4">
                <div className="flex justify-top flex-grow-0 mr-2 py-2">
                    <Link className="block bg-transparent text-lg font-bold focus:outline-none" to="/">
                        <span className="text-blue-600 mr-2">
                            Dashboards
                        </span>
                        <span className="text-gray-400">
                            /
                    </span>
                    </Link>
                </div>
                <div className="flex justify-top text-lg font-bold py-2">
                    {dashboard!.name}
                </div>
                <div className="flex flex-grow"></div>
                <div className="flex flex-row">
                    {dashboard?.savedAt && <div className="p-2 text-gray-500 text-italic text-sm">Last saved {dashboard.savedAt.toString()}</div>}
                    <div className="ml-2">
                        <Button size="sm" colour="blue" text="Add Report" onClick={handleShowAddReportClick} />
                    </div>
                    <div className="ml-2">
                        <Button size="sm" colour="red" text="Delete Dashboard" onClick={handleDeleteClick} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto pb-16">
                <div className="px-8 py-8">
                {showAddReport && <Modal title="Add Report" onClose={() => setShowAddReport(false)}><ReportForm dashboard={dashboard.id} submitText="Add Report" onSubmit={handleAddReport} report={{}} /></Modal>}

                    <input type="text" className="font-bold text-gray-800 py-2 mb-2 bg-transparent border-b border-transparent focus:border-blue-400 focus:outline-none w-full" style={{ fontSize: '2rem' }} value={name} onChange={e => setName(e.target.value)} />

                    {/* <h1 className="font-bold text-gray-800" style={{fontSize: '2rem'}}>{dashboard!.name}</h1> */}

                    <div className="flex">

                        <input className="text-gray-600 bg-transparent border-b border-transparent focus:border-blue-400 pb-1 focus:outline-none flex-grow" type="text" value={description} onChange={e => setDescription(e.target.value)} />

                        {(dashboard.name !== name || dashboard.description !== description) && <button className="px-2 py-1 text-xs rounded-md border border-green-600 text-green-600 flex-grow-0 ml-2" onClick={handleUpdateClick}>Save Changes</button>}
                    </div>
                </div>

                <div className="flex flex-row flex-wrap">
                    {reports.map(report => <Column columns={report.columns} key={report.id}>
                        <Report {...report} />
                    </Column>)}

                    {!reports.length && <ColdStart
                        title="Let's get exploring!"
                        buttonText="Add Report"
                        onButtonClick={handleShowAddReportClick}
                    >
                        <p className="mx-auto my-8 text-center">You can add a report by clicking the <strong>Add Report</strong> button below</p>
                    </ColdStart>}
                </div>
            </div>
        </div>
    )
}
