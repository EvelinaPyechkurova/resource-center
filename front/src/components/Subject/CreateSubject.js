import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import Form from '../Form';
import {TRIMESTER_TYPE_VALUES, YERS_VALUES} from '../../utils/constants';

const CreateSubject = () => {

    const [formData, setFormData] = useState({
        name: '',
        year: '',
        trimester: ''
    });
   
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const fields = [
        {type: "text", name: 'name', label: 'Subject name', value: formData.name,
             onChange: (e) => handleChange(e)},
        {type: "number", name: 'year', label: 'Subject year', value: formData.year,
             onChange: (e) => handleChange(e), options: YERS_VALUES},
        {type: "text", name: 'trimester', label: 'Subject trimester', value: formData.trimester,
             onChange: (e) => handleChange(e), options: TRIMESTER_TYPE_VALUES},
    ];

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: name === 'year' ? Number(value) : value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const res = await fetch('${process.env.REACT_APP_API_URL}/subjects', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log('New subject added');
            navigate('/subjects');
        } catch (e) {
            setErrorMessage(e);
        } finally {
            setIsLoading(false);
        }
    };

    return(  
        <div className="form-container">
            <h2>Add a New Subject</h2>
            {errorMessage && <ErrorMessage error={errorMessage} />}
            <Form fields={fields} handleSubmit={handleSubmit} isLoading={isLoading}/>
        </div>
    );
}
 
export default CreateSubject;