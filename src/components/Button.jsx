import React from 'react';

/**
 * Creates styled button 
 */
const Button = ({ onClick, type, text, disabled, style }) => {
    return (
        <button
            type={type || 'button'}
            onClick={!disabled && onClick}
            className={
                (
                    disabled ? 'cursor-not-allowed bg-blue-200' : 'bg-blue-500'
                ) +
                " text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3"
            }
            style={{ transition: "all .15s ease", ...style }}
        >
            {text}
        </button>
    );
};

export default Button;