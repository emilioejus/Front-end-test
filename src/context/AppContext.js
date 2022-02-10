import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({children})=> {
    const [itemId, setItemId] = useState(localStorage.getItem("itemId"));
    const [count, setCount] = useState(localStorage.getItem("count") ? localStorage.getItem("count") : 0);

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