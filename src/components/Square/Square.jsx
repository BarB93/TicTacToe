import React from 'react'

const Square = (props) => {
    const active = props.isActive? 'active' : ''

    return (
        <button className={`square ${active}`}
                onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square