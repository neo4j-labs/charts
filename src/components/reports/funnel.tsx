import React from 'react'
import { ResponsiveFunnel } from '@nivo/funnel'
import { ChartReportProps } from './ReportProps'
import { useReportResults, recordToNative } from '../../utils'
import Loading from '../Loading'

export default function FunnelReport(props: ChartReportProps) {
    const { loading, error, records, } = useReportResults(props)

    if ( loading ) {
        return <Loading />
    }
    else if ( error ) {
        return <div className="font-bold text-red-600">{error.message}</div>
    }
    else if ( !records?.length ) {
        return <div className="font-bold text-green-600">No results</div>
    }

    const data = records.map(row => ({
        id: recordToNative(row.get('id')),
        value:  recordToNative(row.get('value')),
        label: recordToNative(row.get('label')),
    }))

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveFunnel
                data={data}
                margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                direction={props.layout || 'vertical'}
                colors={{ scheme: 'spectral' }}
                borderWidth={20}
                labelColor={{ from: 'color', modifiers: [ [ 'darker', 3 ] ] }}
                beforeSeparatorLength={24}
                beforeSeparatorOffset={20}
                afterSeparatorLength={24}
                afterSeparatorOffset={20}
                currentPartSizeExtension={10}
                currentBorderWidth={30}
                {...props.config}
            />
        </div>
    )
}