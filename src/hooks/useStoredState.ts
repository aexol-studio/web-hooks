import { useState } from 'react';

export function useStoredState<T>(key: string): [T | undefined, (v: T) => void];
export function useStoredState<T>(key: string, initialValue: T): [T, (v: T) => void];

export function useStoredState<Z = unknown>(key: string, initialValue?: Z) {
    const initialStorageValue = window?.localStorage.getItem(key);
    const [value, setValue] = useState<Z>(initialStorageValue ? JSON.parse(initialStorageValue) : initialValue);
    return [
        value,
        (v: Z) => {
            window.localStorage.setItem(key, JSON.stringify(v));
            setValue(v);
        },
    ] as const;
}
