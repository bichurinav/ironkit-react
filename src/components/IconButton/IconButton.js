import React from 'react'
import './IconButton.scss'

export default function IconButton(
    {
        src, size = '25px', alt = '', className = ''
    }
    ) {
    
    const classes = [
        'icon-btn'
    ]
    
    if (className) classes.push(className);
    
    return (
        <button style={{width: size, height: size}} className={classes.join(' ')}>
          <img className="icon-btn__svg" src={src} alt={alt} />
        </button>
    )
}
