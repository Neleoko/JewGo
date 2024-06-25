import React from 'react';

export const StatusBarColorContext = React.createContext({
    statusBarColor: '#F4F4F9',
    setStatusBarColor: (color: string) => {},
});