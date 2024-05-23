import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ApiContext = createContext(null);

const ApiContextProvider = ({ children }) => {
    const [loading, setLoading] = useState({});

    useEffect(() => {
        console.log("loading", loading);
    }, [loading]);

    function changeLoading(key, value) {
        setLoading((prev) => {
            return { ...prev, [key]: value };
        });
    }

    return (
        <ApiContext.Provider value={{ loading, setLoading, changeLoading }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContextProvider;
