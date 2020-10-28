import { useEffect, useState } from "react";
import { useReadCypher } from "use-neo4j";

export interface PropertySchema {
    existence: boolean;
    type: string;
    array: boolean;
}

export interface RelationshipTypeSchema {
    type: string;
    count: number;
    properties: Record<string, PropertySchema>;
    direction?: 'in' | 'out'
}

export interface LabelSchema {
    label: string;
    type: 'node';
    labels: string[];
    count: number;
    relationships: RelationshipTypeSchema[];
    properties: Record<string, PropertySchema>;
}

export interface UseSchemaOutput {
    loading: boolean;
    labels: LabelSchema[];
    types: RelationshipTypeSchema[];
}

function toLabelSchema(label: string, input: Record<string, any>): LabelSchema {
    return {
        ...input,
        label,
        relationships: Object.entries(input.relationships).map(([ key, value ]) => toRelationshipTypeSchema(key, value as Record<string, any>)),
        count: input?.count.toNumber(),
    } as LabelSchema
}

function toRelationshipTypeSchema(type: string, input: Record<string, any>): RelationshipTypeSchema {
    return {
        ...input,
        type,
        count: input.count?.toNumber(),
    } as RelationshipTypeSchema
}

export default function useSchema(): UseSchemaOutput {
    const { loading, first } = useReadCypher('call apoc.meta.schema')
    const [ labels, setLabels ] = useState<LabelSchema[]>([])
    const [ types, setTypes ] = useState<RelationshipTypeSchema[]>([])

    useEffect(() => {
        if ( first ) {
            setLabels(Object.entries(first!.get('value'))
                .filter(([ key, value ]) => (value as Record<string, any>).type === 'node')
                .map(([ key, value ]) => toLabelSchema(key, value as Record<string, any>))
            )

            setTypes( Object.entries(first!.get('value'))
                .filter(([ key, value ]) => (value as Record<string, any>).type === 'relationship')
                .map(([ key, value ]) => toRelationshipTypeSchema(key, value as Record<string, any>))
            )
        }





    }, [first])

    return {
        loading,
        labels,
        types,
    }



}
