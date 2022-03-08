import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const AuthenticatedHome = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h2>Welcome {user.username}</h2>
            <Link className='btn btn-primary me-2' to='/private'>
                Private Page !
            </Link>
            <button className='btn btn-primary' onClick={logout}>
                Logout
            </button>
        </div>
    );
};

const UnAuthenticatedHome = () => {
    return (
        <div>
            <h2>Hello, welcome to auth project!</h2>
            <Link className='btn btn-primary me-2' to='/login'>
                Login
            </Link>
            <Link className='btn btn-success' to='/register'>
                Register
            </Link>
        </div>
    );
};

const Home = () => {
    const { auth } = useAuth();
    return auth ? <AuthenticatedHome /> : <UnAuthenticatedHome />;
};

export default Home;
