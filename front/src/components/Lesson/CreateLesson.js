import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import { LESSON_TYPE_VALUES } from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

const CreateLesson = () => {

    const [formData, setFormData] = useState({
        subject: '',
        type: '',
        startsAt: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const { data: subjects } =
        useFetchData(`${API_URL}/subjects`);
        

    const subjectOptions = subjects
        ? subjects.map(subject => ({
            value: subject._id,
            label: subject.name
        }))
        : [];

    const fields = [
        { name: 'subject',
            label: 'Subject',
            value: formData.subject,
            onChange: handleChange,
            options: subjectOptions
        },
        {
            type: 'text',
            name: 'type',
            label: 'Lesson Type',
            value: formData.type,
            onChange: handleChange,
            options: LESSON_TYPE_VALUES
        },
        {
            type: 'date',
            name: 'startsAt',
            label: 'Lesson Date',
            value: formData.startsAt,
            onChange: handleChange
        }
    ];

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `${API_URL}/lessons`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }

            console.log('New lesson added');
            navigate('/lessons');

        } catch (e) {
            setErrorMessage(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="form-container">
            <h2>Add a New Lesson</h2>

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

export default CreateLesson;