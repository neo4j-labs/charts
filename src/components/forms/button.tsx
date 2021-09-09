import React from 'react'

interface ButtonProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    colour?: 'red' | 'green' | 'blue';
    bg?: 'white';
    text: string;
    px?: number;
    py?: number;
    onClick: Function;
    disabled?: boolean;
}

export default function Button(props: ButtonProps) {
    const handleClick = e => {
        e.preventDefault()

        props.onClick()
    }

    const classes = `px-${props.px || 4} py-${props.py || 2} rounded-md bg-${props.bg || 'white'} border border-${props.colour || 'blue'}-600 text-${props.colour || 'blue'}-600 text-${props.size}`

    return (
        <button className={classes} onClick={handleClick} disabled={props.disabled}>
            {props.text}
        </button>
    )
}