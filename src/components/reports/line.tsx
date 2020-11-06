import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ChartReportProps } from './ReportProps'
import { recordToNative, useReportResults } from '../../utils'
import Loading from '../Loading'

const MyResponsiveLine = ({ data, config }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 24, right: 24, bottom: 38, left: 24 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="cardinal"
        yFormat=" >-.0r"
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 6,
            tickPadding: 12,
            tickRotation: 0,
        }}
        axisLeft={null}
        pointSize={10}
        pointColor="white"
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'right-to-left',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 6,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}

        {...config}
    />
)

interface LineChartData {
    id: string;
    data: Record<any, any>[]
}

export default function LineReport(props: ChartReportProps) {
    const { loading, error, records, first } = useReportResults(props)

    if ( loading ) {
        return <Loading />
    }
    else if ( error ) {
        return <div className="font-bold text-red-600">{error.message}</div>
    }
    else if ( !records?.length ) {
        return <div className="font-bold text-green-600">No results</div>
    }

    const label = first!.keys[0]
    const keys = first!.keys.slice(1)

    const data: LineChartData[] = keys.map(key => ({
        // TODO: colour
        id: key,
        data: []
    }))

    records.forEach((row) => {
        keys.forEach(key => {
            const index = data.findIndex(item => (item as Record<string, any>).id === key)
            const x: string | number = recordToNative(row.get(label)) || 0
            const y: any = recordToNative(row.get(key)) || 0

            data[ index ].data.push({ x, y })
        })
    })

    return (
        <div className="h-full w-full overflow-hidden">
            <MyResponsiveLine data={data} config={props.config || {}} />
        </div>

    )
}