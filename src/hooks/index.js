import React from 'react';

export function useInput(state) {
	const [input, setInput] = React.useState(state);
	const [files, setFiles] = React.useState([]);

	const onChange = (event) => {
		if (event.target.files) {
			setFiles(event.target.files);
		}
		setInput(event.target.value);
	};

	return {
		bind() {
			return { value: input, onChange };
		},
		clear() {
			if (files.length) setFiles([]);
			setInput('');
		},
		value() {
			return input;
		},
		files(file = 'multiple') {
			if (file === 0) return files[0];
			return files;
		},
	};
}
