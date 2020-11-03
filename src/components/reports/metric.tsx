
import React from 'react'
import { useReadCypher } from "use-neo4j";
interface MetricReportProps {
    query: string;
}


function Loading() {
    return (
        <div className="flex-grow bg-blue-100"></div>
    )
}

export default function MetricReport(props: MetricReportProps) {
    const { loading, first } = useReadCypher(props.query)

    if ( loading ) {
        return <Loading />
    }


    let count

    try {
        let number = first!.get('count')

        if ( typeof number.toNumber === 'function' ) number = number.toNumber()

        count = <span style={{fontSize: '6em'}}>{number}</span>
    }
    catch (e) {
        count = <div className="font-bold text-red-600">{e.message}</div>
    }

    return (
        <div className="text-blue-600 leading-none pt-2">

            {count}

        </div>
    )


}