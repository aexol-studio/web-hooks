# web-hooks

Common hooks to use inside browser react apps

## Hooks ideas

Here I will put some ideas

### useStoredState

### useStoreText

This is a hook which allows to use local storage as a context provider. So you can reuse state across components without any provider code!

Component1.tsx

```tsx
import React from 'react';
import { useStoreText } from '@/hooks/useStoreText';
import { MyStorage } from '@/__sandbox__/models';

export const Component1 = () => {
    const [testStoreText,setTestStoreText] = useStoreText('myValue', 'bbbbb');

    return (
        <div>
            <div>useStoreText somewhere the value is loaded from local storage</div>
            <div>{testStoreText}</div>
            <button onClick={() => setTestStoreText(new Date().toLocaleString())}>
        </div>
    );
};
```

Component2.tsx

```tsx
import React from 'react';
import { useStoreText } from '@/hooks/useStoreText';
import { MyStorage } from '@/__sandbox__/models';

export const Component2 = () => {
    const [testStoreText] = useStoreText('myValue');

    return (
        <div>
            <div>useStoreText in other place it will be updated when the 1st one will be</div>
            <div>{testStoreText}</div>
        </div>
    );
};
```
