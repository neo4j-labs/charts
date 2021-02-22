import React from "react"
import ReportProps from "../ReportProps";

export default function TableReport(props: ReportProps) {
    const { records, first } = props

    return (
        <table>
            <thead>
                <tr className="bg-gray-100">
                    {first && first!.keys.map(key => <th className="px-2 py-4 text-left" key={key as string}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {records!.map((row, index) => <tr key={index}>
                    {row.keys.map(key => <td className="px-2 py-4 text-left" key={(key as string)+ index}>{ row.get(key)?.toString() }</td>)}
                </tr>)}
            </tbody>
        </table>
    )
}