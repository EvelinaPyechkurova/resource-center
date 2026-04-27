import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import { USER_ROLE_VALUES } from '../../utils/constants';

const AUTH_API_URL = process.env.REACT_APP_API_URL + '/auth';


const CreateUser = () => {

    const [formData, setFormData] = useState({
        role: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    console.log(USER_ROLE_VALUES);

    const roleOptions = USER_ROLE_VALUES
        ? USER_ROLE_VALUES.map(role => ({
            value: role,
            label: role
        }))
        : [];

    const fields = [
        {
            type: 'radio',
            name: 'role',
            label: 'User role',
            value: formData.role,
            onChange: (e) => handleChange(e),
            options: roleOptions
        },
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Daria',
            value: formData.name,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'text',
            name: 'surname',
            label: 'Surname',
            placeholder: 'Petrova',
            value: formData.surname,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'daria.petrova@gmail.com',
            value: formData.email,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'text',
            name: 'phone',
            label: 'Phone',
            placeholder: '+380970576430',
            value: formData.phone,
            onChange: (e) => handleChange(e)
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            value: formData.password,
            onChange: (e) => handleChange(e)
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    console.log('code runs');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `${AUTH_API_URL}/register`,
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
            navigate('/lessons');

        } catch (e) {
            setErrorMessage(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">

            {errorMessage && (
                <ErrorMessage error={errorMessage} />
            )}

            <Form
            fields={fields}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Sign up"
            helperText={
                <span>
                    Already have an account? <a href="/login">Log in</a>
                </span>
                }
            />
        </div>
    );
};

export default CreateUser;