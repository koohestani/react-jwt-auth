import React, { useState } from 'react';

import { authService } from '../services/authService';
import { useAuth } from '../contexts/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

const INIT_CREDENTIALS = {
    email: '',
    password: '',
    rememberme: true,
};

const Login = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const redirect = state?.from ? state.form : '/';
    
    const [pending, setPending] = useState(false);
    const [credentials, setCredentials] = useState(INIT_CREDENTIALS);
    const { auth, login } = useAuth();
    
    if (auth)
        return navigate(redirect, { replace: true });
    
    const onChange = ({ target }) => {
        let { name, value } = target;
        if (target.type === 'checkbox') value = target.checked;

        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        
        try {
            const { status, data } = await authService.login(credentials);
            if (status === 200)
                login(data);
        } catch (error) {
            console.log(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <form className='d-flex flex-column' onSubmit={onSubmit}>
            <h2 className='mb-4 align-self-center'>LOGIN</h2>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                    Email address
                </label>
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={credentials.email}
                    onChange={onChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                    Password
                </label>
                <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={credentials.password}
                    onChange={onChange}
                />
            </div>
            <div className='mb-3 form-check'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    id='rememberme'
                    name='rememberme'
                    checked={credentials.rememberme}
                    onChange={onChange}
                />
                <label className='form-check-label' htmlFor='rememberme'>
                    Remember Me
                </label>
            </div>
            <button disabled={pending} type='submit' className='btn btn-primary'>
                {pending ? 'pending ...' : 'submit'}
            </button>
        </form>
    );
};

export default Login;
