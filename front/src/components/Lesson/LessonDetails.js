import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import { LESSON_TYPE_VALUES } from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

const LessonDetails = () => {
    const { id } = useParams();
    const { data:lesson, isLoading, error } = useFetchData(`${API_URL}/lessons/${id}`);
    const { data:subject } = useFetchData(lesson ? `${API_URL}/subjects/${lesson.subject}` : null);
    const { data:subjects } = useFetchData(`${API_URL}/subjects`);
    if(error)
        console.log(error);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedLesson, setUpdatedLesson] = useState({
        subject: '',
        type: '',
        startsAt: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const subjectOptions = subjects ? subjects.map(subject => ({
        value: subject._id,
        label: subject.name
    })) : [];

    const fields = [
        {name: 'Subject', label: 'Subject of the Lesson', value: updatedLesson.subject, 
            onChange: (e) => handleInputChange(e), options: subjectOptions},
        {type: 'text', name: 'type', label: 'Lesson Type', value: updatedLesson.type,
            onChange: (e) => handleInputChange(e), options: LESSON_TYPE_VALUES},
        {type: "date", name: 'startsAt', label: 'Lesson StartsAt', value: updatedLesson.startsAt,
            onChange: (e) => handleInputChange(e)}
    ];

    const handleDelete = async () => {
        try {
            const res = await fetch(`${API_URL}/lessons/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw {error: errorData.error};
            }

            navigate('/lessons')

        } catch(e) {
            setErrorMessage(e);
        }
    }

    const handleUpdateClick = () => {
        setIsEditing(true);
        setUpdatedLesson({
            subject: lesson.subject, 
            type: lesson.type,
            startsAt: lesson.startsAt
        });
    };

    const handleInputChange = (e) => {
        setUpdatedLesson({...updatedLesson, [e.target.name]: e.target.value});
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`${API_URL}/lessons/${id}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedLesson),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log(`Lesson with id ${id} edited`);
            setIsEditing(false);
            navigate(`/lessons/${id}`);
            window.location.reload();
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return ( 
        <div>
            { isLoading && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { errorMessage && <ErrorMessage error={errorMessage} /> }
            { lesson && subject && (
                <div>
                    {isEditing ?
                    (
                        <div className="form-container">
                            <h2>Edit existing lesson</h2>
                            <Form fields={fields} handleSubmit={handleUpdateSubmit} isLoading={isLoading}></Form>
                        </div>  
                    ) : 
                    (
                        <div className="details">
                            <h2>Lesson</h2>
                            <p>Subject of the lesson: <Link to={`/subjects/${subject._id}`}>{subject.name}</Link></p>
                            <p>Lesson type: {lesson.type}</p>
                            <p>Lesson starts at: {lesson.startsAt}</p>
                            <div className="buttons">
                                <button className="update-button" onClick={handleUpdateClick}>update</button>
                                <button className="delete-button" onClick={handleDelete}>delete</button>  
                            </div>             
                        </div>
                    )} 
                </div>
            )}
        </div>
    );
}
 
export default LessonDetails;