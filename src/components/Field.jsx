import React from 'react'

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
    noMargin
}) => {
    return (
        <div className={noMargin || 'mt-2'}>
            {label && <label className={
                "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left " + (labelClassName || '')}
                for={id}>
                {label}
            </label>}
            <input className={inputClassName ||
                // "appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                'px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
            }
                type={type}
                name={name}
                id={id}
                min={min}
                value={value}
                onChange={onChange}
                accept={accept}
                multiple={multiple}
                style={style}
                onBlur={onBlur}
            />
        </div>
    )
}

export default Field;