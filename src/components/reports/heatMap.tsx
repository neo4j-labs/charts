import { ResponsiveHeatMap } from '@nivo/heatmap';
import React from 'react'
import { recordToNative, useReportResults } from '../../utils';
import Loading from '../Loading';
import { ChartReportProps } from './ReportProps';

export default function HeatMap(props: ChartReportProps) {
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
        <ResponsiveHeatMap
            data={data}
            keys={keys}
            indexBy="index"
            margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
            axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
        />
    )
}