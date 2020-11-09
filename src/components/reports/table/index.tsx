import React from "react"
import { Source } from "../../../store/reducers/dashboards";
import { useReportResults } from "../../../utils";
import Loading from "../../Loading"


interface MetricTableProps {
    database?: string;
    source: Source;
    query: string;
    params?: Record<string, any>;
}
export default function MetricTable(props: MetricTableProps) {
    const { error, loading, records, first } = useReportResults(props)

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
                {records!.map((row, index) => <tr key={index}>
                    {row.keys.map(key => <td className="px-2 py-4 text-left" key={key + index}>{ row.get(key)?.toString() }</td>)}
                </tr>)}
            </tbody>
        </table>
    )
}