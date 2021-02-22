import React from 'react'
import { ResponsiveSankey, SankeyDataNode } from '@nivo/sankey'
import { checkResultKeys, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'
import ReportError from './error'
import Loading from '../Loading'

export default function SankeyReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['from', 'to', 'value'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

    const nodes: SankeyDataNode[] = records.reduce((acc: SankeyDataNode[], row) => {
        const from = recordToNative(row.get('from'))
        const to = recordToNative(row.get('to'))

        if ( acc.findIndex(row => row.id === from) === -1 ) {
            acc = acc.concat({
                id: from,
            })
        }

        if ( acc.findIndex(row => row.id === to) === -1 ) {
            acc = acc.concat({
                id: to,
            })
        }

        return acc
    }, [])


    const links = records.map((row) => ({
        source: recordToNative(row.get('from')),
        target: recordToNative(row.get('to')),
        value: recordToNative(row.get('value'))
    }), [])
        .filter(row => row.source !== row.target)

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveSankey
                data={{ nodes, links }}
                margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
                animate={false}
                align="justify"
                // @ts-ignore
                layout={props.layout || 'horizontal'}

                nodeOpacity={1}
                nodeThickness={8}
                nodeInnerPadding={0}
                nodeSpacing={4}
                nodeBorderWidth={0}
                nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
                linkOpacity={0.5}
                linkHoverOthersOpacity={0.1}
                enableLinkGradient={true}
                labelPosition="inside"
                labelOrientation="vertical"
                labelPadding={8}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
            />
        </div>
    )

}