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
    noMargin,
    disabled
}) => {
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
                disabled={disabled}
            />
        </div>
    )
}

export default Field;