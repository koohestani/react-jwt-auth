import React, { useState } from 'react';

const INIT_CREDENTIALS = {
    email: '',
    password: '',
    rememberme: true,
};

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState(INIT_CREDENTIALS);

    const onChange = ({ target }) => {
        let { name, value } = target;
        if (target.type === 'checkbox') value = target.checked;

        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
            <button disabled={loading} type='submit' className='btn btn-primary'>
                {loading ? 'loading ...' : 'submit'}
            </button>
        </form>
    );
};

export default Login;
