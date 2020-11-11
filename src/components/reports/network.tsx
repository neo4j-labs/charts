import React from 'react'
import { ResponsiveNetwork } from '@nivo/network'
import Loading from '../Loading'
import { useReportResults, recordToNative } from '../../utils'
import { ChartReportProps } from './ReportProps'
// import {
//     colorSchemes
//  } from '@nivo/colors'

export default function NetworkReport(props: ChartReportProps) {
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


    // const data = { nodes, links }

    const data = {
        "nodes": [
          {
            "id": "1",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "2",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "3",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "4",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "5",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "6",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "7",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "8",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "9",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "10",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "11",
            "radius": 8,
            "depth": 1,
            "color": "rgb(97, 205, 187)"
          },
          {
            "id": "0",
            "radius": 12,
            "depth": 0,
            "color": "rgb(244, 117, 96)"
          },
          {
            "id": "1.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.9",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.10",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.11",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.12",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "1.13",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "2.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "2.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "2.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "2.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "2.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "2.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "3.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "3.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "3.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "3.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "3.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "3.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "4.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.9",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.10",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "5.11",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.9",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.10",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "6.11",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "7.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "8.9",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.9",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.10",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.11",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.12",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.13",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "9.14",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "10.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "10.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "10.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "10.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.0",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.1",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.2",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.3",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.4",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.5",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.6",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.7",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          },
          {
            "id": "11.8",
            "radius": 4,
            "depth": 2,
            "color": "rgb(232, 193, 160)"
          }
        ],
        "links": [
          {
            "source": "0",
            "target": "1",
            "distance": 50
          },
          {
            "source": "1",
            "target": "1.0",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.1",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.2",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.3",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.4",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.5",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.6",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.7",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.8",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.9",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.10",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.11",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.12",
            "distance": 30
          },
          {
            "source": "1",
            "target": "1.13",
            "distance": 30
          },
          {
            "source": "0",
            "target": "2",
            "distance": 50
          },
          {
            "source": "2",
            "target": "2.0",
            "distance": 30
          },
          {
            "source": "2",
            "target": "2.1",
            "distance": 30
          },
          {
            "source": "2",
            "target": "2.2",
            "distance": 30
          },
          {
            "source": "2",
            "target": "2.3",
            "distance": 30
          },
          {
            "source": "2",
            "target": "2.4",
            "distance": 30
          },
          {
            "source": "2",
            "target": "2.5",
            "distance": 30
          },
          {
            "source": "0",
            "target": "3",
            "distance": 50
          },
          {
            "source": "3",
            "target": "2",
            "distance": 70
          },
          {
            "source": "3",
            "target": "4",
            "distance": 70
          },
          {
            "source": "3",
            "target": "3.0",
            "distance": 30
          },
          {
            "source": "3",
            "target": "3.1",
            "distance": 30
          },
          {
            "source": "3",
            "target": "3.2",
            "distance": 30
          },
          {
            "source": "3",
            "target": "3.3",
            "distance": 30
          },
          {
            "source": "3",
            "target": "3.4",
            "distance": 30
          },
          {
            "source": "3",
            "target": "3.5",
            "distance": 30
          },
          {
            "source": "0",
            "target": "4",
            "distance": 50
          },
          {
            "source": "4",
            "target": "11",
            "distance": 70
          },
          {
            "source": "4",
            "target": "4.0",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.1",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.2",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.3",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.4",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.5",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.6",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.7",
            "distance": 30
          },
          {
            "source": "4",
            "target": "4.8",
            "distance": 30
          },
          {
            "source": "0",
            "target": "5",
            "distance": 50
          },
          {
            "source": "5",
            "target": "5.0",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.1",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.2",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.3",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.4",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.5",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.6",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.7",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.8",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.9",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.10",
            "distance": 30
          },
          {
            "source": "5",
            "target": "5.11",
            "distance": 30
          },
          {
            "source": "0",
            "target": "6",
            "distance": 50
          },
          {
            "source": "6",
            "target": "2",
            "distance": 70
          },
          {
            "source": "6",
            "target": "7",
            "distance": 70
          },
          {
            "source": "6",
            "target": "9",
            "distance": 70
          },
          {
            "source": "6",
            "target": "6.0",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.1",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.2",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.3",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.4",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.5",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.6",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.7",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.8",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.9",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.10",
            "distance": 30
          },
          {
            "source": "6",
            "target": "6.11",
            "distance": 30
          },
          {
            "source": "0",
            "target": "7",
            "distance": 50
          },
          {
            "source": "7",
            "target": "7.0",
            "distance": 30
          },
          {
            "source": "7",
            "target": "7.1",
            "distance": 30
          },
          {
            "source": "7",
            "target": "7.2",
            "distance": 30
          },
          {
            "source": "7",
            "target": "7.3",
            "distance": 30
          },
          {
            "source": "7",
            "target": "7.4",
            "distance": 30
          },
          {
            "source": "7",
            "target": "7.5",
            "distance": 30
          },
          {
            "source": "7",
            "target": "7.6",
            "distance": 30
          },
          {
            "source": "0",
            "target": "8",
            "distance": 50
          },
          {
            "source": "8",
            "target": "9",
            "distance": 70
          },
          {
            "source": "8",
            "target": "8.0",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.1",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.2",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.3",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.4",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.5",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.6",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.7",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.8",
            "distance": 30
          },
          {
            "source": "8",
            "target": "8.9",
            "distance": 30
          },
          {
            "source": "0",
            "target": "9",
            "distance": 50
          },
          {
            "source": "9",
            "target": "9.0",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.1",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.2",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.3",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.4",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.5",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.6",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.7",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.8",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.9",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.10",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.11",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.12",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.13",
            "distance": 30
          },
          {
            "source": "9",
            "target": "9.14",
            "distance": 30
          },
          {
            "source": "0",
            "target": "10",
            "distance": 50
          },
          {
            "source": "10",
            "target": "10.0",
            "distance": 30
          },
          {
            "source": "10",
            "target": "10.1",
            "distance": 30
          },
          {
            "source": "10",
            "target": "10.2",
            "distance": 30
          },
          {
            "source": "10",
            "target": "10.3",
            "distance": 30
          },
          {
            "source": "0",
            "target": "11",
            "distance": 50
          },
          {
            "source": "11",
            "target": "11.0",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.1",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.2",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.3",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.4",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.5",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.6",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.7",
            "distance": 30
          },
          {
            "source": "11",
            "target": "11.8",
            "distance": 30
          }
        ]
      }


    return (
        // <pre>{JSON.stringify(data, null, 2)}</pre>
        <div className="h-full w-full overflow-hidden">
            <ResponsiveNetwork
                // nodes={data.nodes}
                // links={data.links}

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