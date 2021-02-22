import React from 'react'
import { ResponsiveNetwork } from '@nivo/network'
import { checkResultKeys, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'
import ReportError from './error'
import Loading from '../Loading'

export default function NetworkReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['from', 'to'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

    const nodes = records.reduce((acc: Record<string, any>[], row) => {
        const from = recordToNative(row.get('from'))
        const to = recordToNative(row.get('to'))

        if ( acc.findIndex(row => row.id === from) === -1 ) {
            acc = acc.concat({
                id: from,
                radius: 10,
                depth: 1,
                color: "rgb(97, 205, 187)"
            })
        }

        if ( acc.findIndex(row => row.id === to) === -1 ) {
            acc = acc.concat({
                id: to,
                radius: 10,
                depth: 1,
                color: "rgb(97, 205, 187)"
            })
        }

        return acc
    }, [])


    const links = records.map((row) => ({
        source: recordToNative(row.get('from')),
        target: recordToNative(row.get('to')),
        // distance: recordToNative(row.get('distance'))
    }), [])


    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveNetwork
                // @ts-ignore
                nodes={nodes}
                links={links}
                // margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                repulsivity={6}
                iterations={60}
                nodeColor={function(e){return e.color || 'rgba(215, 100, 69, 1)'}}
                nodeBorderWidth={1}
                nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
                // // linkThickness={function(e){return Math.max(2*(2-e.source.depth), 1)}}
                // linkThickness={2}
                motionStiffness={160}
                motionDamping={12}
                distanceMin={10}
                distanceMax={50}
            />
        </div>
    )

}