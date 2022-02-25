import { createContext, useContext } from 'react';

const StorageContext = createContext(null);

export const StorageProvider = ({ children, storage }) => {
    return (
        <StorageContext.Provider value={storage}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorage = () => {
    const storage = useContext(StorageContext);
    if (!storage)
        throw Error('useStorage should use whitin a <StorageProvider />');

    return storage;
};
