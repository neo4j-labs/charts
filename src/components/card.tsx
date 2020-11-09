import React from 'react'
import { Link } from 'react-router-dom'
import Tab from './tab'

interface CardTab {
    active?: boolean;
    text: string;
    onClick: () => void;
}

interface Action {
    to: string | Record<string, any>;
    text: string;
}

interface CardProps {
    title?: string;
    titleActive?: boolean;
    onTitleClick?: () => void;
    tabs?: CardTab[];
    children?: any;
    actions?: Action[]
}

export default function Card(props: CardProps) {
    const handleTitleClick = () => {
        props.onTitleClick && props.onTitleClick()
    }

    let titleClasses = `card-title text-xl text-gray-700 font-bold pb-4 cursor-pointer border-b-2 ${props.titleActive ? 'border-blue-600' : 'border-transparent'}`

    return (
        <div className="card bg-white shadow-sm rounded-md p-4">
            <div className="card-header border-b border-gray-200 pt-2 flex flex-row align-baseline mb-2">
                <h1 className={titleClasses} onClick={handleTitleClick}>{ props.title }</h1>
                <div className="card-spacer flex-grow"></div>

                {props.tabs?.map((tab, index) => <Tab key={index} text={tab.text} active={tab.active} onClick={tab.onClick} />)}

            </div>
            <div className="flex flex-col h-64 overflow-auto text-gray-600">
                {props.children}
            </div>

            {props.actions?.length && <div className="flex flex-grow-0 justify-end border-t border-gray-200 pt-3">
                {props.actions.map(action => <Link key={action.text} to={action.to} className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
                    {action.text}
                </Link>)}
            </div>}
        </div>
    )
}
