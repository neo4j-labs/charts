import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TreeState, addRelationship, addPredicate, Condition, removePredicate, removeReturn, addReturn } from '../../store'



function ToolbarHeader({ text }) {
    return <div className="bg-white p-4 font-bold text-gray-700 text-lg border-b border-gray-200 mb-4">{text}</div>
}

function ToolbarSubheader({ text }) {
    return <div className="bg-white p-4 font-bold text-gray-600 border-b border-gray-400 mb-4">{text}</div>
}

// function

function ToolbarRelationship(props) {
    const dispatch = useDispatch()
    const handleRelationshipClick = () => dispatch(addRelationship(props))

    const text = `(${props.from})${props.direction === 'in' ? '<' : ''}-[:${props.type}]-${props.direction === 'out' ? '>' : ''}(:${props.label})`

    return <div>

        <button onClick={handleRelationshipClick} className="text-left w-full bg-gray-100 text-gray-700 rounded-md px-4 py-2 mb-2 font-bold">
            <span className="inline-block px-2 text-xs bg-gray-300 text-gray-6 mr-2">+</span>
            {text}
        </button>
    </div>
}

const conditions: Condition[] = [
    'equals',
    'contains',
    'starts with',
    'ends with',
]


function ExistingPredicate(props) {
    const dispatch = useDispatch()
    const { id, name, type, condition, negative, value } = props

    const handleRemoveClick = () => {
        dispatch( removePredicate(id) )
    }

    return <div className="flex flex-row justify-between p-2 mb-2 border-b border-gray-300">
        <div className="flex flex-grow-1">{name}</div>
        <div className="flex flex-grow-1">{negative ? 'NOT' : 'IS'} {condition}</div>
        <pre className="flex flex-grow-1">{value}</pre>
        <button className="p-2 rounded-sm border border-red-600 text-red-600 font-bold leading-none" onClick={handleRemoveClick}>x</button>
    </div>
}

function Predicates({ id }) {
    const predicates = useSelector((state: TreeState) => state.predicates)

    const thesePredicates = predicates.filter(p => p.alias === id)
        .map(row => <ExistingPredicate key={[row.id, row.name, row.negative ? 'NOT': 'IS', row.condition, row.value].join('||')}
            {...row}
        />)

    return <div className="p-4 flex flex-col">
        {thesePredicates}
    </div>
}


function AddPredicateForm({ id, properties }) {
    const dispatch = useDispatch()

    const [ name, setName ] = useState<string>()
    const [ value, setValue ] = useState<string>('')
    const [ condition, setCondition ] = useState<Condition>(conditions[0])

    const handleAddPredicate = () => {
        if ( name && value !== '' ) {
            const thisProperty = properties[ name ]

            dispatch( addPredicate({ alias: id, name, condition, type: thisProperty.type, value }) )

            setValue('')
            setCondition(conditions[0])
        }
    }

    return <div className="p-4 flex flex-col">
        <select className="p-2 rounded-md border border-gray-400 mb-2" value={name} onChange={e => setName(e.target.value)}>
            <option></option>
            {Object.keys(properties).map((key) => <option key={key} value={key}>{key}</option>)}
        </select>
        <select className="p-2 rounded-md border border-gray-400 mb-2" value={condition} onChange={e => setCondition(e.target.value as Condition)}>
        <option></option>
            {conditions.map((key) => <option key={key} value={key}>{key}</option>)}
        </select>
        <input className="p-2 rounded-md border border-gray-400 mb-2" value={value} onChange={e => setValue(e.target.value)} />
        <button className="px-4 py-2 rounded-md border font-bold border-blue-600 text-blue-600" onClick={handleAddPredicate}>Add Predicate</button>
    </div>
}


