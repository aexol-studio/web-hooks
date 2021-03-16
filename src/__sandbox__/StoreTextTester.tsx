import React from 'react';
import { useStoreText } from '@/hooks/useStoreText';
import { MyStorage } from '@/__sandbox__/models';

export const StoreTextTester = () => {
    const [testStoreText] = useStoreText(MyStorage.key2, 'bbbbb');

    return (
        <div>
            <div>useStoreText in other place</div>
            <div>{testStoreText}</div>
        </div>
    );
};
