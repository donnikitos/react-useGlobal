declare function useGlobal(varName: string, initValue?: any): [getValue: any, (newValue: any) => void];
export default useGlobal;
