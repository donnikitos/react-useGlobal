import { useState, useEffect } from 'react';

const superGlobal = {
	data: {},
	updater: {},
};

function useGlobal<T extends any>($name: string, $value: T = undefined!): [T, (input: T) => void] {
	const [state, setState] = useState<T>(() => {
		if (superGlobal.data[$name] === undefined && $value !== undefined)
			superGlobal.data[$name] = $value;

		return superGlobal.data[$name];
	});

	useEffect(() => {
		if (state != superGlobal.data[$name]) setState(superGlobal.data[$name]);

		if (!superGlobal.updater[$name]) superGlobal.updater[$name] = [];

		superGlobal.updater[$name].push(setState);
	}, []);

	function updater($input: T) {
		superGlobal.data[$name] = $input;

		for (const i in superGlobal.updater[$name])
			superGlobal.updater[$name][i](superGlobal.data[$name]);
	}

	return [state, updater];
}
export default useGlobal;
