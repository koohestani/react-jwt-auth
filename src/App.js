import { StorageProvider } from './contexts/storageContext';
import { userPersistor } from './helpers/userPersistor';

const App = () => {
    return (
        <StorageProvider storage={userPersistor}>
            <div className='App'>
                <h1>Bootstrap App</h1>
            </div>
        </StorageProvider>
    );
};

export default App;
