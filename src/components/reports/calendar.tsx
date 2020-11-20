import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { checkResultKeys, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'
import Loading from '../Loading'
import ReportError from './error'

export default function CalendarReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['day', 'value'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

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