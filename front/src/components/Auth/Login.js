import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';

const AUTH_API_URL = process.env.REACT_APP_API_URL + '/auth';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fields = [
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'daria.petrova@gmail.com',
            value: formData.email,
            onChange: handleChange,
            required: true
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            value: formData.password,
            onChange: handleChange,
            required: true
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `${AUTH_API_URL}/login`,
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw data.error || 'Login failed';
            }

            // optional: store token if you already return it
            // localStorage.setItem('token', data.token);

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
                submitLabel="Login"
                helperText={
                    <span>
                        Don’t have an account? <a href="/signup">Sign up</a>
                    </span>
                }
            />
        </div>
    );
};

export default Login;