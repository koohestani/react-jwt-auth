import { createContext, useCallback, useContext, useState } from 'react';
import { useStorage } from './storageContext';

const AuthContext = createContext(null);

const getUserState = (storage) => {
    const user = storage.user();
    return user;

    // sometimes we need request to endpoint for get additional user data
    // const { accessToken } = user;
    // request to endpoint and return combining user data and response
};

export const AuthProvider = ({ children }) => {
    const storage = useStorage();
    const [user, setUser] = useState(() => getUserState(storage));

    const login = useCallback(
        (user) => {
            storage.setUser(user);
            setUser(getUserState(storage));
        },
        [storage]
    );

    const logout = useCallback(() => {
        storage.removeUser();
        setUser(null);
    }, [storage]);

    const refresh = useCallback(
        (token) => {
            const persistedUser = storage.user();
            const newUser = { ...persistedUser, ...token };
            storage.setUser(newUser);
            setUser(newUser);
        },
        [storage]
    );

    return (
        <AuthContext.Provider
            value={{
                auth: Boolean(user),
                user,
                login,
                logout,
                refresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth) throw Error('useAuth should use whitin a <AuthProvider />.');

    return auth;
};
