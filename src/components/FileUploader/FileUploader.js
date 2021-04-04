import React from 'react';
import IconButton from '../IconButton/IconButton';
import pictureIcon from './picture.svg';
import './FileUploader.scss';

export default function FileUploader({
    file,
    className = '',
    icon = pictureIcon,
    text = 'Загрузить картинку',
    model = 'icon',
    accept = 'image/*',
}) {
    const input = React.useRef(null);

    const uploadHandler = () => {
        input.current.click();
    };

    const classes = ['file-uploader'];

    if (className) classes.push(className);

    return (
        <label className={classes.join(' ')}>
            <input
                ref={input}
                accept={accept}
                className="file-uploader__input"
                type="file"
                {...file.bind()}
            />
            {model === 'icon' ? (
                <IconButton
                    onClick={() => {
                        uploadHandler();
                    }}
                    icon={pictureIcon}
                />
            ) : (
                <div className="file-uploader__inner">
                    <img src={icon} alt="" />
                    <span>{text}</span>
                </div>
            )}
        </label>
    );
}
