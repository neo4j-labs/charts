import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { useLazyWriteCypher } from 'use-neo4j';
import Button from '../forms/button';
import Modal from "../modal";

interface ExportToNeo4jProps {
    onClose: () => void;
}

export default function ExportToNeo4j(props: ExportToNeo4jProps) {
    const [ confirmation, setConfirmation ] = useState<string>()
    const [ started, setStarted ] = useState<boolean>(false)
    const [ save, { loading, error } ] = useLazyWriteCypher(`MERGE (c:_Charts) SET c.config = $json`)
    const [ isSaving, setIsSaving ] = useState<boolean>(false)

    const { getState } = useStore()

    const onButtonClick = () => {
        const { dashboards, queries } = getState()

        const json = JSON.stringify({ ...dashboards, queries })

        setStarted(true)

        save({ json })
    }

    useEffect(() => {
        setIsSaving(loading)

        if ( started && !loading && !error ) {
            setConfirmation('Dashboard saved!')
        }
        else {
            setConfirmation(undefined)
        }
    }, [ loading ])

    return (
        <Modal title="Save to Neo4j" onClose={props.onClose}>
            <div className="mb-12">
            <p className="mb-4">
                Are you sure you want to save the current layout to Neo4j?
            </p>
            <p className="mb-4">
                This will create or overwrite a node in the current graph with a label <code>_Charts</code>.
            </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-400">
                <Button size="md" colour="blue" text='Save to Neo4j' onClick={onButtonClick} disabled={isSaving} />
                {' '}
                <Button size="md" colour="red" text='Close' onClick={props.onClose} disabled={isSaving} />

                {isSaving && <span className="inline-block ml-2 italic">Saving...</span>}
                {error && <span className="inline-block ml-2 italic text-red-700">{error.message}</span>}
                {confirmation && <span className="inline-block ml-2 italic text-green-700">{confirmation}</span>}
            </div>
        </Modal>
    )
}
