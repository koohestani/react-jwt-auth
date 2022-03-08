import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Private = () => {
    const privateAxios = useAxiosPrivate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await privateAxios.get('/api/test/user');
                setContent(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [privateAxios]);

    return (<div>
        <h2>{loading ? 'loading ...' : content}</h2>
        <Link to='/' className='btn btn-primary'>Back To Home</Link>
    </div>);
};

export default Private;
