import React from 'react'
import { ResponsiveScatterPlot, Serie } from '@nivo/scatterplot'
import { ChartReportProps } from './ReportProps'
import { recordToNative } from '../../utils'

export default function ScatterPlotReport(props: ChartReportProps) {
    const { records } = props

    const data: Serie[] = records.map(row => ({
        id: recordToNative(row.get('id')),
        x:  recordToNative(row.get('x')),
        y: recordToNative(row.get('y')),
    }))
        .reduce((acc: Serie[], row: Record<string, any>) => {
            const index = acc.findIndex(item => item.id === row.id)

            if ( index === -1 ) {
                return acc.concat({
                    id: row.id,
                    data: [ { x: row.x, y: row.y } ]
                }) as Serie[]
            }

            acc[ index ].data.push({ x: row.x, y: row.y })

            acc[ index ].data.sort((a, b) => a.x > b.x ? -1 : 1)

            return acc as Serie[]
        }, [] as Serie[])

    console.log(data);


    return (
        <ResponsiveScatterPlot
            data={data}
            margin={{ top: 24, right: 24, bottom: 38, left: 32 }}

            {...props.config}
        />
    )
}