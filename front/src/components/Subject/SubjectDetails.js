import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import { YERS_VALUES, TRIMESTER_TYPE_VALUES } from '../../utils/constants';

const SubjectDetails = () => {
    const { id } = useParams();
    const { data:subject, isLoading, error } = useFetchData(`${process.env.REACT_APP_API_URL}/subjects/${id}`)
    const { data:lessons } = useFetchData(`${process.env.REACT_APP_API_URL}/lessons?subject=${id}`);
    if(error)
        console.log(error);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedSubject, setUpdatedSubject] = useState({
        name: '',
        year: '',
        trimester: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const fields = [
        {type: 'text', name: 'name', label: 'Subject name', value: updatedSubject.name, 
            onChange: (e) => handleInputChange(e)},
        {type: 'number', name: 'year', label: 'Subject year', value: updatedSubject.year,
             onChange: (e) => handleInputChange(e), options: YERS_VALUES},
        {type: 'text', name: 'trimester', label: 'Subject trimester', value: updatedSubject.trimester,
             onChange: (e) => handleInputChange(e), options: TRIMESTER_TYPE_VALUES}
    ];

    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/subjects/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw {error: errorData.error};
            }

            navigate('/subjects')

        } catch(e) {
            setErrorMessage(e);
        }
    }

    const handleUpdateClick = () => {
        setIsEditing(true);
        setUpdatedSubject({
            name: subject.name, 
            year: subject.year, 
            trimester: subject.trimester
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedSubject(prevState => ({
            ...prevState,
            [name]: name === 'year' ? Number(value) : value
        }))
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/subjects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedSubject),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log(`Subject with id ${id} edited`);
            setIsEditing(false);
            navigate(`/subjects/${id}`);
            window.location.reload();
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return ( 
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {errorMessage && <ErrorMessage error={ errorMessage } />}
            {subject && (
                <div>
                    {isEditing ?
                    (
                        <div className="form-container">
                            <h2>Edit existing subject</h2>
                            <Form fields={ fields } handleSubmit={handleUpdateSubmit} isLoading={ isLoading }></Form>
                        </div>  
                    ) : 
                    (
                        <div className="details">
                        <h2>{ subject.name } </h2>
                        <p>Year: { subject.year }</p> 
                        <p>Trimester: { subject.trimester }</p>
                        {lessons && lessons.length > 0 ? (
                            <div>
                                <p>Lessons from this subject:</p>
                                <ul className="field-list">
                                    {lessons.map((lesson) => (
                                        <li className="field-item" key={lesson._id}>
                                            <Link to={`/lessons/${lesson._id}`}>{lesson.type} {lesson.date}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>) : 
                            <div><p>Currently does not read by any lessons</p></div>}
                            <button className="update-button" onClick={handleUpdateClick}>update</button>
                            <button className="delete-button" onClick={handleDelete}>delete</button>  
                        </div>
                    )} 
                </div>
            )}
        </div>
    );
}
 
export default SubjectDetails;