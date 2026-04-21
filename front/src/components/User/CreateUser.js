import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import { USER_ROLE_VALUES } from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

const CreateUser = () => {

    const [formData, setFormData] = useState({
        role: '',
        name: '',
        surname: '',
        phone: '',
        email: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const roleOptions = USER_ROLE_VALUES
        ? USER_ROLE_VALUES.map(role => ({
            value: role,
            label: role
        }))
        : [];

    const fields = [
        {
            name: 'role',
            label: 'User role',
            value: formData.role,
            onChange: (e) => handleChange(e),
            options: roleOptions
        },
        {
            type: 'text',
            name: 'name',
            label: 'User name',
            value: formData.name,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'text',
            name: 'surname',
            label: 'User surname',
            value: formData.surname,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'text',
            name: 'phone',
            label: 'User phone',
            value: formData.phone,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'text',
            name: 'email',
            label: 'User email',
            value: formData.email,
            onChange: (e) => handleChange(e)
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `${API_URL}/users`,
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }

            console.log('New user added');
            navigate('/users');

        } catch (e) {
            setErrorMessage(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Add a New User</h2>

            {errorMessage && (
                <ErrorMessage error={errorMessage} />
            )}

            <Form
                fields={fields}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CreateUser;