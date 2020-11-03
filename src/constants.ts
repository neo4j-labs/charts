import { Direction, Operator } from "@neode/querybuilder"

export type ApocDirection = 'in' | 'out' | 'both'
export type Condition = 'equals' | 'contains' | 'starts with' | 'ends with' | 'greater than' | 'less than' | 'greater than or equal' | 'less than or equal'

export const operators = {
    'equals': Operator.EQUALS,
    'contains': Operator.CONTAINS,
    'starts with': Operator.STARTS_WITH,
    'ends with': Operator.ENDS_WITH,
    'greater than': Operator.GREATER_THAN,
    'greater than or equal': Operator.GREATER_THAN_OR_EQUAL,
    'less than': Operator.LESS_THAN,
    'less than or equal': Operator.LESS_THAN_OR_EQUAL,
}

export const conditions: Condition[] = Object.keys(operators) as Condition[]

export const directions = {
    in: Direction.INCOMING,
    out: Direction.OUTGOING,
    both: Direction.BOTH,
}


export const reportSources = [
    { key: 'cypher', value: 'cypher', text: 'Raw Cypher Query', },
    { key: 'query', value: 'query', text: 'Query from Query Builder', },
]

export const reportTypes = [
    { key: 'metric', value: 'metric', text: 'Metric', },
    { key: 'table', value: 'table', text: 'Table', },
    { key: 'bar', value: 'bar', text: 'bar', },
    { key: 'line', value: 'line', text: 'line', },
    { key: 'etc', value: 'etc', text: 'etc', },
]