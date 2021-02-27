declare function useGlobal<T extends any>($name: string, $value?: T): (T | (($input: T) => void))[];
export default useGlobal;
