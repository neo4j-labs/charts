import React, { useContext } from "react";
import { Neo4jContext } from "use-neo4j";
import { version } from '../../package.json'

export default function Footer() {
    const context = useContext(Neo4jContext)
    let host = <span></span>

    if ( context.driver ) {
        const address = context.driver['_meta'].address
        const auth = context.driver['_connectionProvider']['_authToken']

        host = <span> |  Connected to
            {' '}
            <strong>{address._host}:{address._port}</strong> as
            {' '}
            <strong>{auth.principal}</strong>
        </span>
    }

    return (
        <div className="container m-auto">
            <div className="text-xs border-t border-gray-400 p-4 bg-gray-100">
                Charts v{version}
                {host}
            </div>
        </div>
    )

}