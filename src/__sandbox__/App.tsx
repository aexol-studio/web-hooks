import React, { useEffect } from 'react';
import { useStoredState } from '@/hooks/useStoredState';

enum MyStorage {
    key1 = 'key1',
    key2 = 'key2',
}

const useMyStorageState = useStoredState(MyStorage);

export const App = () => {
    const [k1, setK1] = useMyStorageState(MyStorage.key1, {
        message: 'Hello world 1',
    });
    useEffect(() => {
        setTimeout(() => {
            setK1({ message: 'TS dla mnie' + new Date().toISOString() });
        }, 8000);
    }, []);
    return <div>{k1.message}</div>;
};
