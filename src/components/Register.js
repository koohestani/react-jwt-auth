import React, { useState } from 'react';

import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const INIT_CREDENTIALS = {
    username: '',
    email: '',
    password: '',
};

const Register = () => {
    const [pending, setPending] = useState(false);
    const [credentials, setCredentials] = useState(INIT_CREDENTIALS);
    const navigate = useNavigate();

    const onChange = ({ target: { name, value } }) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setPending(true);

        try {
            const { status, data } = await authService.register(credentials);
            setPending(false);
            if (status === 200)
                navigate('/login', {
                    state: {
                        username: credentials.username,
                    },
                });
            else console.warn(status, data);
        } catch (error) {
            console.error(error);
            setPending(false);
        }
    };

    return (
        <form className='d-flex flex-column' onSubmit={onSubmit}>
            <h2 className='mb-4 align-self-center'>REGISTER</h2>
            <div className='mb-3'>
                <label htmlFor='username' className='form-label'>
                    Username
                </label>
                <input
                    type='text'
                    className='form-control'
                    id='username'
                    name='username'
                    value={credentials.username}
                    onChange={onChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                    Email
                </label>
                <input
                    type='text'
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
            <button
                disabled={pending}
                type='submit'
                className='btn btn-primary'
            >
                {pending ? 'pending ...' : 'submit'}
            </button>
        </form>
    );
};

export default Register;
