import { gql } from "@apollo/client";
import { client, neo4jDesktopGraphAppId, relateProjectId, relateApiToken, relateUrl } from './client';

const GET_PROJECT_FILES = gql`
    query GetProject($projectId: String!) {
        getProject(name: $projectId) {
            id
            files {
            name
            directory
            extension
            downloadToken
            }
        }
    }
`

const ADD_PROJECT_FILE = gql`
    mutation AddFile(
        $projectId: String!
        $fileUpload: Upload!
        $destination: String
        $overwrite: Boolean
    ) {
        addProjectFile(
            name: $projectId
            fileUpload: $fileUpload
            destination: $destination
            overwrite: $overwrite
        ) {
            name
            directory
            extension
            downloadToken
        }
    }
`

const DELETE_PROJECT_FILE = gql`
    mutation RemoveFile($projectId: String!, $filePath: String!) {
        removeProjectFile(name: $projectId, filePath: $filePath) {
            name
            directory
        }
    }
`


export function saveFile(filePath: string, contents: string) {
    return client.mutate({
        mutation: DELETE_PROJECT_FILE,
        variables: {
            projectId: relateProjectId,
            filePath: filePath,
        }
    })
        .catch(e => console.log(e))
        .then(() => {
            return client.mutate({
                mutation: ADD_PROJECT_FILE,
                variables: {
                    projectId: relateProjectId,
                    fileUpload: new File([contents], filePath),
                }
            })
                .then(res => console.log(res))
                .catch(e => console.error(e));
        })
}

interface ProjectFile {
    name: string;
    extension: string;
    downloadToken: string;
}

export function getProjectFiles(): Promise<ProjectFile[]> {
    if ( !relateApiToken ) {
        console.log('no api token')
        return Promise.resolve([])
    }

    return client.query({
        query: GET_PROJECT_FILES,
        variables: {
            projectId: relateProjectId,
            filterValue: 'json',
        }
    })
        .then(res => res.data.getProject.files)
        .catch(e => {
            console.log('Error while getting project files', e)

            return []
        })
}

export function getFileContents(file: string, token: string): Promise<string | void> {
    return fetch(`${relateUrl}/files/${token}/${file}`, {
        headers: {
            'X-API-Token': relateApiToken,
            'X-Client-Id': neo4jDesktopGraphAppId,
        } as Record<string, string>
    })
        .then(r => r.text())
        .catch(r => console.log('Error getting file contents', r))
}

export function getFileContentsAsJson(file: string, token: string) {
    return getFileContents(file, token)
        .then(r => JSON.parse(r as string))
}