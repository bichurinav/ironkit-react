import React from 'react';
import './TempImage.scss';

function TempImage({ upload, size = '120px' }) {
    return (
        <div className="temp-image">
            <img
                className="temp-image__image"
                height={size}
                src={URL.createObjectURL(upload.files(0))}
                alt=""
            />
            <span
                onClick={() => upload.clear()}
                className="close temp-image__close"
            >
                &times;
            </span>
        </div>
    );
}

export default TempImage;
