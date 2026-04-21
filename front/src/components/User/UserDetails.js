import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import { USER_ROLES, USER_ROLE_VALUES } from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

const UserDetails = () => {
    const { id } = useParams();
    const { data:user, isLoading, error } = useFetchData(`${API_URL}/users/${id}`);
    const { data:subjects } =  useFetchData(`${API_URL}/subjects?user=${id}`);

    if (error)
        console.log(error);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedUser, setUpdatedUser] = useState({
        role: '',
        name: '',
        surname: '',
        phone: '',
        email: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const fields = [
        {
            type: 'text',
            name: 'role',
            label: 'User role',
            value: updatedUser.role,
            onChange: (e) => handleInputChange(e),
            options: USER_ROLE_VALUES
        },
        {
            type: 'text',
            name: 'name',
            label: 'User name',
            value: updatedUser.name,
            onChange: (e) => handleInputChange(e)
        },
        {
            type: 'text',
            name: 'surname',
            label: 'User surname',
            value: updatedUser.surname,
            onChange: (e) => handleInputChange(e)
        },
        {
            type: 'text',
            name: 'phone',
            label: 'User phone',
            value: updatedUser.phone,
            onChange: (e) => handleInputChange(e)
        },
        {
            type: 'text',
            name: 'email',
            label: 'User email',
            value: updatedUser.email,
            onChange: (e) => handleInputChange(e)
        }
    ];

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `${API_URL}/users/${id}`,
                { method: 'DELETE' }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw { error: errorData.error };
            }

            navigate('/users');

        } catch (e) {
            setErrorMessage(e);
        }
    };

    const handleUpdateClick = () => {
        setIsEditing(true);
        setUpdatedUser({
            role: user.role,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            email: user.email
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `${API_URL}/users/${id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(updatedUser),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }

            console.log(`User with id ${id} edited`);
            setIsEditing(false);
            navigate(`/users/${id}`);
            window.location.reload();

        } catch (e) {
            setErrorMessage(e);
        }
    };

    return (
        <div>

            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {errorMessage && <ErrorMessage error={errorMessage} />}

            {user && (
                <div>

                    {isEditing ? (
                        <div className="form-container">
                            <h2>Edit existing user</h2>
                            <Form
                                fields={fields}
                                handleSubmit={handleUpdateSubmit}
                                isLoading={isLoading}
                            />
                        </div>
                    ) : (
                        <div className="details">

                            <h2>{user.surname} {user.name}</h2>

                            <p>Role: {user.role}</p>
                            <p>Phone number: {user.phone}</p>
                            <p>Email address: {user.email}</p>

                            {subjects && subjects.length > 0 ? (
                                <div>
                                    <p>Subjects of this user:</p>
                                    <ul className="field-list">
                                        {subjects.map((subject) => (
                                            <li className="field-item" key={subject._id}>
                                                <Link to={`/subjects/${subject._id}`}>{subject.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <p>Currently does not own any subjects</p>
                                </div>
                            )}

                            <button className="update-button" onClick={handleUpdateClick}>update</button>
                            <button className="delete-button" onClick={handleDelete}>delete</button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default UserDetails;