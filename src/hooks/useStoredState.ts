import { useEffect, useState } from 'react';

interface StoredStateOptions {
    listenToLocalStorageChanges: boolean;
}

export const useStoredState = <T>(keysEnum: T, options?: StoredStateOptions) => <Z>(
    key: T[keyof T],
    initialValue: Z,
) => {
    const stringifiedKey = (key as unknown) as string;
    const initialStorageValue = window.localStorage.getItem(stringifiedKey);
    const [value, setValue] = useState<Z>(initialStorageValue ? JSON.parse(initialStorageValue) : initialValue);
    useEffect(() => {
        if (options?.listenToLocalStorageChanges) {
            window.addEventListener('storage', (storageEvent) => {
                if (storageEvent.key === stringifiedKey) {
                    if (!storageEvent.newValue) {
                        return;
                    }
                    setValue(JSON.parse(storageEvent.newValue));
                }
            });
        }
    }, [options?.listenToLocalStorageChanges]);
    return [
        value,
        (v: Z) => {
            window.localStorage.setItem(stringifiedKey, JSON.stringify(v));
            setValue(v);
        },
    ] as const;
};
