import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import { StorageProvider } from './contexts/storageContext';
import { userPersistor } from './helpers/userPersistor';

import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Private from './pages/Private';

const App = () => {
    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <StorageProvider storage={userPersistor}>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route element={<RequireAuth />}>
                            <Route path='/private' element={<Private />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </StorageProvider>
        </div>
    );
};

export default App;
