import React from 'react'

export const Field = ({
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
    style
}) => {

    return (
        <div>
            {label && <label className={
                "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " + (labelClassName || '')}
                for={id}>
                {label}
            </label>}
            <input className={inputClassName ||
                "appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
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
            />
        </div>
    )
}