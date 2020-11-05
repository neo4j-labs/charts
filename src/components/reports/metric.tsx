
import React from 'react'
import { useSelector } from 'react-redux';
import { useReadCypher } from "use-neo4j";
import { RootState } from '../../store';
import { queryToCypher } from '../../utils';

interface MetricReportProps {
    query: string;
    source: string;
}


function Loading() {
    return (
        <div className="flex-grow bg-blue-100"></div>
    )
}

export default function MetricReport(props: MetricReportProps) {
    const queries = useSelector((state: RootState) => state.queries)

    let cypher = props.query
    let params = {}

    if ( props.source === 'query' ) {
        const output = queryToCypher(queries.find(query => query.id === props.query))

        cypher = output.cypher
        params = output.params
    }

    const { loading, error, first } = useReadCypher(cypher, params)


    if ( loading ) {
        return <Loading />
    }

    let count

    if ( error ) {
        count = <div className="font-bold text-red-600">{error.message}</div>
    }
    else {
        try {
            let number = first!.get('count')

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