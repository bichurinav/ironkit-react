import React from 'react';
import './Content.scss';

export default function Content({ children }) {
	return (
		<main className="content">
			<div className="content__inner container">{children}</div>
		</main>
	);
}
