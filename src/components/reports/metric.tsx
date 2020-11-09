import React from 'react'

import { useReportResults } from '../../utils';
import ReportProps from './ReportProps';

function Loading() {
    return (
        <div className="flex-grow bg-blue-100"></div>
    )
}

export default function MetricReport(props: ReportProps) {
    const { loading, error, first } = useReportResults(props)

    if ( loading ) {
        return <Loading />
    }

    let count

    if ( error ) {
        count = <div className="font-bold text-red-600">{error.message}</div>
    }
    else {
        try {
            const key: string = first!.keys[0]
            let number = first!.get(key)

            if ( typeof number.toNumber === 'function' ) number = number.toNumber()

            count = <span style={{fontSize: '6em'}}>{number}</span>
        }
        catch (e) {
            count = <div className="font-bold text-red-600">{e.message}</div>
        }
    }

    return (
        <div className="text-blue-600 leading-none pt-2">

            {count}

        </div>
    )


}