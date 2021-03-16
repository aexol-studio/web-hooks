import { useEffect, useState } from 'react';
export function useStoreText<T>(key: string): [T | undefined, (v: T) => void];
export function useStoreText<T>(key: string, initialValue: T): [T, (v: T) => void];
/*
useStoreText allows to use local storage and listening to its changes as a state container updating react components.
You need to provide type or interface or initialState 
*/
export function useStoreText<T = unknown>(key: string, initialValue?: T) {
    const initialStorageValue = window.localStorage.getItem(key);
    const [value, setValue] = useState<T>(initialStorageValue ? JSON.parse(initialStorageValue) : initialValue);
    useEffect(() => {
        const ste = (storageEvent: StorageEvent) => {
            if (storageEvent.key === key) {
                if (!storageEvent.newValue) {
                    return;
                }
                setValue(JSON.parse(storageEvent.newValue));
            }
        };
        window.addEventListener('storage', ste);
        return () => {
            window.removeEventListener('storage', ste);
        };
    }, []);
    return [
        value,
        (v: T) => {
            window.localStorage.setItem(key, JSON.stringify(v));
            const storageEvent = new StorageEvent('storage', {
                key,
                oldValue: JSON.stringify(value),
                newValue: JSON.stringify(v),
            });
            window.dispatchEvent(storageEvent);
        },
    ] as const;
}
