import React from 'react';
import Graph from '../Graph';
import InitialNodeSelector from './InitialNodeSelector';
import Toolbar from './Toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import QueryHeader from './Header';

export default function QueryEditorForm({ labels, types }) {
    const nodes = useSelector((state: RootState) => state.currentQuery.nodes);
    const selected = useSelector((state: RootState) => state.currentQuery.selected);

    let graph = <InitialNodeSelector labels={labels} />;

    if (nodes.length) {
        graph = <Graph />;
    }

    return (
        <div className="query-stage flex flex-col w-full h-full">
            <QueryHeader />

            <div className="query-stage flex flex-grow-1 h-full flex-row bg-gray-100">
                {graph}

                {selected && <Toolbar labels={labels} types={types} />}
            </div>
        </div>
    );
}
