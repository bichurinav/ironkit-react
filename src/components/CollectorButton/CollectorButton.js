import React from 'react'
import './CollectorButton.scss'

export default function CollectorButton({src, className}) {
    
    const classes = [
        'button',
        'primary',
        'outlined',
        'collector-btn',
    ]
    
    if (className) classes.push(className);
    
    return (
        <button className={classes.join(' ')}>
            <span className="collector-btn__label">Сборщик</span>
            <div className="collector-btn__icon">
                <img className="collector-btn__img" src={src} alt=""/>
                <span className="collector-btn__counter">0</span>
            </div>
        </button>
    )
}
