import React from 'react';
import logo from './logo.svg';
import './Logo.scss';

export default function Logo({ className = '' }) {
    const classes = ['logo'];

    if (className) classes.push(className);

    return (
        <a className={classes.join(' ')} href="/">
            <img src={logo} alt="Логотип" />
        </a>
    );
}
