import React from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { checkResultKeys, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'
import ReportError from './error'
import Loading from '../Loading'

export default function BubbleReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['from', 'to', 'value'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

    const hierarchy = records.reduce((hierarchy: Record<string, any>[], row: Record<string, any>) => {
        const from = recordToNative(row.get('from'))
        const to = recordToNative(row.get('to'))
        const value = recordToNative(row.get('value')) || 1
        const color = row.keys.includes('color') || 'red'
            ? recordToNative(row.get('value'))
            : null

        const fromIndex = hierarchy.findIndex(row => (row as Record<string, any>).id === from)
        const toIndex = hierarchy.findIndex(row => (row as Record<string, any>).id === to)

        // Append 'from' node and children to the hierarchy
        if ( fromIndex === -1 ) {
            return hierarchy.concat({
                parent: null,
                id: from,
                value,
                color,
                children: [
                    to
                ]
            })
        }

        // Append 'to' node to hierarchy
        if ( toIndex === -1 ) {
            hierarchy = hierarchy.concat({
                id: to,
                value,
                color,
                parent: from,
                children: []
            })
        }

        // Push the child into the hierarchy
        hierarchy[ fromIndex ].children.push(to)

        return hierarchy
    }, [])


    const buildTree = id => {
        if ( !id ) return {}
        const node = hierarchy.find(row => row.id === id)

        if ( !node ) {
            return { id }
        }

        return {
            id: node?.id,
            name: node?.id,
            value: node?.value,
            color: node?.color,
            children: node?.children?.map(child => buildTree(child))
        }
}

    const rootNode = hierarchy.find(node => node.parent === null)
    const root = buildTree(rootNode!.id)

    return (
        <div className="h-full w-full overflow-hidden">
            <ResponsiveBubble
                root={root}
                margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
                identity="id"
                value="value"
                colors={{ scheme: 'nivo' }}
                padding={6}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
                borderWidth={1}
                borderColor={{ from: 'color' }}
                fill={[ { match: { depth: 1 }, id: 'lines' } ]}
                animate={true}
                motionStiffness={90}
                motionDamping={12}
            />
        </div>
    )

}