import { Direction, Operator, AggregationFunction } from "@neode/querybuilder"
import AreaBumpReport from "./components/reports/areaBump"
import BarReport from "./components/reports/bar"
import BumpReport from "./components/reports/bump"
import ChordReport from "./components/reports/chord"
import FunnelReport from "./components/reports/funnel"
import LineReport from "./components/reports/line"
import MetricReport from "./components/reports/metric"
import RadarReport from "./components/reports/radar"
import BubbleReport from "./components/reports/bubble"
import MetricTable from "./components/reports/table"
import CalendarReport from "./components/reports/calendar"
import HeatMap from "./components/reports/heatMap"
import NetworkReport from "./components/reports/network"

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

const barExampleQuery = `MATCH (m:Movie)-[:IN_GENRE]->(g)\nWHERE\n    m.release_date.year > 2010\nRETURN m.release_date.year AS index,\n    g.name AS key,\n    count(*) AS value\nORDER BY index DESC LIMIT 20`
const barPreviewQuery = `UNWIND [[2012, "(no genres listed)", 1], [2012, "Action", 51], [2012, "Adventure", 24], [2012, "Animation", 20], [2012, "Children", 7], [2012, "Comedy", 77], [2012, "Crime", 27], [2012, "Documentary", 27], [2012, "Drama", 86], [2012, "Fantasy", 17], [2012, "Film-Noir", 1], [2012, "Horror", 21], [2012, "IMAX", 22], [2012, "Musical", 10], [2012, "Mystery", 5], [2012, "Romance", 25], [2012, "Sci-Fi", 25], [2012, "Thriller", 48], [2012, "War", 2], [2012, "Western", 1], [2013, "(no genres listed)", 1], [2013, "Action", 49], [2013, "Adventure", 32], [2013, "Animation", 13], [2013, "Children", 7], [2013, "Comedy", 70], [2013, "Crime", 30], [2013, "Documentary", 21], [2013, "Drama", 99], [2013, "Fantasy", 22], [2013, "Film-Noir", 1], [2013, "Horror", 12], [2013, "IMAX", 26], [2013, "Musical", 2], [2013, "Mystery", 10], [2013, "Romance", 23], [2013, "Sci-Fi", 18], [2013, "Thriller", 37], [2013, "War", 2], [2013, "Western", 1], [2014, "Action", 52], [2014, "Adventure", 27], [2014, "Animation", 14], [2014, "Children", 10], [2014, "Comedy", 89], [2014, "Crime", 28], [2014, "Documentary", 18], [2014, "Drama", 109], [2014, "Fantasy", 14], [2014, "Horror", 18], [2014, "IMAX", 15], [2014, "Musical", 2], [2014, "Mystery", 11], [2014, "Romance", 33], [2014, "Sci-Fi", 25], [2014, "Thriller", 42], [2014, "War", 8], [2014, "Western", 1], [2015, "(no genres listed)", 6], [2015, "Action", 45], [2015, "Adventure", 31], [2015, "Animation", 7], [2015, "Children", 11], [2015, "Comedy", 71], [2015, "Crime", 23], [2015, "Documentary", 17], [2015, "Drama", 83], [2015, "Fantasy", 12], [2015, "Horror", 22], [2015, "IMAX", 1], [2015, "Mystery", 11], [2015, "Romance", 15], [2015, "Sci-Fi", 25], [2015, "Thriller", 51], [2015, "War", 3], [2015, "Western", 3], [2016, "(no genres listed)", 3], [2016, "Action", 22], [2016, "Adventure", 18], [2016, "Animation", 7], [2016, "Children", 2], [2016, "Comedy", 20], [2016, "Crime", 3], [2016, "Documentary", 5], [2016, "Drama", 17], [2016, "Fantasy", 8], [2016, "Horror", 10], [2016, "Musical", 1], [2016, "Mystery", 3], [2016, "Romance", 7], [2016, "Sci-Fi", 13], [2016, "Thriller", 14], [2016, "Western", 1]] AS row RETURN row[0] as index, row[1] as key, row[2] as value`

