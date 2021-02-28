/// <reference types="react" />
declare function useGlobal<T extends any>($name: string, $value?: T): [T, ($input: import("react").SetStateAction<T>) => void];
export default useGlobal;
