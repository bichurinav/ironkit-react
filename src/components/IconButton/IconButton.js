import React from 'react';
import './IconButton.scss';

export default function IconButton({
	icon,
	size = '25px',
	alt = '',
	className = '',
	onClick = () => {},
	type = 'button',
}) {
	const classes = ['icon-btn'];

	if (className) classes.push(className);

	return (
		<button
			type={type}
			style={{ width: size, height: size }}
			className={classes.join(' ')}
			onClick={onClick}
		>
			<img className="icon-btn__svg" src={icon} alt={alt} />
		</button>
	);
}