function ReturnFields({ id }) {
    const dispatch = useDispatch()

    const output = useSelector((state: TreeState) => state.output)
    const handleRemoveClick = (id: string) => dispatch( removeReturn(id) )

    const theseFields = output.filter(p => p.alias === id)
        .map(row => <div className="flex justify-between" key={row.id}>
            {row.name}
            <button className="p-2 rounded-sm border border-red-600 text-red-600 font-bold leading-none" onClick={() => handleRemoveClick(row.id)}>x</button>
        </div>)

    return <div className="p-4 flex flex-col">
        {theseFields}
    </div>
}


function AddReturnForm({ id, properties }) {
    const dispatch = useDispatch()

    const [ name, setName ] = useState<string>(Object.keys(properties)[0])

    const handleAddReturn = () => {
        if ( name ) {
            dispatch( addReturn({ alias: id, name }) )
        }
    }

    return <div className="p-4 flex flex-col">
        <select className="p-2 rounded-md border border-gray-400 mb-2" value={name} onChange={e => setName(e.target.value)}>
            {Object.keys(properties).map((key) => <option key={key} value={key}>{key}</option>)}
        </select>
        <button className="px-4 py-2 rounded-md border font-bold border-blue-600 text-blue-600" onClick={handleAddReturn}>Add Return</button>
    </div>
}


function NodeToolbar(props) {
    const selected = useSelector((state: TreeState) => state.selected)
    const nodes = useSelector((state: TreeState) => state.nodes)
    const thisNode = nodes.find(node => node.id === selected)

    const thisLabel = thisNode && props.labels.find(label => label.label === thisNode!.label)

    if ( !selected || !thisNode || !thisLabel ) return <div></div>

    const addRelationshipOptions = thisLabel.relationships.map(rel => rel.labels.map(label => ({
        key: `${rel.type}||${rel.direction}||${label}`,
        label,
        ...rel,
    })))
        .reduce((acc, next) => acc.concat(next), [])
        .map(rel => <ToolbarRelationship key={rel.key} from={selected} {...rel} />)


    return <div className="flex flex-col flex-grow-0 bg-white overflow-auto" style={{width: '420px'}}>
        <ToolbarHeader text={`(${thisNode?.id}:${thisNode?.label})`} />

        <ToolbarSubheader text="Predicates" />
        <Predicates id={thisNode.id} />
        <AddPredicateForm id={thisNode.id} properties={thisLabel.properties} />


        <ToolbarSubheader text="Return Fields" />
        <ReturnFields id={thisNode.id} />
        <AddReturnForm id={thisNode.id} properties={thisLabel.properties} />


        <ToolbarSubheader text="Add Relationship" />
        {/* <div className="font-bold mt-4 px-2">Add Relationship</div> */}
        <div className="px-2">
            {addRelationshipOptions}
        </div>
    </div>
}

function RelationshipToolbar(props) {
    const selected = useSelector((state: TreeState) => state.selected)
    const nodes = useSelector((state: TreeState) => state.nodes)
    const relationships = useSelector((state: TreeState) => state.relationships)
    const thisRelationship = relationships.find(r => r.id === selected)

    const startNode = nodes.find(node => node.id === thisRelationship?.from)
    const endNode = nodes.find(node => node.id === thisRelationship?.to)

    const text = `(${startNode?.id}:${startNode?.label})${thisRelationship?.direction === 'in' ? '<': ''}-${thisRelationship?.id}:${thisRelationship?.type}-${thisRelationship?.direction === 'out' ? '>': ''}(${endNode?.id}:${endNode?.label})`

    return <div className="flex flex-col flex-grow-0 overflow-auto" style={{width: '420px'}}>
        <ToolbarHeader text={text} />
    </div>
}


export default function Toolbar(props) {
    const selected = useSelector((state: TreeState) => state.selected)

    if ( selected && selected.startsWith('n') ) {
        return <NodeToolbar {...props} />
    }
    else if ( selected && selected.startsWith('r') ) {
        return <RelationshipToolbar {...props} />
    }

    return <div></div>

}