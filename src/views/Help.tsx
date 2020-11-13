import React from 'react'
import Card from '../components/card'
import Header from '../components/header'

import { reportTypes, TYPE_HORIZONTAL_BAR, TYPE_HORIZONTAL_FUNNEL, TYPE_HORIZONTAL_STACKED_BAR, TYPE_STACKED_BAR, } from '../constants'

function ExampleReport(report) {
    let example: any = undefined

    const componentProps = { source: 'cypher', query: report.previewQuery }

    switch (report.value) {
        // case TYPE_METRIC:
        //     example = <MetricReport source="cypher" query={report.previewQuery} />
        //     break;
        // case TYPE_TABLE:
        //     example = <MetricTable source="cypher" query={report.previewQuery} />
        //     break;

        case TYPE_STACKED_BAR:
            example = report.component({ ...componentProps, stacked: true })
            break;

        case TYPE_HORIZONTAL_STACKED_BAR:
            example = report.component({ ...componentProps, layout: 'horizontal', stacked: true })
            break;

        case TYPE_HORIZONTAL_BAR:
            example = report.component({ ...componentProps, layout: 'horizontal' })
            break;

        case TYPE_HORIZONTAL_FUNNEL:
            example = report.component({ ...componentProps, layout: 'horizontal' })
            break;

        default:
            // @ts-ignore
            example = report.previewQuery ?  report.component(componentProps)
                : 'Preview coming soon...'
            break;
    }



    return (
        <div className="flex mb-12">
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-2">
                <h3 className="text-lg font-bold pb-4 flex-grow-0">{report.text}</h3>
                <div className="flex flex-grow-0">
                    {report.hint}
                 </div>

                 {report.exampleQuery && <div className="mt-8">
                    <div className="font-xs text-gray-500 font-bold mb-2">Example Query:</div>
                    <pre className="flex-grow-0 border-t border-gray-400 pt-2 text-sm rounded-md bg-gray-100 text-gray-6600">{report.exampleQuery}</pre>
                 </div>}
                 <div className="flex-grow"></div>
            </div>

            <div className="w-full lg:w-1/2 p-2 pb-0">
                <Card
                    title={report.text}
                >
                    {example}
                </Card>
            </div>

        </div>
    )
}

export default function Help() {

    return (
        <div className="flex flex-col w-full">
            <Header
                sectionLink="/help"
                sectionText="Help"
            />

            <div className="container mx-auto pb-16 text-gray-800">
                <div className="p-8">
                    <h2 className="font-bold text-gray-800 mb-4 px-2" style={{fontSize: '2rem'}}>Getting Started</h2>
                </div>

                <div className="p-8">
                    <h2 className="font-bold text-gray-800 mb-12 border-b border-gray-400 pb-4 px-2" style={{fontSize: '1.4rem'}}>Report Types</h2>

                    {reportTypes.map(report => <ExampleReport key={report.value}  {...report} />)}


                </div>
            </div>
        </div>
    )
}