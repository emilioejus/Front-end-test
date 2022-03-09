import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({children})=> {
    const [count, setCount] = useState(localStorage.getItem("count") ? localStorage.getItem("count") : 0);

    return (
        <AppContext.Provider value={{
            count, 
            setCount 
        }}>
            {children}
        </AppContext.Provider>
    )
}; 