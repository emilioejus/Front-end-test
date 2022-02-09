import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({children})=> {
    const [itemId, setItemId] = useState("");
    const [count, setCount] = useState(0);

    return (
        <AppContext.Provider value={{
            itemId,
            count, 
            setItemId,
            setCount 
        }}>
            {children}
        </AppContext.Provider>
    )
}; 