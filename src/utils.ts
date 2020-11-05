/* eslint-disable */
import Builder, { Operator } from "@neode/querybuilder";
import { directions, operators } from "./constants";
import { Query } from "./store/actions";

interface CypherOutput {
    cypher: string;
    params: Record<string, any>;
}

export function queryToCypher(query: string | Query): CypherOutput {
    if (  typeof query === 'string' ) {
        return {
            cypher: query,
            params: {}
        }
    }

    const builder = new Builder()

    const { nodes, relationships, predicates, output } = query as Query
    const endNodes = relationships.map(rel => rel.to)

    const root = nodes.find(node => !endNodes.includes(node.id))

    builder.match(root!.id, root?.label)

    let lastEnd = root!.id

    relationships.map(rel => {
        const to = nodes.find(node => node.id === rel.to)

        if ( lastEnd !== rel.from ) {
            builder.match(rel.from)
        }

        lastEnd = rel.to

        builder.relationship(rel.type, directions[ rel.direction ], rel.id)
        builder.to(rel.to, to?.label)
    })

    predicates.map(output => {
        const operator = operators[ output.condition ]

        if ( output.negative ) {
            switch (operator) {
                case Operator.CONTAINS:
                    builder.whereNotContains(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.STARTS_WITH:
                    builder.whereNotStartsWith(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.ENDS_WITH:
                    builder.whereNotEndsWith(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.GREATER_THAN:
                    builder.whereLessThan(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.GREATER_THAN_OR_EQUAL:
                    builder.whereLessThanOrEqual(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.LESS_THAN:
                    builder.whereGreaterThan(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.LESS_THAN_OR_EQUAL:
                    builder.whereGreaterThanOrEqual(`${output.alias}.${output.name}`, output.value)
                    break;

                default:
                    builder.whereNot(`${output.alias}.${output.name}`, output.value)
                    break;
            }
        }
        else {
            switch (operator) {
                case Operator.CONTAINS:
                    builder.whereContains(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.STARTS_WITH:
                    builder.whereStartsWith(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.ENDS_WITH:
                    builder.whereEndsWith(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.GREATER_THAN:
                    builder.whereGreaterThan(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.GREATER_THAN_OR_EQUAL:
                    builder.whereGreaterThanOrEqual(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.LESS_THAN:
                    builder.whereLessThan(`${output.alias}.${output.name}`, output.value)
                    break;

                case Operator.LESS_THAN_OR_EQUAL:
                    builder.whereLessThanOrEqual(`${output.alias}.${output.name}`, output.value)
                    break;

                default:
                    builder.where(`${output.alias}.${output.name}`, output.value)
                    break;
            }
        }

    })

    output.map(output => {
        let field = `${output.alias}.${output.name}`

        if ( output.aggregate ) {
            field = `${output.aggregate}(${field})`
        }

        if ( output.as ) {
            field += ` AS ${output.as}`
        }

        builder.return(field)
    })

    return builder.build()
}