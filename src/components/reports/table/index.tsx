import React from "react"
import { useSelector } from "react-redux";
import { useReadCypher } from "use-neo4j"
import { RootState } from "../../../store";
import { Query } from "../../../store/actions";
import { Source } from "../../../store/reducers/dashboards";
import { queryToCypher } from "../../../utils";
import Loading from "../../Loading"


interface MetricTableProps {
    source: Source;
    query: string;
    params?: Record<string, any>;
}
export default function MetricTable(props: MetricTableProps) {
    let { source, query, params } = props;
    const tree = useSelector((state: RootState) => state.queries.find(q => q.id === query))

    if ( source === 'query' ) {
        const output = queryToCypher(tree as Query)

        query = output.cypher
        params = output.params
    }

    const { error, loading, records, first } = useReadCypher(query, params)

    if (error) {
        return <div className="font-bold text-red-600">{error.message}</div>
    }
    else if ( loading || !first) {
        return  <Loading />
    }

    else if (records && !records.length) {
        return <div>No results found.</div>
    }

    return (
        <table>
            <thead>
                <tr className="bg-gray-100">
                    {first && first!.keys.map(key => <th className="px-2 py-4 text-left" key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {records!.map((row, index) => <tr>
                    {row.keys.map(key => <td className="px-2 py-4 text-left" key={key + index}>{ row.get(key)?.toString() }</td>)}
                </tr>)}
            </tbody>
        </table>
    )
}