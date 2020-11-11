import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateReport, deleteReport } from '../../store/actions';
import { TYPE_BAR, TYPE_LINE, TYPE_METRIC, TYPE_TABLE, TYPE_STACKED_BAR, TYPE_HORIZONTAL_BAR, TYPE_HORIZONTAL_STACKED_BAR, TYPE_RADAR, TYPE_FUNNEL, TYPE_HORIZONTAL_FUNNEL, TYPE_BUMP, TYPE_AREA_BUMP, TYPE_CHORD, TYPE_BUBBLE, TYPE_CALENDAR, TYPE_HEAT_MAP, TYPE_NETWORK } from '../../constants';
import Card, { CardTab } from '../card';
import MetricReport from './metric';
import TableReport from './table';
import LineReport from './line';
import BarReport from './bar';
import ReportForm from "./ReportForm";
import RadarReport from './radar';
import FunnelReport from './funnel';
import BumpReport from './bump';
import ChordReport from './chord';
import AreaBumpReport from './areaBump';
import BubbleReport from './bubble';
import CalendarReport from './calendar';
import HeatMap from './heatMap';
import NetworkReport from './network';


function ExpandIcon({ onClick }) {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24" onClick={onClick} className="expand w-4 h-4 mt-2 ml-2">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g stroke="#718096" strokeWidth="1.5">
                    <line x1="9.75" y1="14.248" x2="0.75" y2="23.248" id="Shape"></line>
                    <polyline id="Shape" points="23.25 7.498 23.25 0.748 16.5 0.748"></polyline>
                    <polyline id="Shape" points="0.75 16.498 0.75 23.248 7.5 23.248"></polyline>
                    <line x1="23.25" y1="0.748" x2="14.25" y2="9.748" id="Shape"></line>
                </g>
            </g>
        </svg>
    )
}

function ContractIcon({ onClick }) {
    return (
        <svg width="24px" height="24px" viewBox="0 0 24 24" onClick={onClick} className="contract w-4 h-4 mt-2 ml-2">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g stroke="#718096" strokeWidth="1.5">
                    <line x1="23.25" y1="0.748" x2="14.25" y2="9.748" id="Shape"></line>
                    <polyline id="Shape" points="9.75 20.998 9.75 14.248 3 14.248"></polyline>
                    <polyline id="Shape" points="14.25 2.998 14.25 9.748 21 9.748"></polyline>
                    <line x1="9.75" y1="14.248" x2="0.75" y2="23.248" id="Shape"></line>
                </g>
            </g>
        </svg>
    )
}

export default function Report(props) {
    const [ expanded, setExpanded ] = useState<boolean>(false)
    const [ tab, setTab ] = useState<string>('report');
    const dispatch = useDispatch();

    const handleDelete = () => {
        // eslint-disable-next-line
        if ( confirm('Are you sure you want to delete this report?') ) {
            dispatch(deleteReport(props.id));
        }
    };

    const handleUpdateReport = (dashboard, name, database, type, source, query, columns) => {
        dispatch(updateReport(props.id, dashboard, name, database, type, source, query, columns, props.order));

        setTab('report');
    };

    const expandContract: CardTab = expanded
        ? { children: <ContractIcon onClick={() => setExpanded(false)} /> }
        : { children: <ExpandIcon onClick={() => setExpanded(true)} /> }

    const tabs = [
        { text: 'Edit', active: tab === 'edit', onClick: () => setTab('edit') },
        { text: 'Delete', onClick: () => handleDelete() },
        expandContract
    ];

    let content = <pre>{JSON.stringify(props, null, 2)}</pre>;

    if (tab === 'edit') {
        content = <ReportForm dashboard={props.dashboard} report={props} submitText="Update Report" onSubmit={handleUpdateReport} />;
    }
    else if (props.type === TYPE_METRIC) {
        content = <MetricReport {...props} />;
    }
    else if (props.type === TYPE_TABLE) {
        content = <TableReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_LINE) {
        content = <LineReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_BAR) {
        content = <BarReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_STACKED_BAR) {
        content = <BarReport source={props.source} query={props.query} database={props.database} stacked={true} />;
    }
    else if (props.type === TYPE_HORIZONTAL_BAR) {
        content = <BarReport source={props.source} query={props.query} database={props.database} layout="horizontal" />;
    }
    else if (props.type === TYPE_HORIZONTAL_STACKED_BAR) {
        content = <BarReport source={props.source} query={props.query} database={props.database} stacked={true} layout="horizontal" />;
    }
    else if (props.type === TYPE_HORIZONTAL_STACKED_BAR) {
        content = <BarReport source={props.source} query={props.query} database={props.database} stacked={true} layout="horizontal" />;
    }
    else if (props.type === TYPE_RADAR) {
        content = <RadarReport source={props.source} query={props.query} database={props.database} stacked={true} />;
    }
    else if (props.type === TYPE_FUNNEL) {
        content = <FunnelReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_HORIZONTAL_FUNNEL) {
        content = <FunnelReport source={props.source} query={props.query} database={props.database} layout="horizontal" />;
    }
    else if (props.type === TYPE_BUMP) {
        content = <BumpReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_AREA_BUMP) {
        content = <AreaBumpReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_CHORD) {
        content = <ChordReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_BUBBLE) {
        content = <BubbleReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_CALENDAR) {
        content = <CalendarReport source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_HEAT_MAP) {
        content = <HeatMap source={props.source} query={props.query} database={props.database} />;
    }
    else if (props.type === TYPE_NETWORK) {
        content = <NetworkReport source={props.source} query={props.query} database={props.database} />;
    }

    return (
        <Card title={props.name} titleActive={tab === 'report'} tabs={tabs} onTitleClick={() => setTab('report')} expanded={expanded}>
            {content}
        </Card>
    );
}
