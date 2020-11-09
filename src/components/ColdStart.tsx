import React from 'react'
import Button from './forms/button'

export default function ColdStart({ title, buttonText, children, onButtonClick  }) {
    return (
        <div className="flex flex-col w-full">
            <div className="p-12 bg-white w-auto m-auto">
                <h2 className="font-bold text-xl text-center text-blue-600">{title}</h2>
                {children}
                <div className="text-center">
                    <Button size="md" colour="blue" text={buttonText} onClick={onButtonClick} />
                </div>
            </div>
        </div>
    )
}