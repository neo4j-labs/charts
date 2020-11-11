import React from 'react'
import { ResponsiveChord } from '@nivo/chord'
import Loading from '../Loading'
import { useReportResults, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'

export default function ChordReport(props: ChartReportProps) {
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

    const data = records.reduce((acc: Record<string, any>[], row: Record<string, any>) => {
        const from = recordToNative(row.get('from'))
        const to = recordToNative(row.get('to'))
        const value = recordToNative(row.get('value'))

        const fromIndex = acc.findIndex(row => (row as Record<string, any>).id === from)
        const toIndex = acc.findIndex(row => (row as Record<string, any>).id === from)

        if ( toIndex === -1 ) {
            acc.concat({
                id: to,
                amounts: []
            })
        }

        if ( fromIndex === -1 ) {
            return acc.concat({
                id: from,
                amounts: [
                    { to, value }
                ]
            })
        }

        acc[ fromIndex ].amounts.push({ to, value })

        return acc

    }, [])

    const keys = data.map(data => data.id)

    const matrix = data.map(from => {
        return keys.map(key => from.amounts.find(row => row.to === key)?.value || 0)
    })

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveChord
                layers={['ribbons', 'arcs']}
                matrix={matrix}
                keys={keys}
                margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
                valueFormat=".2f"
                padAngle={0.02}
                innerRadiusRatio={0.96}
                innerRadiusOffset={0.02}
                arcOpacity={1}
                arcBorderWidth={1}
                arcBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
                ribbonOpacity={0.5}
                ribbonBorderWidth={1}
                enableLabel={true}
                label="id"
                labelOffset={12}
                labelRotation={-90}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
                colors={{ scheme: 'nivo' }}
                isInteractive={true}
                arcHoverOpacity={1}
                arcHoverOthersOpacity={0.25}
                ribbonHoverOpacity={0.75}
                ribbonHoverOthersOpacity={0.25}
                animate={true}
                motionStiffness={90}
                motionDamping={7}
            />
        </div>
    )

}