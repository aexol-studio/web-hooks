import React, { useEffect } from 'react';
import { useStoredState } from '@/hooks/useStoredState';
import { useStoreText } from '@/hooks/useStoreText';
import { MyStorage } from '@/__sandbox__/models';
import { StoreTextTester } from '@/__sandbox__/StoreTextTester';

const useMyStorageState = useStoredState(MyStorage);

export const App = () => {
    const [k1, setK1] = useMyStorageState(MyStorage.key1, {
        message: 'Hello world 1',
    });
    const [testStoreText, setStoreText] = useStoreText(MyStorage.key2, 'aaaaa');
    useEffect(() => {
        setTimeout(() => {
            setK1({ message: 'TS dla mnie' + new Date().toISOString() });
            setStoreText('Hello world ' + new Date().toLocaleString());
        }, 2000);
    }, []);
    return (
        <div>
            <div>useStoredState</div>
            <div>{k1.message}</div>
            <div>useStoreText</div>
            <div>{testStoreText}</div>
            <StoreTextTester />
        </div>
    );
};