export const reportTypes = [
    {
        key: TYPE_METRIC,
        value: TYPE_METRIC, text: 'Metric',
        hint: 'A Metric Report looks for a `count` key on the first row',
        exampleQuery: 'MATCH (n) RETURN count(n) AS count',
        previewQuery: 'RETURN 1234',
        component: MetricReport,
    },
    {
        key: TYPE_TABLE,
        value: TYPE_TABLE,
        text: 'Table',
        hint: 'You can return any type of data in a Table report',
        component: MetricTable,
        exampleQuery: `MATCH (m:Movie)\nRETURN\n  m.title AS title,\n  m.budget AS budget`,
        previewQuery: 'UNWIND [["Toy Story", 30000000],["Jumanji", 65000000],["Waiting to Exhale", 16000000],["Heat", 60000000]] AS row RETURN row[0] AS title, row[1] AS budget',
    },
    {
        key: TYPE_BAR,
        value: TYPE_BAR,
        text: 'Bar Chart',
        hint: 'A Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.',
        component: BarReport,
        exampleQuery: barExampleQuery,
        previewQuery: barPreviewQuery,
    },
    {
        key: TYPE_STACKED_BAR,
        value: TYPE_STACKED_BAR,
        text: 'Stacked Bar Chart',
        hint: 'A Stacked Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.  These items are stacked on top of each other.',
        component: BarReport,
        exampleQuery: barExampleQuery,
        previewQuery: barPreviewQuery,
    },
    {
        key: TYPE_HORIZONTAL_BAR,
        value: TYPE_HORIZONTAL_BAR,
        text: 'Horizontal Bar Chart',
        hint: 'A Horizontal Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.',
        component: BarReport,
        exampleQuery: barExampleQuery,
        previewQuery: barPreviewQuery,
    },
    {
        key: TYPE_HORIZONTAL_STACKED_BAR,
        value: TYPE_HORIZONTAL_STACKED_BAR,
        text: 'Horizontal Stacked Bar Chart',
        hint: 'A Stacked Horizontal Bar chart expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.  These items are stacked next to each other.',
        component: BarReport,
        exampleQuery: barExampleQuery,
        previewQuery: barPreviewQuery,
    },
    {
        key: TYPE_LINE,
        value: TYPE_LINE,
        text: 'Line Chart',
        hint: 'A Line chart takes the first item returned as the key and plots all other data points on the chart.  Remember to order your results by date.',
        component: LineReport,
        // exampleQuery: barExampleQuery,
        previewQuery: `UNWIND [[2012,	100,	24,	20],[2013,	49,	32,	13],[2014,	52,	27,	14],[2015,	45,	31,	7],[2016,	22,	18,	7]] AS row RETURN row[0] AS index,  row[1] as Action, row[2] as Adventure, row[3] as Animation`,
    },
    {
        key: TYPE_RADAR,
        value: TYPE_RADAR,
        text: 'Radar Chart',
        hint: 'A Radar chart takes the first item returned as the key and plots all other data points on the chart.',
        component: RadarReport,
        previewQuery: 'UNWIND [{taste: "fruity",chardonay: 79,carmenere: 80,syrah: 61},{taste: "bitter",chardonay: 70,carmenere: 60,syrah: 89},{taste: "heavy",chardonay: 66,carmenere: 53,syrah: 108},{taste: "strong",chardonay: 22,carmenere: 34,syrah: 28},{taste: "sunny",chardonay: 20,carmenere: 52,syrah: 108}] AS row UNWIND keys(row) AS key WITH * WHERE key <> "taste" RETURN row.taste AS index, key, row[key] AS value',
    },
    {
        key: TYPE_FUNNEL,
        value: TYPE_FUNNEL,
        text: 'Funnel Chart',
        hint: 'A Funnel chart expects rows with three keys: `id`, `value` and `label`',
        component: FunnelReport,
        previewQuery: 'UNWIND [{id: "step_sent",value: 60491,label: "Sent"},{id: "step_viewed",value: 46510,label: "Viewed"},{id: "step_clicked",value: 41687,label: "Clicked"},{id: "step_add_to_card",value: 34541,label: "Add To Card"},{id: "step_purchased",value: 26351,label: "Purchased"}] AS row RETURN row.id AS id, row.value AS value, row.label AS label',
    },
    {
        key: TYPE_HORIZONTAL_FUNNEL,
        value: TYPE_HORIZONTAL_FUNNEL,
        text: 'Horizontal Funnel Chart', hint: 'A Funnel chart expects rows with three keys: `id`, `value` and `label`',
        component: FunnelReport,
        previewQuery: 'UNWIND [{id: "step_sent",value: 60491,label: "Sent"},{id: "step_viewed",value: 46510,label: "Viewed"},{id: "step_clicked",value: 41687,label: "Clicked"},{id: "step_add_to_card",value: 34541,label: "Add To Card"},{id: "step_purchased",value: 26351,label: "Purchased"}] AS row RETURN row.id AS id, row.value AS value, row.label AS label',
    },
    {
        key: TYPE_BUMP,
        value: TYPE_BUMP,
        text: 'Bump Chart',
        hint: 'A Bump chart expects rows with three keys: `id`, `x` and `y`',
        component: BumpReport,
        previewQuery: 'UNWIND[{id:"Serie1",data:[{x:2000,y:12},{x:2001,y:3},{x:2002,y:1},{x:2003,y:12},{x:2004,y:12}]},{id:"Serie2",data:[{x:2000,y:8},{x:2001,y:9},{x:2002,y:8},{x:2003,y:5},{x:2004,y:1}]},{id:"Serie3",data:[{x:2000,y:9},{x:2001,y:10},{x:2002,y:9},{x:2003,y:8},{x:2004,y:7}]},{id:"Serie4",data:[{x:2000,y:5},{x:2001,y:12},{x:2002,y:11},{x:2003,y:11},{x:2004,y:3}]},{id:"Serie5",data:[{x:2000,y:11},{x:2001,y:8},{x:2002,y:3},{x:2003,y:4},{x:2004,y:11}]},{id:"Serie6",data:[{x:2000,y:2},{x:2001,y:11},{x:2002,y:12},{x:2003,y:6},{x:2004,y:4}]},{id:"Serie7",data:[{x:2000,y:10},{x:2001,y:7},{x:2002,y:7},{x:2003,y:10},{x:2004,y:8}]},{id:"Serie8",data:[{x:2000,y:7},{x:2001,y:5},{x:2002,y:2},{x:2003,y:7},{x:2004,y:6}]},{id:"Serie9",data:[{x:2000,y:1},{x:2001,y:1},{x:2002,y:4},{x:2003,y:9},{x:2004,y:5}]},{id:"Serie10",data:[{x:2000,y:3},{x:2001,y:4},{x:2002,y:5},{x:2003,y:1},{x:2004,y:9}]},{id:"Serie11",data:[{x:2000,y:6},{x:2001,y:6},{x:2002,y:10},{x:2003,y:2},{x:2004,y:10}]},{id:"Serie12",data:[{x:2000,y:4},{x:2001,y:2},{x:2002,y:6},{x:2003,y:3},{x:2004,y:2}]}] AS row UNWIND row.data as d RETURN row.id AS id,d.x AS x,d.y AS y'
    },
    {
        key: TYPE_AREA_BUMP,
        value: TYPE_AREA_BUMP,
        text: 'Area Bump Chart',
        hint: 'An Area Bump chart expects rows with three keys: `id`, `x` and `y`',
        component: AreaBumpReport,
        previewQuery: 'UNWIND[{id:"Serie1",data:[{x:2000,y:12},{x:2001,y:3},{x:2002,y:1},{x:2003,y:12},{x:2004,y:12}]},{id:"Serie2",data:[{x:2000,y:8},{x:2001,y:9},{x:2002,y:8},{x:2003,y:5},{x:2004,y:1}]},{id:"Serie3",data:[{x:2000,y:9},{x:2001,y:10},{x:2002,y:9},{x:2003,y:8},{x:2004,y:7}]},{id:"Serie4",data:[{x:2000,y:5},{x:2001,y:12},{x:2002,y:11},{x:2003,y:11},{x:2004,y:3}]},{id:"Serie5",data:[{x:2000,y:11},{x:2001,y:8},{x:2002,y:3},{x:2003,y:4},{x:2004,y:11}]},{id:"Serie6",data:[{x:2000,y:2},{x:2001,y:11},{x:2002,y:12},{x:2003,y:6},{x:2004,y:4}]},{id:"Serie7",data:[{x:2000,y:10},{x:2001,y:7},{x:2002,y:7},{x:2003,y:10},{x:2004,y:8}]},{id:"Serie8",data:[{x:2000,y:7},{x:2001,y:5},{x:2002,y:2},{x:2003,y:7},{x:2004,y:6}]},{id:"Serie9",data:[{x:2000,y:1},{x:2001,y:1},{x:2002,y:4},{x:2003,y:9},{x:2004,y:5}]},{id:"Serie10",data:[{x:2000,y:3},{x:2001,y:4},{x:2002,y:5},{x:2003,y:1},{x:2004,y:9}]},{id:"Serie11",data:[{x:2000,y:6},{x:2001,y:6},{x:2002,y:10},{x:2003,y:2},{x:2004,y:10}]},{id:"Serie12",data:[{x:2000,y:4},{x:2001,y:2},{x:2002,y:6},{x:2003,y:3},{x:2004,y:2}]}] AS row UNWIND row.data as d RETURN row.id AS id,d.x AS x,d.y AS y'
    },
    {
        key: TYPE_CHORD,
        value: TYPE_CHORD,
        text: 'Chord Chart',
        hint: 'A Chord chart expects rows with three keys: `from`, `to` and `value`',
        component: ChordReport,
        previewQuery: 'WITH [[338,1453,340,681,358],[283,92,1803,297,436],[170,132,1461,227,257],[500,217,186,84,435],[708,227,183,461,20]] AS rows UNWIND range(0,size(rows)-1) AS from WITH from,rows[from] AS row UNWIND range(0,size(row)-1) AS to RETURN from,to,row[to] AS value'
    },
    {
        key: TYPE_BUBBLE,
        value: TYPE_BUBBLE,
        text: 'Bubble Chart',
        hint: 'A Bubble chart expects rows with three keys: `from`, `to` and `value`',
        component: BubbleReport,
        previewQuery: `UNWIND [
            { from: 'Adam', to: 'Kane', value: 1 },
            { from: 'Adam', to: 'Abel' },
            { from: 'Kane', to: 'Enoch' },
            { from: 'Enoch', to: 'Lemech' },
            { from: 'Enoch', to: 'Ada' },
            { from: 'Enoch', to: 'Tzila' },
            { from: 'Adam', to: 'Seth' },
            { from: 'Seth', to: 'Enosh' },
            { from: 'Enosh', to: 'All Humanity' }

           ] AS row
           RETURN row.from AS from, row.to AS to, row.value AS value`,
    },
    {
        key: TYPE_CALENDAR,
        value: TYPE_CALENDAR,
        text: 'Calendar Chart',
        hint: 'A Calendar chart expects rows with two columns: `date` (which should be a string representing a date, date, datetime or localdatetime) and `value` (a number)',
        component: CalendarReport,
        previewQuery: `
            UNWIND [{day:date("2017-01-27"),value:256},{day:date("2018-08-10"),value:90},{day:date("2017-11-24"),value:259},{day:date("2016-01-04"),value:281},{day:date("2017-03-06"),value:156},{day:date("2017-07-26"),value:341},{day:date("2016-06-13"),value:101},{day:date("2017-07-20"),value:58},{day:date("2017-06-24"),value:216},{day:date("2015-07-08"),value:63},{day:date("2016-07-13"),value:21},{day:date("2017-09-27"),value:41},{day:date("2015-06-19"),value:356},{day:date("2017-11-02"),value:47},{day:date("2015-04-22"),value:101},{day:date("2017-10-29"),value:390},{day:date("2018-03-03"),value:139},{day:date("2018-06-14"),value:352},{day:date("2017-12-18"),value:87},{day:date("2018-03-11"),value:72},{day:date("2018-03-29"),value:359},{day:date("2015-06-03"),value:144},{day:date("2016-01-20"),value:145},{day:date("2015-12-28"),value:222},{day:date("2015-09-07"),value:277},{day:date("2015-12-29"),value:321},{day:date("2017-01-15"),value:20},{day:date("2018-04-27"),value:382},{day:date("2017-08-28"),value:254},{day:date("2018-03-12"),value:337},{day:date("2015-05-03"),value:338},{day:date("2015-07-04"),value:95},{day:date("2015-12-13"),value:388},{day:date("2016-04-08"),value:289},{day:date("2016-11-06"),value:310},{day:date("2017-06-12"),value:124},{day:date("2017-11-03"),value:220},{day:date("2015-05-19"),value:52},{day:date("2015-09-29"),value:206},{day:date("2018-01-26"),value:315},{day:date("2018-06-23"),value:213},{day:date("2015-11-03"),value:19},{day:date("2017-01-03"),value:187},{day:date("2018-07-18"),value:35},{day:date("2015-06-11"),value:149},{day:date("2016-12-14"),value:398},{day:date("2017-03-20"),value:48},{day:date("2016-11-25"),value:317},{day:date("2015-07-23"),value:331},{day:date("2016-04-12"),value:196},{day:date("2018-05-05"),value:40},{day:date("2017-05-17"),value:224},{day:date("2018-02-05"),value:286},{day:date("2015-06-12"),value:79},{day:date("2017-01-06"),value:7},{day:date("2016-11-10"),value:96},{day:date("2017-10-06"),value:374},{day:date("2015-06-02"),value:60},{day:date("2015-04-02"),value:98},{day:date("2018-03-27"),value:9},{day:date("2018-01-06"),value:187},{day:date("2016-01-17"),value:328},{day:date("2017-05-27"),value:233},{day:date("2017-11-13"),value:15},{day:date("2015-11-12"),value:29},{day:date("2016-07-11"),value:57},{day:date("2017-02-27"),value:162},{day:date("2016-04-07"),value:312},{day:date("2015-08-07"),value:397},{day:date("2015-10-23"),value:267},{day:date("2018-05-03"),value:166},{day:date("2016-03-28"),value:280},{day:date("2018-02-19"),value:282},{day:date("2015-07-31"),value:142},{day:date("2015-07-06"),value:234},{day:date("2018-07-06"),value:115},{day:date("2018-05-27"),value:60},{day:date("2016-11-27"),value:125},{day:date("2018-02-06"),value:72},{day:date("2017-04-08"),value:392},{day:date("2017-07-27"),value:372},{day:date("2017-05-21"),value:147},{day:date("2017-08-19"),value:356},{day:date("2017-09-05"),value:130},{day:date("2016-10-22"),value:66},{day:date("2018-05-19"),value:121},{day:date("2016-12-05"),value:385},{day:date("2017-04-23"),value:332},{day:date("2016-08-25"),value:266},{day:date("2018-04-07"),value:198},{day:date("2016-02-26"),value:388},{day:date("2018-01-12"),value:66},{day:date("2015-12-26"),value:363},{day:date("2015-04-13"),value:72},{day:date("2016-08-23"),value:279},{day:date("2016-02-28"),value:276},{day:date("2015-08-12"),value:275},{day:date("2016-04-18"),value:115},{day:date("2017-02-12"),value:337},{day:date("2017-07-03"),value:6},{day:date("2015-08-29"),value:100},{day:date("2017-11-20"),value:44},{day:date("2017-10-28"),value:279},{day:date("2016-01-24"),value:103},{day:date("2018-08-11"),value:71},{day:date("2015-12-31"),value:329},{day:date("2016-08-27"),value:345},{day:date("2018-07-14"),value:381},{day:date("2016-03-02"),value:382},{day:date("2018-02-18"),value:258},{day:date("2017-06-29"),value:302},{day:date("2015-06-21"),value:192},{day:date("2015-07-12"),value:141},{day:date("2018-04-25"),value:2},{day:date("2016-02-03"),value:8},{day:date("2015-06-30"),value:297},{day:date("2015-07-29"),value:383},{day:date("2015-04-11"),value:26},{day:date("2017-10-15"),value:187},{day:date("2017-11-04"),value:176},{day:date("2015-09-25"),value:351},{day:date("2016-07-21"),value:126},{day:date("2015-12-01"),value:147},{day:date("2015-05-16"),value:142},{day:date("2016-10-07"),value:325},{day:date("2017-03-02"),value:323},{day:date("2017-03-01"),value:334},{day:date("2017-07-29"),value:53},{day:date("2018-07-17"),value:231},{day:date("2015-04-19"),value:343},{day:date("2017-04-27"),value:9},{day:date("2017-06-22"),value:323},{day:date("2016-05-12"),value:316},{day:date("2015-08-03"),value:296},{day:date("2017-08-01"),value:365},{day:date("2015-10-10"),value:152},{day:date("2016-07-30"),value:399},{day:date("2017-08-05"),value:130},{day:date("2015-10-14"),value:294},{day:date("2016-08-08"),value:362},{day:date("2018-03-30"),value:296},{day:date("2015-08-06"),value:96},{day:date("2015-11-05"),value:38},{day:date("2015-07-27"),value:80},{day:date("2016-06-03"),value:250},{day:date("2016-04-20"),value:299},{day:date("2018-04-12"),value:185},{day:date("2016-08-15"),value:268},{day:date("2016-10-18"),value:45},{day:date("2016-12-27"),value:242},{day:date("2017-09-22"),value:315},{day:date("2017-12-04"),value:220},{day:date("2016-03-01"),value:331},{day:date("2018-03-20"),value:2},{day:date("2016-08-05"),value:258},{day:date("2016-04-28"),value:213},{day:date("2017-10-30"),value:18},{day:date("2017-07-31"),value:393},{day:date("2017-03-23"),value:71},{day:date("2017-01-04"),value:161},{day:date("2018-05-23"),value:39},{day:date("2015-08-16"),value:394},{day:date("2016-01-19"),value:200},{day:date("2018-03-01"),value:115},{day:date("2016-12-29"),value:191},{day:date("2015-07-22"),value:228},{day:date("2015-11-18"),value:310},{day:date("2017-02-23"),value:0},{day:date("2015-10-29"),value:157},{day:date("2018-04-20"),value:295},{day:date("2018-06-26"),value:343},{day:date("2017-05-23"),value:35},{day:date("2015-09-20"),value:120},{day:date("2016-08-19"),value:91},{day:date("2017-10-05"),value:303},{day:date("2018-06-08"),value:178},{day:date("2016-12-07"),value:232},{day:date("2018-01-28"),value:275},{day:date("2015-05-24"),value:355},{day:date("2017-11-10"),value:373},{day:date("2016-10-02"),value:291},{day:date("2015-09-03"),value:244},{day:date("2016-03-08"),value:11},{day:date("2016-04-29"),value:32},{day:date("2016-08-18"),value:292},{day:date("2016-07-15"),value:42},{day:date("2017-10-03"),value:138},{day:date("2015-10-07"),value:232},{day:date("2017-05-15"),value:301},{day:date("2015-05-20"),value:126},{day:date("2015-10-02"),value:178},{day:date("2017-12-27"),value:367},{day:date("2016-02-27"),value:159},{day:date("2016-09-22"),value:58},{day:date("2017-10-11"),value:302},{day:date("2016-06-01"),value:248},{day:date("2017-11-23"),value:160},{day:date("2016-06-25"),value:50},{day:date("2016-10-15"),value:48},{day:date("2015-07-28"),value:40},{day:date("2016-09-11"),value:237},{day:date("2016-02-25"),value:342},{day:date("2017-11-29"),value:149},{day:date("2018-03-16"),value:335},{day:date("2018-01-24"),value:125},{day:date("2017-02-16"),value:259},{day:date("2018-06-04"),value:92},{day:date("2015-12-27"),value:293},{day:date("2017-05-28"),value:271},{day:date("2018-03-18"),value:126},{day:date("2016-05-08"),value:79},{day:date("2016-11-28"),value:263},{day:date("2018-07-28"),value:190},{day:date("2017-06-02"),value:340},{day:date("2015-06-23"),value:86},{day:date("2016-10-29"),value:65},{day:date("2016-01-03"),value:327},{day:date("2016-03-29"),value:13},{day:date("2015-04-27"),value:156},{day:date("2018-05-08"),value:105},{day:date("2018-07-05"),value:381},{day:date("2015-07-01"),value:318},{day:date("2015-06-06"),value:339},{day:date("2017-05-12"),value:128},{day:date("2017-04-21"),value:12},{day:date("2015-12-20"),value:383},{day:date("2016-01-14"),value:284},{day:date("2017-01-01"),value:68},{day:date("2017-07-24"),value:207},{day:date("2016-06-15"),value:19},{day:date("2018-05-21"),value:323},{day:date("2017-12-26"),value:352},{day:date("2018-05-24"),value:89},{day:date("2016-07-14"),value:244},{day:date("2018-08-06"),value:304},{day:date("2015-06-10"),value:8},{day:date("2016-06-10"),value:194},{day:date("2016-05-19"),value:126},{day:date("2018-01-07"),value:322},{day:date("2017-02-11"),value:366},{day:date("2018-05-18"),value:263},{day:date("2018-07-27"),value:194},{day:date("2015-11-04"),value:352},{day:date("2018-03-25"),value:239},{day:date("2015-04-18"),value:96},{day:date("2015-11-13"),value:372},{day:date("2015-09-26"),value:77},{day:date("2016-07-10"),value:97},{day:date("2015-12-03"),value:208},{day:date("2017-02-22"),value:322},{day:date("2017-07-02"),value:295},{day:date("2017-11-01"),value:217},{day:date("2017-11-25"),value:396},{day:date("2017-05-09"),value:255},{day:date("2016-02-04"),value:111},{day:date("2017-04-26"),value:255},{day:date("2015-08-08"),value:38},{day:date("2018-06-03"),value:226},{day:date("2016-08-07"),value:165},{day:date("2016-08-22"),value:21},{day:date("2017-12-02"),value:130},{day:date("2016-07-06"),value:39},{day:date("2016-02-13"),value:354},{day:date("2017-09-23"),value:65},{day:date("2018-06-07"),value:331},{day:date("2015-12-10"),value:33},{day:date("2017-05-20"),value:171},{day:date("2018-01-20"),value:250},{day:date("2018-01-01"),value:337},{day:date("2017-11-09"),value:38},{day:date("2017-03-14"),value:298},{day:date("2017-06-26"),value:319},{day:date("2016-01-01"),value:259},{day:date("2016-04-06"),value:16},{day:date("2016-05-29"),value:105},{day:date("2016-12-06"),value:239},{day:date("2016-05-05"),value:131},{day:date("2016-12-26"),value:139},{day:date("2016-04-05"),value:278},{day:date("2018-06-12"),value:196},{day:date("2016-03-11"),value:386},{day:date("2017-01-28"),value:343},{day:date("2015-07-03"),value:278},{day:date("2017-02-26"),value:180},{day:date("2016-02-24"),value:58},{day:date("2016-09-24"),value:312},{day:date("2017-05-03"),value:22},{day:date("2017-07-21"),value:40},{day:date("2016-11-08"),value:116},{day:date("2017-11-22"),value:1},{day:date("2016-02-09"),value:208},{day:date("2015-08-23"),value:109},{day:date("2018-06-17"),value:162},{day:date("2017-01-17"),value:312},{day:date("2015-10-22"),value:51},{day:date("2016-12-04"),value:74},{day:date("2015-11-21"),value:25},{day:date("2017-07-30"),value:192},{day:date("2016-05-17"),value:141},{day:date("2016-10-12"),value:324},{day:date("2017-05-06"),value:342},{day:date("2017-08-27"),value:266},{day:date("2015-12-18"),value:354},{day:date("2016-10-16"),value:98},{day:date("2017-08-09"),value:229},{day:date("2016-10-14"),value:2},{day:date("2015-07-13"),value:199},{day:date("2015-04-03"),value:362},{day:date("2017-02-24"),value:394},{day:date("2015-07-05"),value:335},{day:date("2016-01-05"),value:131},{day:date("2017-11-27"),value:331},{day:date("2018-05-30"),value:137},{day:date("2018-04-04"),value:58},{day:date("2016-02-22"),value:362},{day:date("2017-06-08"),value:262},{day:date("2015-04-07"),value:235},{day:date("2017-05-13"),value:252},{day:date("2015-11-09"),value:263},{day:date("2018-02-09"),value:145},{day:date("2016-05-01"),value:112},{day:date("2015-08-20"),value:59},{day:date("2017-10-12"),value:115},{day:date("2017-01-13"),value:129},{day:date("2018-03-23"),value:297},{day:date("2015-12-23"),value:77},{day:date("2018-07-07"),value:39},{day:date("2015-08-10"),value:368},{day:date("2016-05-26"),value:272},{day:date("2016-04-02"),value:8},{day:date("2015-08-13"),value:163},{day:date("2015-06-04"),value:265},{day:date("2016-11-17"),value:332},{day:date("2018-08-05"),value:255},{day:date("2017-02-03"),value:269},{day:date("2016-09-15"),value:107},{day:date("2018-02-16"),value:385},{day:date("2018-05-20"),value:113},{day:date("2015-10-17"),value:44},{day:date("2016-07-18"),value:335},{day:date("2018-04-15"),value:153},{day:date("2016-06-06"),value:1},{day:date("2015-05-30"),value:213},{day:date("2016-08-01"),value:128},{day:date("2016-04-09"),value:112},{day:date("2018-08-07"),value:95},{day:date("2017-02-08"),value:368},{day:date("2017-07-12"),value:216},{day:date("2015-05-12"),value:113},{day:date("2018-04-26"),value:321},{day:date("2017-02-14"),value:5},{day:date("2015-04-08"),value:82},{day:date("2018-06-02"),value:219},{day:date("2016-08-03"),value:288},{day:date("2016-03-20"),value:374},{day:date("2016-02-02"),value:79},{day:date("2016-06-26"),value:91},{day:date("2015-09-09"),value:155},{day:date("2017-02-04"),value:55},{day:date("2017-04-20"),value:256},{day:date("2018-03-06"),value:22},{day:date("2015-09-27"),value:161},{day:date("2016-03-27"),value:123},{day:date("2017-11-06"),value:30},{day:date("2017-02-05"),value:49},{day:date("2015-06-27"),value:111},{day:date("2018-05-14"),value:250},{day:date("2017-05-14"),value:181},{day:date("2017-07-07"),value:25},{day:date("2016-09-18"),value:178},{day:date("2016-02-11"),value:237},{day:date("2018-02-24"),value:269},{day:date("2018-04-30"),value:11},{day:date("2016-07-01"),value:194},{day:date("2016-08-20"),value:151},{day:date("2016-06-04"),value:210},{day:date("2017-08-08"),value:105},{day:date("2016-04-24"),value:359},{day:date("2015-06-09"),value:203},{day:date("2015-04-20"),value:12},{day:date("2018-03-21"),value:41},{day:date("2016-10-17"),value:375},{day:date("2015-04-25"),value:361},{day:date("2017-04-09"),value:366},{day:date("2018-02-02"),value:243},{day:date("2016-07-24"),value:302},{day:date("2017-12-14"),value:109},{day:date("2016-02-14"),value:196},{day:date("2018-07-21"),value:270},{day:date("2017-12-21"),value:109},{day:date("2016-01-11"),value:369},{day:date("2016-06-08"),value:360},{day:date("2018-04-06"),value:202},{day:date("2016-01-18"),value:182},{day:date("2017-04-14"),value:231},{day:date("2017-09-13"),value:387},{day:date("2017-01-26"),value:301},{day:date("2016-11-26"),value:297},{day:date("2015-05-26"),value:95},{day:date("2017-09-17"),value:54},{day:date("2017-04-30"),value:46},{day:date("2018-07-20"),value:43},{day:date("2018-05-13"),value:356},{day:date("2015-12-14"),value:27},{day:date("2017-04-17"),value:68},{day:date("2015-09-04"),value:295},{day:date("2018-01-31"),value:209},{day:date("2016-01-31"),value:48},{day:date("2018-04-22"),value:232},{day:date("2017-09-18"),value:44},{day:date("2017-06-16"),value:92},{day:date("2018-05-28"),value:17},{day:date("2016-04-21"),value:250},{day:date("2017-11-30"),value:267},{day:date("2016-01-21"),value:49},{day:date("2017-01-10"),value:3},{day:date("2018-07-30"),value:49},{day:date("2017-08-21"),value:336},{day:date("2016-12-24"),value:37},{day:date("2017-12-11"),value:287},{day:date("2017-07-14"),value:332},{day:date("2016-10-13"),value:138},{day:date("2018-04-17"),value:83},{day:date("2017-03-31"),value:344},{day:date("2017-09-24"),value:112},{day:date("2016-06-11"),value:100},{day:date("2018-07-15"),value:151},{day:date("2017-07-17"),value:89},{day:date("2017-08-26"),value:351},{day:date("2018-04-08"),value:2},{day:date("2016-06-27"),value:228},{day:date("2017-04-13"),value:53},{day:date("2017-01-11"),value:8},{day:date("2016-08-17"),value:366},{day:date("2015-12-19"),value:209},{day:date("2018-04-28"),value:323},{day:date("2018-01-10"),value:42},{day:date("2016-04-27"),value:317},{day:date("2016-07-25"),value:366},{day:date("2016-12-15"),value:36},{day:date("2018-06-15"),value:214},{day:date("2016-02-08"),value:389},{day:date("2015-11-16"),value:373},{day:date("2016-12-13"),value:218},{day:date("2017-03-16"),value:170},{day:date("2016-05-21"),value:134},{day:date("2016-03-13"),value:36},{day:date("2018-06-13"),value:194},{day:date("2017-03-19"),value:140},{day:date("2017-05-30"),value:392},{day:date("2017-06-28"),value:173},{day:date("2016-12-20"),value:96},{day:date("2017-07-15"),value:50},{day:date("2016-12-11"),value:395},{day:date("2017-08-20"),value:252},{day:date("2015-07-07"),value:73},{day:date("2018-04-11"),value:381},{day:date("2017-03-07"),value:194},{day:date("2015-08-17"),value:65},{day:date("2017-09-07"),value:312},{day:date("2017-01-09"),value:288},{day:date("2015-05-15"),value:276},{day:date("2017-11-12"),value:21},{day:date("2016-10-10"),value:171},{day:date("2015-05-27"),value:221},{day:date("2016-03-30"),value:213},{day:date("2015-06-18"),value:92},{day:date("2018-02-01"),value:180},{day:date("2017-04-15"),value:308},{day:date("2018-02-12"),value:378},{day:date("2018-06-18"),value:87},{day:date("2016-12-02"),value:363},{day:date("2015-07-10"),value:169},{day:date("2018-07-13"),value:96},{day:date("2018-08-08"),value:173},{day:date("2016-03-12"),value:69},{day:date("2016-04-13"),value:361},{day:date("2015-06-17"),value:35},{day:date("2017-09-30"),value:176},{day:date("2015-07-18"),value:356},{day:date("2017-12-06"),value:49},{day:date("2016-01-15"),value:116},{day:date("2017-11-07"),value:309},{day:date("2016-02-16"),value:268},{day:date("2018-01-13"),value:218},{day:date("2015-10-11"),value:375},{day:date("2017-02-09"),value:142},{day:date("2016-03-25"),value:261},{day:date("2016-12-08"),value:319},{day:date("2016-11-22"),value:244},{day:date("2015-09-02"),value:193},{day:date("2016-03-09"),value:280},{day:date("2017-09-26"),value:18},{day:date("2015-09-19"),value:303},{day:date("2016-07-31"),value:108},{day:date("2016-05-23"),value:2},{day:date("2018-03-10"),value:33},{day:date("2016-09-23"),value:177},{day:date("2016-02-23"),value:149},{day:date("2018-02-17"),value:36},{day:date("2018-01-04"),value:21},{day:date("2017-06-21"),value:269},{day:date("2015-10-30"),value:360},{day:date("2016-03-24"),value:138},{day:date("2017-12-03"),value:46},{day:date("2017-08-30"),value:47},{day:date("2016-10-20"),value:321},{day:date("2016-09-07"),value:352},{day:date("2015-09-21"),value:162},{day:date("2015-11-29"),value:122},{day:date("2016-10-19"),value:305},{day:date("2017-06-11"),value:64},{day:date("2018-02-11"),value:314},{day:date("2015-11-28"),value:398},{day:date("2016-10-09"),value:21},{day:date("2015-10-16"),value:364},{day:date("2015-12-06"),value:144},{day:date("2017-06-23"),value:222},{day:date("2017-08-18"),value:160},{day:date("2017-11-17"),value:2},{day:date("2016-01-06"),value:154},{day:date("2017-01-31"),value:189},{day:date("2015-10-05"),value:66},{day:date("2018-05-29"),value:176},{day:date("2016-08-29"),value:220},{day:date("2017-02-18"),value:46},{day:date("2015-11-24"),value:378},{day:date("2015-07-09"),value:40},{day:date("2018-07-02"),value:60},{day:date("2016-08-26"),value:387},{day:date("2016-10-25"),value:72},{day:date("2017-06-03"),value:164},{day:date("2016-11-14"),value:243},{day:date("2017-03-24"),value:192},{day:date("2016-12-01"),value:178},{day:date("2016-03-10"),value:166},{day:date("2015-07-26"),value:167},{day:date("2015-09-22"),value:149},{day:date("2015-08-21"),value:368},{day:date("2015-09-13"),value:23},{day:date("2015-04-21"),value:19},{day:date("2015-11-07"),value:173},{day:date("2017-12-16"),value:365},{day:date("2015-05-10"),value:387},{day:date("2015-08-27"),value:99},{day:date("2016-11-16"),value:289}] AS row
            WITH row WHERE row.day > date("2018-01-01")
            RETURN row.day AS day, row.value AS value`
    },
    {
        key: TYPE_HEAT_MAP,
        value: TYPE_HEAT_MAP,
        text: 'Heat Map',
        hint: 'A Heat Map expects three keys: the `index` which represents the data series, the `key` which represents the X axis and a numerical `value` which is plotted on the Y axis.',
        component: HeatMap,
        previewQuery: 'UNWIND [[2016, "Crime", 3], [2016, "Musical", 1], [2016, "Adventure", 18], [2016, "Animation", 7], [2016, "Comedy", 20], [2016, "Romance", 7], [2016, "Action", 22], [2016, "Sci-Fi", 13], [2016, "Thriller", 14], [2016, "Horror", 10], [2016, "Western", 1], [2016, "Children", 2], [2016, "Mystery", 3], [2016, "Drama", 17], [2016, "(no genres listed)", 3], [2016, "Fantasy", 8], [2016, "Documentary", 5], [2015, "Western", 3], [2015, "Documentary", 17], [2015, "Romance", 15]] AS row RETURN row[0] as index, row[1] as key, row[2] as value'
    },
    {
        key: TYPE_NETWORK,
        value: TYPE_NETWORK,
        text: 'Network',
        hint: 'A Network expects rows with two keys: `from` and `to`.  Optionally you can supply a `color` and `radius`',
        component: NetworkReport,
        previewQuery: `
            UNWIND [
            { from: 'Adam', to: 'Kane', value: 1 },
            { from: 'Adam', to: 'Abel' },
            { from: 'Kane', to: 'Enoch' },
            { from: 'Enoch', to: 'Lemech' },
            { from: 'Enoch', to: 'Ada' },
            { from: 'Enoch', to: 'Tzila' },
            { from: 'Adam', to: 'Seth' },
            { from: 'Seth', to: 'Enosh' },
            { from: 'Enoch', to: 'All Humanity' }
           ] AS row
           RETURN row.from AS from, row.to AS to, row.value AS value`,
    },
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
    { key: 'avg', value: 'avg', text: 'avg', },
    { key: 'collect', value: 'collect', text: 'collect', },
    { key: 'count', value: 'count', text: 'count', },
    { key: 'max', value: 'max', text: 'max', },
    { key: 'min', value: 'min', text: 'min', },
    { key: 'percentileCont', value: 'percentileCont', text: 'percentileCont', },
    { key: 'percentileDisc', value: 'percentileDisc', text: 'percentileDisc', },
    { key: 'stDev', value: 'stDev', text: 'stDev', },
    { key: 'stDevP', value: 'stDevP', text: 'stDevP', },
    { key: 'sum', value: 'sum', text: 'sum' },
]
