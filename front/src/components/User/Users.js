import UserList from './UserList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../FilterSidebar';
import { useEffect, useState } from 'react';
import { USER_ROLE_VALUES } from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

const Users = () => {

    const navigate = useNavigate();

    const [filterQuery, setFilterQuery] = useState('');
    const [url, setUrl] = useState(`${API_URL}/users`);

    const { data: users, isLoading, error } = useFetchData(url);

    const handleCreateUser = () => {
        navigate('/users/create');
    };

    const fields = [
        { name: 'role', label: 'Role', options: USER_ROLE_VALUES },
        { type: 'text', name: 'name', label: 'Name' },
        { type: 'text', name: 'surname', label: 'Surname' },
        { type: 'text', name: 'phone', label: 'Phone' },
        { type: 'text', name: 'email', label: 'Email' }
    ];

    const handleSearch = (query) => {
        setFilterQuery(query);
    };

    useEffect(() => {
        const newUrl = `${API_URL}/users${filterQuery ? `?${filterQuery}` : ''}`;
        setUrl(newUrl);
    }, [filterQuery]);

    return (
        <div className="users">

            <FilterSidebar
                fields={fields}
                onSearch={handleSearch}
            />

            <button
                className="create-button"
                onClick={handleCreateUser}
            >
                add new user
            </button>

            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {users && <UserList users={users} />}

        </div>
    );
};

export default Users;