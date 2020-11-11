import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { ChartReportProps } from './ReportProps'
import { recordToNative, useReportResults } from '../../utils'
import Loading from '../Loading'

const MyResponsiveRadar = ({ data, keys, config }) => (
    <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy="index"
        maxValue="auto"
        margin={{ top: 24, right: 12, bottom: 24, left: 48 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}

        isInteractive={true}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -48,
                translateY: -12,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        {...config}
    />
)

export default function RadarReport(props: ChartReportProps) {
    const { loading, error, records, first } = useReportResults(props)

    if ( loading ) {
        return <Loading />
    }
    else if ( error ) {
        return <div className="font-bold text-red-600">{error.message}</div>
    }
    else if ( !first ) {
        return <div className="font-bold text-green-600">No results</div>
    }

    const keys: string[] = []

    const data: Record<string, any>[] = records!.reduce((data: Record<string, any>[], row: Record<string, any>) => {
        if ( !row.has('index') ) return data;
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

    return (
        <MyResponsiveRadar data={data} keys={keys} config={props.config} />
    )
}