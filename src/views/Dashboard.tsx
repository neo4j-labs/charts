/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { RootState } from '../store'
import { addReport, updateReport, deleteDashboard, deleteReport, updateDashboard } from '../store/actions'
import { reportSources, reportTypes } from '../constants'
import Button from '../components/forms/button'
import Modal from '../components/modal'
import Card from '../components/card'
import MetricReport from '../components/reports/metric'
import MetricTable from '../components/reports/table'

function Report(props) {
    const [ tab, setTab ] = useState<string>('report')
    const dispatch = useDispatch()

    const handleDelete = () => {
        if ( confirm('Are you sure you want to delete this report?') ) {
            dispatch(deleteReport(props.id))
        }
    }

    const handleUpdateReport = (dashboard, name, type, source, query, columns) => {
        dispatch(updateReport(props.id, dashboard, name, type, source, query, columns, props.order))

        setTab('report')
    }

    const tabs = [
        { text: 'Edit', active: tab === 'edit', onClick: () => setTab('edit') },
        { text: 'Delete', onClick: () => handleDelete() },
    ]

    let content = <pre>{JSON.stringify(props, null, 2)}</pre>;

    if ( tab === 'edit' ) {
        content = <ReportForm dashboard={props.dashboard} report={props} submitText="Update Report" onSubmit={handleUpdateReport} />
    }
    else if ( props.type === 'metric' ) {
        content = <MetricReport {...props} />
    }
    else if ( props.type === 'table' ) {
        content = <MetricTable source={props.source} query={props.query} />
    }

    return (
        <Card title={props.name} tabs={tabs} onTitleClick={() => setTab('report')}>
            {content}
        </Card>
    )
}

function ReportForm({ dashboard, report, submitText, onSubmit }) {
    const queries = useSelector((state: RootState) => state.queries)

    const [name, setName] = useState<string>(report.name || '')
    const [columns, setColumns] = useState<number>(report.columns || 1)
    const [type, setType] = useState<string>(report.type || reportTypes[0].value)
    const [source, setSource] = useState<string>(report.source || reportSources[0].value)
    const [query, setQuery] = useState<string>(report.query || '')

    const handleSubmit = () => {
        // Validate Query Type
        if ( name === '' || query === '' || (source === 'query' && !queries.find(q => q.id === query)) ) {
            console.log('invalid payload');
            return
        }

        onSubmit(dashboard, name, type, source, query, columns)
    }


    return (
        <form className="pr-2">
            <div>
                <label htmlFor="name" className="block font-bold m-2">Name</label>
                <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="type" className="block font-bold m-2">Type</label>
                <select className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="type" value={type} onChange={e => setType(e.target.value)}>
                    {reportTypes.map(type => <option key={type.key} value={type.value}>{type.text}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="columns" className="block font-bold m-2">Columns</label>
                <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="columns" type="number" min={1} max={4} value={columns} onChange={e => setColumns(parseInt(e.target.value))} />
            </div>
            <div>
                <label htmlFor="source" className="block font-bold m-2">source</label>
                <select className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="source" value={source} onChange={e => setSource(e.target.value)}>
                    {reportSources.map(source => <option key={source.key} value={source.value}>{source.text}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="query" className="block font-bold m-2">query</label>
                {source === 'cypher' && <textarea className="w-full rounded-sm p-2 border border-gray-400 bg-white text-gray-600" id="query" rows={4} value={query} onChange={e => setQuery(e.target.value)} />}
                {source === 'query' && <select className="w-full rounded-sm p-2 border border-gray-400 bg-white text-gray-600" value={query} onChange={e => setQuery(e.target.value)}>
                    <option></option>
                    {queries.map(query => <option key={query.id} value={query.id}>{query.name}</option>)}
                </select>}
                {source === 'query' && queries.find(q => query == q.id) && <Link className="mt-2 text-xs text-blue-600" to={`/queries/${query}`}>Edit Query</Link> }
            </div>

            <div className="mt-4">
                <Button onClick={handleSubmit} text={submitText} />
            </div>
        </form>
    )
}


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


    const handleAddReport = (dashboard, name, type, source, query, columns) => {
        dispatch( addReport(dashboard, name, type, source, query, columns) )

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

            <div className="container mx-auto">
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
                    {reports.map(report => <div className={`w-${report.columns == 4 ? 'full' : `${report.columns}/4 `} p-2`} key={report.id}>
                        <Report {...report} />
                    </div>)}

                    {!reports.length && <div className="flex flex-col w-full">
                        <div className="p-12 bg-white w-auto m-auto">
                            <h2 className="font-bold text-xl text-center text-blue-600">Let's get exploring!</h2>
                            <p className="mx-auto my-8 text-center">You can add a report by clicking the <strong>Add Report</strong> button below</p>
                            <div className="text-center">
                                <Button size="md" colour="blue" text="Add Report" onClick={handleShowAddReportClick} />
                            </div>
                        </div>
                    </div>}


                    {/* <div className="w-1/4 p-2">
                        <div className="bg-white shadow-sm rounded-md p-4">
                            1
                        </div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-white shadow-sm rounded-md p-4">
                            2
                        </div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-white shadow-sm rounded-md p-4">
                            3
                        </div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-white shadow-sm rounded-md p-4">
                            4
                        </div>
                    </div>
                    <div className="w-1/4 p-2">
                        <div className="bg-white shadow-sm rounded-md p-4">
                            <div className="report-header border-gray-200 pt-2 pb-4 flex flex-row align-baseline">
                                <h1 className="text-xl text-gray-600 font-bold">Daily Active Users</h1>
                                <div className="flex-grow"></div>


                                <div className="text-gray-400 ml-2">

                                    <svg width="24px" height="24px" viewBox="0 0 20 24" version="1.1">

                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="navigation-menu-horizontal" stroke="#4a5568">
                                                <circle id="Oval" cx="3" cy="12" r="2"></circle>
                                                <circle id="Oval" cx="10" cy="12" r="2"></circle>
                                                <circle id="Oval" cx="17" cy="12" r="2"></circle>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <div className="report-metric">
                                <div className="text-blue-600 leading-none mt-12" style={{ fontSize: '4rem' }}>
                                    400
                                </div>
                                <div className="text-blue-400 font-bold mt-2 mb-4">Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 p-2">
                        <div className="bg-white shadow-sm rounded-md p-4">
                            <div className="report-header border-gray-200 pt-2 pb-4 flex flex-row align-baseline">
                                <h1 className="text-xl text-gray-600 font-bold">Foo</h1>
                                <div className="flex-grow"></div>

                                <div className="text-gray-400 ml-2">Last updated</div>
                                <div className="text-gray-400 ml-2">[Edit]</div>
                            </div>

                            <div className="report-metric">
                                <div className="text-blue-600 leading-none mt-12" style={{ fontSize: '4rem' }}>
                                    400
                                </div>
                                <div className="text-blue-400 font-bold mt-2 mb-4">Users</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* <button onClick={() => addReport('new')}>Add Report</button>

            <pre>{JSON.stringify(dashboard, null, 2)}</pre>
            <pre>{JSON.stringify(reports, null, 2)}</pre> */}
            {/* {dashboards.map(dashboard => <div key={dashboard.id}>
                <Link to={`/dashboards/${dashboard.id}`}>
                    {dashboard.id}: {dashboard.name}
                </Link>
            </div>)} */}

            {/* <pre>{JSON.stringify(reports, null, 2)}</pre> */}
        </div>
    )
}
