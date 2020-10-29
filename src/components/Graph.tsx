/* eslint-disable */
import Builder from '@neode/querybuilder';
import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { TreeState, selectNode, selectRelationship } from '../store';

function TreeRelationship({ relationship }) {
    const dispatch = useDispatch()
    const handleClick = () => dispatch( selectRelationship(relationship.id) )

    return <li onClick={handleClick}>
        <span className="bg-gray-200 text-gray-700 rounded-md px-4 py-2 mb-2 font-bold">
            {relationship.direction === 'in' ? '<': ''}-
            <span className="bg-gray-100 text-gray-500 px-2 py-1 inline-block ml-1">{relationship.id}:{relationship.type}</span>
            -{relationship.direction === 'out' ? '>': ''}
            {/* <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full inline-block ml-1">
                ({relationship.to})
            </span> */}
        </span>
    </li>
}







function TreeNode({ node }) {
    const dispatch = useDispatch()
    const handleNodeClick = id => dispatch( selectNode(id) )

    const relationships = useSelector((state: TreeState) => state.relationships)
    const predicates = useSelector((state: TreeState) => state.predicates)
    const output = useSelector((state: TreeState) => state.output)

    const theseRels = relationships.filter(rel => rel.from === node.id)

    const relationshipList = theseRels.length ? <ul className="ml-6 mb-2">
        { theseRels.map(rel => <TreeRelationship key={rel.id} relationship={rel} />) }
    </ul> : null

    const thesePredicates = predicates.filter(p => p.alias === node.id).map(p => p.name)
    const theseOutputs = output.filter(p => p.alias === node.id).map(p => p.name)


    return (
        <li key={node.id}>
            <button onClick={() => handleNodeClick(node.id)} className="bg-gray-300 text-gray-700 rounded-full px-4 py-2 mb-2 font-bold">
                {node.id}:
                <span className="bg-gray-100 text-gray-500 px-2 py-1 inline-block ml-1">{node.label}</span>


            {thesePredicates.length ? <span className="inline-block ml-2">
                {'{'}
                {thesePredicates.join(', ')}
                {'}'}
            </span> : ''}

            {theseOutputs.length ? <span className="inline-block ml-2 text-gray-500">
                :: {'{'}
                {theseOutputs.join(', ')}
                {'}'}
            </span> : ''}

            </button>

            {relationshipList}

        </li>
    )
}


function Query() {
    const builder = new Builder()


    const nodes = useSelector((state: TreeState) => state.nodes)
    const relationships = useSelector((state: TreeState) => state.relationships)
    const predicates = useSelector((state: TreeState) => state.predicates)
    const output = useSelector((state: TreeState) => state.output)

    const endNodes = relationships.map(rel => rel.to)

    const root = nodes.find(node => !endNodes.includes(node.id))

    console.log(root);


    builder.match(root!.id, root?.label)

    relationships.map(rel => {
        const to = nodes.find(node => node.id === rel.to)

        // @ts-ignore
        builder.relationship(rel.type, rel.direction, rel.id)
        builder.to(rel.to, to?.label)
    })

    predicates.map(output => {
        builder.where(`${output.alias}.${output.name}`, output.value)
    })

    output.map(output => {
        builder.return(`${output.alias}.${output.name}`)
    })




    const { cypher, params } = builder.build()

    const paramStatements = Object.entries(params).map(([ key, value ]) => <pre>:param ${key}: {value}</pre>)

    return <div className="p-2 bg-white mt-12 leading-8 text-blue-800 w-full">
        {paramStatements}

        <pre className="pt-2 mt-4 border-t border-gray-300">
        {cypher}
        </pre>
    </div>
}


export default function Graph() {
    // const id = v4()
    // const graph = {
    //     nodes: nodes.slice(0).map(node => node),
    //     links: relationships.slice(0).map(rel => ({ source: rel.from, target: rel.to, type: rel.type, id: rel.id }))
    // }

    // const dispatch = useDispatch()

    const nodes = useSelector((state: TreeState) => state.nodes)
    // const relationships = useSelector((state: TreeState) => state.relationships)



    // TODO: make force graph again...
    return (
        <div>
        <ul className="p-2">
            {nodes.map(node => <TreeNode key={node.id} node={node} />)}
            {/* {nodes.map(node => <li key={node.id}>
                <button onClick={() => handleNodeClick(node.id)} className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 mb-2 font-bold">
                    {node.id}:
                    <span className="bg-gray-200 text-gray-500 px-2 py-1 inline-block">{node.label}</span>
                </button>

                <ul>
                    { relationships.filter(r => r.from === node.id).map(r => <li key={r.id}>
                        <pre>{r}</pre>
                    </li>) || <div>no rels</div> }

                </ul>
            </li>)} */}
        </ul>


<Query />
        </div>
    )
}