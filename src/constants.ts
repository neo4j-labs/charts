import { Direction, Operator, AggregationFunction } from "@neode/querybuilder"


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

export const TYPE_METRIC = 'metric'
export const TYPE_TABLE = 'table'
export const TYPE_BAR = 'bar'
export const TYPE_STACKED_BAR = 'stackedbar'
export const TYPE_HORIZONTAL_BAR = 'horizontalbar'
export const TYPE_HORIZONTAL_STACKED_BAR = 'horizontalstackedbar'
export const TYPE_LINE = 'line'

export const reportTypes = [
    { key: 'metric', value: TYPE_METRIC, text: 'Metric', hint: 'A Metric Report looks for a `count` key on the first row', },
    { key: 'table', value: TYPE_TABLE, text: 'Table', hint: 'You can return any type of data in a Table report', },
    { key: 'bar', value: TYPE_BAR, text: 'Bar Chart', hint: 'A Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.', },
    { key: 'stackedbar', value: TYPE_STACKED_BAR, text: 'Stacked Bar Chart', hint: 'A Stacked Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.  These items are stacked on top of each other.', },
    { key: 'horizontalbar', value: TYPE_HORIZONTAL_BAR, text: 'Horizontal Bar Chart', hint: 'A Horizontal Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.',  },
    { key: 'horizontalstackedbar', value: TYPE_HORIZONTAL_STACKED_BAR, text: 'Horizontal Stacked Bar Chart', hint: 'A Stacked Horizontal Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.  These items are stacked next to each other.', },
    { key: 'line', value: TYPE_LINE, text: 'Line Chart', hint: 'A Line chart takes the first item returned as the key and plots all other data points on the chart.  Remember to order your results by date.', },
]

export function getHint(type: string) {
    return reportTypes.find(row => row.value === type)!.hint
}

interface AggregationFunctionOption {
    key: string;
    text: string;
    value: AggregationFunction;
}

export const aggregateFunctions: AggregationFunctionOption[] = [
    { key: 'avg',  value: 'avg', text: 'avg', },
    { key: 'collect',  value: 'collect', text: 'collect', },
    { key: 'count', value: 'count',text: 'count',},
    { key: 'max', value: 'max',text: 'max',},
    { key: 'min', value: 'min',text: 'min',},
    { key: 'percentileCont',  value: 'percentileCont', text: 'percentileCont', },
    { key: 'percentileDisc',  value: 'percentileDisc', text: 'percentileDisc', },
    { key: 'stDev',  value: 'stDev', text: 'stDev', },
    { key: 'stDevP', value: 'stDevP',text: 'stDevP', },
    { key: 'sum', value: 'sum', text: 'sum'},
]