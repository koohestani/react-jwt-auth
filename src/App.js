import { AuthProvider } from './contexts/authContext';
import { StorageProvider } from './contexts/storageContext';
import { userPersistor } from './helpers/userPersistor';

const App = () => {
    return (
        <StorageProvider storage={userPersistor}>
            <AuthProvider>
                <div className='App'>
                    <h1>Bootstrap App</h1>
                </div>
            </AuthProvider>
        </StorageProvider>
    );
};

export default App;
