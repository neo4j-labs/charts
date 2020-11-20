import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import ReportProps from './ReportProps';
import { recordToNative } from '../../utils';

export default function StreamReport(props: ReportProps) {
    const { records, first } = props

    const keys = first!.keys
    const data = records.map(row => Object.fromEntries(row.keys.map(key => [ key, recordToNative(row.get(key)) ])))

    return (
        <ResponsiveStream
            data={data}
            keys={keys}
            margin={{top: 24, left: 0, right: 0, bottom: 24}}
            axisBottom={null}
        />
    )
}