/* eslint-disable */
import React, { Children, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { Container, Form, Header, Segment, Card, Label, Grid, Select, DropdownItemProps } from 'semantic-ui-react';
import { useReadCypher } from 'use-neo4j';
import Loading from '../components/Loading'
import useSchema, { LabelSchema, RelationshipTypeSchema } from '../hooks/use-schema';
import Graph from '../components/Graph';
import InitialNodeSelector from '../components/querybuilder/InitialNodeSelector';
import Toolbar from '../components/querybuilder/Toolbar';
import { useSelector, useDispatch } from 'react-redux'
import { TreeState } from '../store';

interface Filter {
    id: string;
    key: string;
    type: string;
    value: any;
}


export default function Home({ match }) {
    const { loading, labels, types } = useSchema()
    const dispatch = useDispatch()

    const nodes = useSelector((state: TreeState) => state.nodes)
    const selected = useSelector((state: TreeState) => state.selected)


    // const [ nodes, setNodes ] = useState<TreeItem[]>([])
    // const [ relationships, setRelationships ] = useState<TreeRelationship[]>([])
    // const [ filters, setFilters ] = useState<Filter[]>([]);
    // const [ properties, setProperties ] = useState<Property[]>();

    // const [ selected, setSelected ] = useState<string>()


    if ( loading ) return <div className="flex flex-col h-full flex-grow justify-between">
    <div className="flex flex-col h-full justify-center align-center">
        <div className="bg-gray-200 p-4 rounded-md w-auto justify-center mx-auto text-center" style={{width: '200px'}}>
            <p className="font-bold mb-4">Loading Schema...</p>
        </div>
    </div>
</div>


    let graph = <InitialNodeSelector labels={labels} />

    if ( nodes.length ) {
        graph = <Graph />
    }

    // let toolbar = <div>Select a node to continue</div>

    // console.log(selected);

    // if ( selected ) {
    //     toolbar = <div>
    //         <div className="bg-gray-300 p-2  text-gray-900">
    //             {selected}
    //         </div>
    //         <div className="p2 mb-2 border-b border-gray-600">
    //             foo
    //         </div>
    //     </div>
    // }


    return (
        <div className="flex flex-row h-screen">

            <div className="flex flex-grow bg-gray-100">
                {graph}
            </div>

            {selected && <Toolbar labels={labels} types={types} />}
        </div>
    )

    // return <Container>
    //     <Segment>
    //         {root && <TreeNode
    //             labels={labels}
    //             types={types}
    //             nodes={nodes}
    //             relationships={relationships}

    //             addNode={addNode}
    //             addRelationship={addRelationship}
    //             addFilter={addFilter}

    //             key={root.id}
    //             {...root}
    //         />}
    //     </Segment>

    //     <pre>{JSON.stringify(relationships, null, 2)}</pre>
    // </Container>

}