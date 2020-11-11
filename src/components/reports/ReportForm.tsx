import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { reportSources, reportTypes, getHint } from '../../constants';
import Button from '../forms/button';


export default function ReportForm({ dashboard, report, submitText, onSubmit }) {
    const queries = useSelector((state: RootState) => state.queries);

    const [name, setName] = useState<string>(report.name || '');
    const [columns, setColumns] = useState<number>(report.columns || 1);
    const [type, setType] = useState<string>(report.type || reportTypes[0].value);
    const [source, setSource] = useState<string>(report.source || reportSources[0].value);
    const [query, setQuery] = useState<string>(report.query || '');
    const [database, setDatabase] = useState<string>(report.database || '');

    const handleSubmit = () => {
        // Validate Query Type
        if (name === '' || query === '' || (source === 'query' && !queries.find(q => q.id === query))) {
            console.log('invalid payload');
            return;
        }

        onSubmit(dashboard, name, database, type, source, query, columns);
    };

    return (
        <form className="pr-2">
            <div>
                <label htmlFor="name" className="block font-bold m-2">Name</label>
                <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="type" className="block font-bold m-2">Type</label>
                <select className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="type" value={type} onChange={e => setType(e.target.value)}>
                    {reportTypes.map(type => <option key={type.key} value={type.value}>{type.text}</option>)}
                </select>

                <div className="p-2 mb-2 text-gray-600 text-sm">{getHint(type)}</div>
            </div>
            <div>
                <label htmlFor="database" className="block font-bold m-2">Database</label>
                <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="database" type="text" placeholder="(Default database)" value={database} onChange={e => setDatabase(e.target.value)} />
                <div className="p-2 mb-2 text-gray-600 text-sm">Leave blank to use the default database.</div>
            </div>
            <div>
                <label htmlFor="columns" className="block font-bold m-2">Columns</label>
                <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="columns" type="number" min={1} max={4} value={columns} onChange={e => setColumns(parseInt(e.target.value))} />
            </div>
            <div>
                <label htmlFor="source" className="block font-bold m-2">source</label>
                <select className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" id="source" value={source} onChange={e => setSource(e.target.value)}>
                    {reportSources.map(source => <option key={source.key} value={source.value}>{source.text}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="query" className="block font-bold m-2">query</label>
                {source === 'cypher' && <textarea className="w-full rounded-sm p-2 border border-gray-400 bg-white text-gray-600 font-mono focus:outline-none focus:border-blue-600" id="query" rows={8} value={query} onChange={e => setQuery(e.target.value)} />}
                {source === 'query' && <select className="w-full rounded-sm p-2 border border-gray-400 bg-white text-gray-600" value={query} onChange={e => setQuery(e.target.value)}>
                    <option></option>
                    {queries.map(query => <option key={query.id} value={query.id}>{query.name}</option>)}
                </select>}
                {source === 'query' && queries.find(q => query === q.id) && <Link className="mt-2 px-2 text-xs text-blue-600" to={`/queries/${query}`}>Edit Query</Link>}
            </div>

            <div className="mt-4">
                <Button onClick={handleSubmit} text={submitText} />
            </div>
        </form>
    );
}
