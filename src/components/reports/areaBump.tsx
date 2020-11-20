import React from 'react'
import { AreaBumpInputSerie, ResponsiveAreaBump } from '@nivo/bump'
import { ChartReportProps } from './ReportProps'
import { checkResultKeys, recordToNative } from '../../utils'
import ReportError from './error'
import Loading from '../Loading'

export default function AreaBumpReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['id', 'x', 'y'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

    const data: AreaBumpInputSerie[] = records.map(row => ({
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
                }) as AreaBumpInputSerie[]
            }

            acc[ index ].data.push({ x: row.x, y: row.y })

            acc[ index ].data.sort((a, b) => a.x > b.x ? -1 : 1)

            return acc as AreaBumpInputSerie[]
        }, [] as AreaBumpInputSerie[])

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveAreaBump
                data={data}
                margin={{ top: 32, right: 100, bottom: 32, left: 24 }}
            />
        </div>
    )
}