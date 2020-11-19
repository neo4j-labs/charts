import React from 'react'
import { ResponsiveSankey, SankeyDataNode } from '@nivo/sankey'
import { recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'

export default function SankeyReport(props: ChartReportProps) {
    const { records, } = props

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

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveSankey
                data={{ nodes, links }}
                margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
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