import React from 'react'
import { BumpInputSerie, ResponsiveBump } from '@nivo/bump'
import { ChartReportProps } from './ReportProps'
import { checkResultKeys, recordToNative } from '../../utils'
import ReportError from './error'
import Loading from '../Loading'

export default function BumpReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['id', 'x', 'y'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }


    const data: BumpInputSerie[] = records.map(row => ({
        id: recordToNative(row.get('id')),
        x:  recordToNative(row.get('x')),
        y: recordToNative(row.get('y')),
    }))
        .reduce((acc: Record<string, any>[], row: Record<string, any>) => {
            const index = acc.findIndex(item => item.id === row.id)

            if ( index === -1 ) {
                return acc.concat({
                    id: row.id,
                    data: [ { x: row.x, y: row.y } ]
                }) as BumpInputSerie[]
            }

            acc[ index ].data.push({ x: row.x, y: row.y })

            acc[ index ].data.sort((a, b) => a.x > b.x ? -1 : 1)

            return acc as BumpInputSerie[]
        }, [] as BumpInputSerie[])

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveBump
                data={data}
                margin={{ top: 32, right: 100, bottom: 32, left: 12 }}
                colors={{ scheme: 'spectral' }}

                pointSize={10}
                activePointSize={16}
                inactivePointSize={0}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={3}
                activePointBorderWidth={3}
                pointBorderColor={{ from: 'serie.color' }}
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -36
                }}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={null}
            />
        </div>
    )
}