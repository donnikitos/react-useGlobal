import { useState, useEffect } from 'react';
const superGlobal = {
    data: {},
    updater: {},
};
function useGlobal($name, $value = undefined) {
    const [state, setState] = useState(() => {
        if (superGlobal.data[$name] === undefined && $value !== undefined)
            superGlobal.data[$name] = $value;
        return superGlobal.data[$name];
    });
    useEffect(() => {
        if (state != superGlobal.data[$name])
            setState(superGlobal.data[$name]);
        if (!superGlobal.updater[$name])
            superGlobal.updater[$name] = [];
        superGlobal.updater[$name].push(setState);
    }, []);
    function updater($input) {
        superGlobal.data[$name] = $input;
        for (const i in superGlobal.updater[$name])
            superGlobal.updater[$name][i](superGlobal.data[$name]);
    }
    return [state, updater];
}
export default useGlobal;
