/* eslint-disable */
import React, { Children, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { Container, Form, Header, Segment, Card, Label, Grid, Select, DropdownItemProps } from 'semantic-ui-react';
import { useReadCypher } from 'use-neo4j';
import Loading from '../components/Loading'
import useSchema, { LabelSchema, RelationshipTypeSchema } from '../hooks/use-schema';

interface Filter {
    id: string;
    key: string;
    type: string;
    value: any;
}

interface Property {
    id: string;
    key: string;
}

interface TreeRelationship {
    id: string;
    from: string;
    to: string;
    type: string;
    direction: string;
}

interface TreeItem {
    id: string;
    parent?: string;
    label: string;
    // relationships: TreeItem[]
}


function TreeRelationship(props) {
    const { id, from, types, labels, to, type, direction, nodes, relationships, addNode, addRelationship, } = props

    const endNode = nodes.find(node => node.id === to)
    // const endLabel = labels.find(label => label.label == endNode.label)

    // console.log(endNode, endLabel);

    const end = <TreeNode
    key={endNode.id}
    addNode={addNode}
    addRelationship={addRelationship}
    labels={labels}
    types={types}
    nodes={nodes}
    relationships={relationships}
    {...endNode}
/>

    return <Segment><pre>
        { direction === 'in' && '<' }
        -[{id}:{type}]-
        { direction === 'out' && '>' }
        ({to}:{endNode.label})

        {end}
    </pre>
    </Segment>
}


function TreeNode(props) { //{ id, label, parent, nodes, addNode, addRelationship }) {
    const { id, labels, types, nodes, relationships, label, addNode, addRelationship, addFilter } = props

    const thisLabel = labels.find(node => node.label === label)

    const nodeRelationships = relationships.filter(rel => rel.from == id)
        .map(rel => <TreeRelationship
            labels={labels}
            types={types}
            nodes={nodes}
            relationships={relationships}

            addNode={addNode}
            addRelationship={addRelationship}
            addFilter={addFilter}

            key={rel.id}
            {...rel}
        />)


    const handleRelationshipChange = (_, selected) => {
        const [ type, direction, label ] = selected.value.split('||')

        addRelationship(id, type, direction, label)
    }

    const options = thisLabel.relationships.map(rel => rel.labels.map(label => ({
        value: [ rel.type, rel.direction, label ].join('||'),
        key: `${rel.direction == 'in' ? '<' : ''}-[:${rel.type}]-${rel.direction == 'out' ? '>' : ''}(:${label})`,
        text: `${rel.direction == 'in' ? '<' : ''}-[:${rel.type}]-${rel.direction == 'out' ? '>' : ''}(:${label})`,
    })))
        .reduce((acc, next) => acc.concat(next), [])


    const relationshipSelect = thisLabel.relationships.length
        ? <Select placeholder='Relationship' options={options} onChange={handleRelationshipChange} />
        : null

    const propertyOptions = Object.entries(thisLabel.properties).map(([key, value]) => ({
        value: key,
        key: key,
        text: key,
    }))


    const filterSelect = propertyOptions.length
        ? <Select placeholder='Property' options={propertyOptions} onChange={(e, a) => console.log(e, a)} />
        : null

    return <Segment>
        <pre>({id}:{thisLabel.label})</pre>

        {nodeRelationships}

        <Segment>
            <strong>Add Relationship:</strong> {relationshipSelect}
        </Segment>

        <Segment>
            <strong>Add Filters:</strong> {filterSelect}
        </Segment>
    </Segment>
}


export default function Home({ match }) {
    const { loading, labels, types } = useSchema()


    const [ nodes, setNodes ] = useState<TreeItem[]>([])
    const [ relationships, setRelationships ] = useState<TreeRelationship[]>([])
    const [ filters, setFilters ] = useState<Filter[]>([]);
    const [ properties, setProperties ] = useState<Property[]>();


    const addNode = (label: string) => {
        const id: string = `n${nodes.length+1}`

        setNodes( nodes.slice(0).concat({
            id,
            label,
            // relationships: [],
        } as TreeItem) )

        return id
    }

    const addRelationship = (from: string, type: string, direction: string, label: string) => {
        const id: string = `r${relationships.length+1}`

        const to = addNode(label)

        setRelationships( relationships.slice(0).concat({
            id,
            from,
            to,
            direction,
            type,
        }) )
    }

    const addFilter = (id: string, key: string, type: string, value: any) => {
        setFilters( filters.slice(0).concat({ id, key, type, value }) )
    }

    // Initial State
    useEffect(() => {
        if (labels.length) {
            addNode(labels[0].label)
        }

    }, [labels])

    const root = nodes.find(node => !node.parent)

    console.log('.. ', root);


    return <Container>
        <Segment>
            {root && <TreeNode
                labels={labels}
                types={types}
                nodes={nodes}
                relationships={relationships}

                addNode={addNode}
                addRelationship={addRelationship}
                addFilter={addFilter}

                key={root.id}
                {...root}
            />}
        </Segment>

        <pre>{JSON.stringify(relationships, null, 2)}</pre>

    </Container>

}