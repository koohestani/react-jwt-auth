import { Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

import { AuthProvider } from './contexts/authContext';
import { StorageProvider } from './contexts/storageContext';
import { userPersistor } from './helpers/userPersistor';

const App = () => {
    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <StorageProvider storage={userPersistor}>
                <AuthProvider>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </AuthProvider>
            </StorageProvider>
        </div>
    );
};

export default App;
