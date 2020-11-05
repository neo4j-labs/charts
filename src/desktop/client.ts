import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const url = window.location.href

const searchParams = new URL(url).searchParams

export const isDesktop = searchParams.has('relateApiToken')
export const relateUrl = searchParams.get('relateUrl')
export const relateApiToken = searchParams.get('relateApiToken')
export const neo4jDesktopProjectId = searchParams.get('neo4jDesktopProjectId') || "project-1da821f1-357b-4d61-b349-95ae21189360"
export const neo4jDesktopGraphAppId = searchParams.get('neo4jDesktopGraphAppId') || 'neo4j-bloom'

// typePolicies allow apollo cache to use these fields as 'id'
// for automated cache updates when updating a single existing entity
// https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-identifier-generation-by-type
const apolloCache = new InMemoryCache({
    typePolicies: {
        RelateFile: {
            keyFields: ['name', 'directory']
        },
        Project: {
            fields: {
                files: {
                    merge: false // prefer incoming over existing data.
                }
            }
        }
    }
})

// https://www.apollographql.com/blog/file-uploads-with-apollo-server-2-0-5db2f3f60675/
const uploadLink = createUploadLink({
    uri: `${relateUrl || ''}/graphql`,
    credentials: 'same-origin',
    headers: {
        'keep-alive': 'true',
        'X-API-Token': relateApiToken,
        'X-Client-Id': neo4jDesktopGraphAppId
    }
})


export const client = new ApolloClient({
    cache: apolloCache,
    link: uploadLink
})
