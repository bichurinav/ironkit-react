import React from 'react';
import './TextField.scss';

function TextField({ name, placeholder = '' }) {
    return (
        <label className="text-field">
            <span className="text-field__label">{name}</span>
            <input
                className="input primary"
                name={name}
                type="text"
                placeholder={placeholder}
            />
        </label>
    );
}

export default TextField;
