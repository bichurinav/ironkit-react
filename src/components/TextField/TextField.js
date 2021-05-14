import React from 'react';
import './TextField.scss';

function TextField({
    label,
    name,
    type = 'text',
    placeholder = '',
    field = { bind: () => null, error: () => null },
}) {
    return (
        <label className="text-field">
            {label ? <span className="text-field__label">{label}</span> : null}
            <input
                className="input primary text-field__input"
                name={name}
                type={type}
                autoComplete={'on'}
                placeholder={placeholder}
                {...field.bind()}
            />
            <span className="text-field__error">{field.error()}</span>
        </label>
    );
}

export default TextField;
