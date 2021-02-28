import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const superGlobal = {
	data: {},
	updater: {},
};

function useGlobal<T extends any>($name: string, $value: T = undefined!) {
	const [state, setState] = useState<T>(() => {
		if (superGlobal.data[$name] === undefined && $value !== undefined)
			superGlobal.data[$name] = $value;

		return superGlobal.data[$name];
	});

	useEffect(() => {
		const id = uuid();

		if (state != superGlobal.data[$name]) setState(superGlobal.data[$name]);

		if (!superGlobal.updater[$name]) superGlobal.updater[$name] = {};

		superGlobal.updater[$name][id] = setState;

		return () => {
			delete superGlobal.updater[$name][id];

			if(Object.keys(superGlobal.updater[$name]).length <= 0)
				delete superGlobal.updater[$name];
		};
	}, []);

	function updater(
		$input: Parameters<typeof setState>[0],
	) {
		superGlobal.data[$name] = $input;

		for (const i in superGlobal.updater[$name])
			superGlobal.updater[$name][i](superGlobal.data[$name]);
	}

	return [state, updater] as [typeof state, typeof updater];
}
export default useGlobal;
