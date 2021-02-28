import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
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
        const id = uuid();
        if (state != superGlobal.data[$name])
            setState(superGlobal.data[$name]);
        if (!superGlobal.updater[$name])
            superGlobal.updater[$name] = {};
        superGlobal.updater[$name][id] = setState;
        return () => {
            delete superGlobal.updater[$name][id];
            if (Object.keys(superGlobal.updater[$name]).length <= 0)
                delete superGlobal.updater[$name];
        };
    }, []);
    function updater($input) {
        for (const i in superGlobal.updater[$name])
            superGlobal.updater[$name][i]($input);
        superGlobal.data[$name] = state;
    }
    return [state, updater];
}
export default useGlobal;
