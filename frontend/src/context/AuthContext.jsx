import { createContext, useState, useContext } from "react";
import * as authService from "../services/authService"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("access_token");
        return token ? { loggedIn: true } : null;
    });

    const handleLogin = async (credentials) => {
        const data = await authService.login(credentials);
        setUser({ loggedIn: true });
        return data;
    };

    const handleRegister = async (data) => {
        const res = await authService.register(data);
        setUser({ loggedIn: true });
        return res;
    };

    const handleLogout = async () => {
        await authService.logout(); 
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login: handleLogin, 
            register: handleRegister, 
            logout: handleLogout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);