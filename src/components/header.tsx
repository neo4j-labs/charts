import React from 'react'
import { Link } from 'react-router-dom'
import Button from './forms/button'

export default function Header(props) {

    const { sectionText, sectionLink, pageTitle, buttons, savedAt, children } = props

    return (
        <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4">
                <div className="flex justify-top flex-grow-0 mr-2 py-2">
                    <Link className="block bg-transparent font-bold focus:outline-none" to={sectionLink}>
                        <span className="text-blue-600 mr-2">
                        {sectionText}
                        </span>
                        {pageTitle && <span className="text-gray-400"> / </span>}
                    </Link>
                </div>
                <div className="flex justify-top font-bold py-2">
                    {pageTitle}
                </div>
                {children}

                <div className="flex flex-grow"></div>

                <div className="ml-2 flex flex-row">
                    {savedAt && <div className="p-2 text-gray-500 text-italic text-sm">Last saved {savedAt.toString()}</div>}
                    {buttons && buttons.map(button => <div className="ml-2" key={button.text}><Button  size="sm" colour={button.colour || 'blue'} text={button.text} onClick={button.onClick} /></div>)}

                </div>
            </div>
    )
}