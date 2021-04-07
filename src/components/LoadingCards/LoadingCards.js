import React from 'react';
import './LoadingCards.scss';

function LoadingCards({ className }) {
    return (
        <div className={`load-cards ${className}`}>
            <div className="load-cards__card"></div>
            <div className="load-cards__card"></div>
            <div className="load-cards__card"></div>
            <div className="load-cards__card"></div>
            <div className="load-cards__card"></div>
            <div className="load-cards__card"></div>
        </div>
    );
}

export default LoadingCards;
