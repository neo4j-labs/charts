import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ChartReportProps } from './ReportProps'
import { checkResultKeys, recordToNative } from '../../utils'
import ReportError from './error'
import Loading from '../Loading'

export default function BarReport(props: ChartReportProps) {
    const { records, first } = props

    if ( !first ) {
        return <Loading />
    }

    const error = checkResultKeys(first, ['index', 'key', 'value'])

    if ( error !== false ) {
        return <ReportError error={error} />
    }

    const keys: string[] = []

    const data: Record<string, any>[] = records.reduce((data: Record<string, any>[], row: Record<string, any>) => {
        const index = recordToNative(row.get('index'))
        const idx = data.findIndex(item => item.index === index)

        const key = recordToNative(row.get('key'))
        const value = recordToNative(row.get('value'))

        if ( !keys.includes(key) ) {
            keys.push(key)
        }

        if ( idx > -1 ) {
            data[ idx ][ key ] = value
        }
        else {
            data.push({ index, [key]: value  })
        }

        return data
    }, [])
        .map(row => {
            keys.forEach(key => {
                if ( !row.hasOwnProperty(key) ) {
                    row[ key ] = 0
                }
            })

            return row
        })

    return <ResponsiveBar
        layout={props.layout}
        groupMode={props.stacked ? 'stacked' : 'grouped'}
        data={data}
        keys={keys}
        indexBy="index"
        margin={{ top: 24, right: 128, bottom: 38, left: 36 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'right-to-left',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}

        {...props.config}
    />

}