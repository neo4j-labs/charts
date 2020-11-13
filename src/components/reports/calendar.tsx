import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import Loading from '../Loading'
import { useReportResults, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'

export default function CalendarReport(props: ChartReportProps) {
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

    try {
        const data = records.map(row => ({
            day: row.get('day').toString(),
            value: recordToNative(row.get('value')),
        })).sort((a, b) => a.day < b.day ? -1 : 1)

        const from = data[0].day
        const to = data[ data.length - 1].day

        return (
            <div className="h-full w-full overflow-hidden">
                <ResponsiveCalendar
                    data={data}
                    from={from}
                    to={to}
                    margin={{ top: 12, right: 24, bottom: 12, left: 24 }}
                    monthBorderColor="#ffffff"
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                />
            </div>
        )
    }
    catch (error) {
        return <div className="font-bold text-red-600">{error.message}</div>
    }
}