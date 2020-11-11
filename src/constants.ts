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
export const TYPE_RADAR = 'radar'
export const TYPE_FUNNEL = 'funnel'
export const TYPE_HORIZONTAL_FUNNEL = 'horizontalfunnel'
export const TYPE_BUMP = 'bump'
export const TYPE_AREA_BUMP = 'areabump'
export const TYPE_CHORD = 'chord'
export const TYPE_BUBBLE = 'bubble'
export const TYPE_CALENDAR = 'calendar'
export const TYPE_HEAT_MAP = 'heatmap'
export const TYPE_NETWORK = 'network'

export const reportTypes = [
    { key: TYPE_METRIC, value: TYPE_METRIC, text: 'Metric', hint: 'A Metric Report looks for a `count` key on the first row', },
    { key: TYPE_TABLE, value: TYPE_TABLE, text: 'Table', hint: 'You can return any type of data in a Table report', },
    { key: TYPE_BAR, value: TYPE_BAR, text: 'Bar Chart', hint: 'A Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.', },
    { key: TYPE_STACKED_BAR, value: TYPE_STACKED_BAR, text: 'Stacked Bar Chart', hint: 'A Stacked Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.  These items are stacked on top of each other.', },
    { key: TYPE_HORIZONTAL_BAR, value: TYPE_HORIZONTAL_BAR, text: 'Horizontal Bar Chart', hint: 'A Horizontal Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.',  },
    { key: TYPE_HORIZONTAL_STACKED_BAR, value: TYPE_HORIZONTAL_STACKED_BAR, text: 'Horizontal Stacked Bar Chart', hint: 'A Stacked Horizontal Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.  These items are stacked next to each other.', },
    { key: TYPE_LINE, value: TYPE_LINE, text: 'Line Chart', hint: 'A Line chart takes the first item returned as the key and plots all other data points on the chart.  Remember to order your results by date.', },
    { key: TYPE_RADAR, value: TYPE_RADAR, text: 'Radar Chart', hint: 'A Radar chart takes the first item returned as the key and plots all other data points on the chart.', },
    { key: TYPE_FUNNEL, value: TYPE_FUNNEL, text: 'Funnel Chart', hint: 'A Funnel chart expects rows with three keys: `id`, `value` and `label`', },
    { key: TYPE_HORIZONTAL_FUNNEL, value: TYPE_HORIZONTAL_FUNNEL, text: 'Horizontal Funnel Chart', hint: 'A Funnel chart expects rows with three keys: `id`, `value` and `label`', },
    { key: TYPE_BUMP, value: TYPE_BUMP, text: 'Bump Chart', hint: 'A Bump chart expects rows with three keys: `id`, `x` and `y`', },
    { key: TYPE_AREA_BUMP, value: TYPE_AREA_BUMP, text: 'Area Bump Chart', hint: 'An Area Bump chart expects rows with three keys: `id`, `x` and `y`', },
    { key: TYPE_CHORD, value: TYPE_CHORD, text: 'Chord Chart', hint: 'A Chord chart expects rows with three keys: `from`, `to` and `value`', },
    { key: TYPE_BUBBLE, value: TYPE_BUBBLE, text: 'Bubble Chart', hint: 'A Bubble chart expects rows with three keys: `from`, `to` and `value`', },
    { key: TYPE_CALENDAR, value: TYPE_CALENDAR, text: 'Calendar Chart', hint: 'A Calendar chart expects rows with two columns: `date` (which should be a string representing a date, date, datetime or localdatetime) and `value` (a number)', },
    { key: TYPE_HEAT_MAP, value: TYPE_HEAT_MAP, text: 'Heat Map', hint: 'A Heat Map expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.', },
    { key: TYPE_NETWORK, value: TYPE_NETWORK, text: 'Network', hint: 'A Network expects rows with two keys: `from` and `to`.  Optionally you can supply a `color` and `radius`', },
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
