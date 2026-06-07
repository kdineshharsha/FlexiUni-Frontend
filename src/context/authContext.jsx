import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })

    const login = (token, userData) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData);
    }

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
}