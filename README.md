useGlobal
===========

[![NPM version](https://badgen.net/npm/v/react-useglobal)](https://www.npmjs.com/package/react-useglobal)
[![License](https://badgen.net/npm/license/react-useglobal)](https://www.npmjs.com/package/react-useglobal)

A React.js hook to share and use global variables between unconnected components.

Install with [npm](https://www.npmjs.com/):

```bash
# via npm
npm install --save-dev react-useglobal
```

## Usage

The `useGlobal` function may take a string or no arguments. The supplied string represents the name of a global variable, that the hook is supposed to interact with.
The function returns a getter variable and a setter function very much like a normal useState hook in React.js.

The setter function may take up to 2 parameters:
* 1st - name of variable the hook points to

```js
import React from 'react';
import useGlobal from 'react-useglobal';


// use in Component
export default function Comp(props) {
	const [allGlobals, setAllGlobals] = useGlobal();			// Access all global variables
	const [gVar, setGVar] = useGlobal('somename');				// Access specified global variable

	React.useEffect(() => {
		setGVar('Hello world');
		setAllGlobals({othervar: 'i am global'});				// modify global variables
	}, []);

	return (<div>
		{allGlobals.somename} {/* output: Hello world */}<br />
		{gVar} {/* output: Hello world */}<br />
		{allGlobals.othervar} {/* output: i am global */}<br />
	</div>);
};
```

## License

[MIT](LICENSE) Copyright (c) 2020 Nikita 'donnikitos' Nitichevski.
