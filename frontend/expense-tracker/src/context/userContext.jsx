


import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    // Load user from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); 
    }, []);

    // Function to update user data and store in localStorage
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
    };

    // Function to clear user data (eg: on logout)
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user"); 
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                loading, // ✅ Expose loading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
