import React from 'react'

// const input = React.createElement('input');
// input.props.va
const Field = ({
    label,
    labelClassName,
    inputClassName,
    type,
    name,
    id,
    min,
    value,
    onChange,
    accept,
    multiple,
    style,
    onBlur,
    noMargin,
    disabled
}) => {
    const inputAttr = {
        type,
        name,
        id,
        min,
        onChange,
        accept,
        multiple,
        style,
        onBlur,
        disabled
    }
    // if value is undefined, react renders empty value attribute
    if (value) inputAttr['value'] = value;
    return (
        <div className={noMargin || 'mt-2'}>
            {label && <label className={
                "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left " + (labelClassName || '')}
                for={id}>
                {label}
            </label>}
            <input className={inputClassName ||
                'px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
                + (disabled ? ' cursor-not-allowed opacity-50' : '')
            }
                {...inputAttr}
            />
        </div>
    )
}

export default Field;