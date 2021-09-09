import { dispatch } from 'd3';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReadCypher } from 'use-neo4j';
import { init } from '../../store/actions';
import Button from '../forms/button';
import Modal from '../modal';

interface ImportFromNeo4jProps {
    onClose: () => void;
}

export default function ImportFromNeo4j(props: ImportFromNeo4jProps) {
    const { loading, first, error } = useReadCypher(`MATCH (c:_Charts) RETURN c`)
    const dispatch = useDispatch()

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex flex-col justify-center z-20">
                Loading configuration...
            </div>
        )
    }

    if (!loading && !first) {
        return (
            <Modal title="Import from Neo4j" onClose={props.onClose}>
                <div className="mb-12">
                    <p className="mb-4">
                        We couldn't find a dashboard layout in the current database.
                    </p>
                    <p className="mb-4">
                        A configration would be stored in a <code>(:_Charts)</code> node.
                    </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-400">
                    <Button size="md" colour="red" text='Close' onClick={props.onClose} />
                </div>
            </Modal>
        )
    }

    const onButtonClick = () => {
        const object = JSON.parse(first!.get('c').properties.config)

        const {
            dashboards = [],
            reports =  [],
            queries = [],
        } = object

        dispatch(init(dashboards, reports, queries))

        props.onClose()
    }

    return (
        <Modal title="Import from Neo4j" onClose={props.onClose}>
            <div className="mb-12">
                <p className="mb-4">
                    Are you sure you want to load a new layout from the<br />
                    <code>(:_Charts)</code> node
                    in the current database?
                </p>
                <p className="mb-4">
                    This will override the current layout and any queries.
                </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-400">
                <Button size="md" colour="blue" text='Load from current connection' onClick={onButtonClick} />
                {' '}
                <Button size="md" colour="red" text='Close' onClick={props.onClose} />
            </div>
        </Modal>
    )
}