import React from 'react'

import ReportProps from './ReportProps';

export default function MetricReport(props: ReportProps) {
    const { first } = props

    const key: string = first!.keys[0] as string
    let number = first!.get(key)

    if ( typeof number.toNumber === 'function' ) number = number.toNumber()

    const count = <span style={{fontSize: '6em'}}>{number}</span>

    return (
        <div className="text-blue-600 leading-none pt-2">
            {count}
        </div>
    )
}