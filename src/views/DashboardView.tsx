/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { RootState } from '../store'
import { addReport, deleteDashboard, reorderReports, updateDashboard } from '../store/actions'
import Button from '../components/forms/button'
import Modal from '../components/modal'
import Column from '../components/grid/Column'
import Report from '../components/reports/Report'
import ReportForm from '../components/reports/ReportForm'
import ColdStart from '../components/ColdStart'
import Header from '../components/header'
import { FeedbackForm } from '../components/feedback/FeedbackForm'
import { Report as ReportInterface } from '../store/reducers/dashboards'

function OrderEditFormItem({ report, index, length, handleUpClick, handleDownClick }) {
    return (
        <li className="flex justify-between p-2 mb-2 border-b border-gray-200" key={report.id}>
            <span className="text-xs text-gray-500 inline-block mr-2">
                {report.order}
            </span>
            <span className="flex-grow">
                {report.name}
            </span>

            <button onClick={() => handleUpClick(report)} className={`cursor-pointer outline-none ml-4 ${index > 0 ? 'text-blue-600' : 'text-gray-300'}`}>&uarr;</button>
            <button onClick={() => handleDownClick(report)} className={`cursor-pointer outline-none ml-4 ${index < length -1 ? 'text-blue-600' : 'text-gray-300'}`}>&darr;</button>
        </li>
    )
}

interface OrderEditFormProps {
    reports: ReportInterface[],
    onClose: () => void
}

function OrderEditForm(props: OrderEditFormProps) {
    const dispatch = useDispatch()
    const length = props.reports.length
    const [ reports, setReports ] = useState<ReportInterface[]>(props.reports)

    const handleUpClick = (report) => {
        const index = reports.findIndex(row => row.id === report.id)

        const newOrder = report.order - 1

        // Don't move top item
        if (newOrder == -1 ) return;

        // Extract the current item
        const extracted = reports.splice(index, 1)[0]
        extracted.order = newOrder

        // Take a copy of reports and fix the orders
        const newReports = reports.slice(0)
            .map(row => ({
                ...row,
                order: row.order <= newOrder ? row.order + 1 : row.order
            }))
            // ... and add the extracted item back in
            .concat(extracted)

        // Sort them items by their order
        newReports.sort((a, b) => a.order < b.order ? -1 : 1)

        // Reset the state
        setReports(newReports)
    }

    const handleDownClick = (report) => {
        const index = reports.findIndex(row => row.id === report.id)

        // zero-indexed - don't add anything to the order
        const newOrder = report.order

        // Don't move bottom item
        if (newOrder === length  ) return;

        // Extract the current item
        const extracted = reports.splice(index, 1)[0]
        extracted.order = newOrder

        // Take a copy of reports and fix the orders
        const newReports = reports.slice(0)
            .map(row => ({
                ...row,
                order: row.order > newOrder ? row.order - 1 : row.order
            }))
            // ... and add the extracted item back in
            .concat(extracted)

        // Sort them items by their order
        newReports.sort((a, b) => a.order < b.order ? -1 : 1)

        // Reset the state
        setReports(newReports)
    }

    const handleSaveClick = () => {
        dispatch(reorderReports(reports))
        props.onClose()
    }

    return (
        <Modal title='Edit Order' onClose={props.onClose}>
            <ul>
                <li className="flex">
                    <strong></strong>
                </li>
                {reports.map((report, index) => <OrderEditFormItem index={index} length={length} key={report.id} report={report} handleUpClick={handleUpClick} handleDownClick={handleDownClick} /> )}
            </ul>

            <div className="mt-4">
                <Button colour="blue" onClick={handleSaveClick} text="Save Order" />
                {' '}
                <Button colour="red" onClick={props.onClose} text="Cancel" />
            </div>
        </Modal>
    )
}

export default function Dashboard({ match }) {
    const dispatch = useDispatch()
    const dashboard = useSelector((state: RootState) => state.dashboards.dashboards.find(row => row.id === match.params.id))
    const reports = useSelector((state: RootState) => state.dashboards.reports.filter(row => row.dashboard === match.params.id))

    const [ showEditOrder, setShowEditOrder ] = useState<boolean>(false)

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
    const handleShowEditOrderClick = () => setShowEditOrder(true)

    return (
        <div className="flex flex-col w-full">
            <Header
                sectionLink="/dashboards"
                sectionText="Dashboards"
                pageTitle={dashboard.name}
                savedAt={dashboard.savedAt}
                buttons={[
                    { colour: 'blue', text: 'Add Report', onClick: handleShowAddReportClick, },
                    { colour: 'blue', text: 'Edit Order', onClick: handleShowEditOrderClick, },
                    { colour: 'red', text: 'Delete Dashboard', onClick: handleDeleteClick, },
                ]}
            />

            {showEditOrder && <OrderEditForm reports={reports} onClose={() => setShowEditOrder(false)} />}

            <div className="container mx-auto pb-16">
                <div className="px-8 py-8">
                {showAddReport && <Modal title="Add Report" onClose={() => setShowAddReport(false)}><ReportForm dashboard={dashboard.id} submitText="Add Report" onSubmit={handleAddReport} report={{}} /></Modal>}
                    <input type="text" className="font-bold text-gray-800 py-2 mb-2 bg-transparent border-b border-transparent focus:border-blue-400 focus:outline-none w-full text-xl" value={name} onChange={e => setName(e.target.value)} />

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

            <FeedbackForm page={match.path} />
        </div>
    )
}
