import React from 'react';


const superGlobal = {
	set update($value) {
		this.data = {
			...this.data,
			...$value
		};

		for(const sub of this.subscribers) {
			const data = (sub[1] ? this.data[(sub[1])] : this.data);

			sub[0](data);
		}
	},
	data: {},
	subscribers: []
};

function useGlobal($name = null) {
	const [state, setState] = React.useState(false);

	React.useEffect(() => {
		superGlobal.subscribers.push([
			setState,
			$name
		]);
	}, []);


	return [
		state,
		($input) => {
			superGlobal.update = ($name ? { [$name]: $input } : $input);
		}
	];
}
export default useGlobal;
