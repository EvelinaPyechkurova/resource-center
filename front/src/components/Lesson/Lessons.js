// import LessonList from './LessonList';
import CalendarView from './CalendarView';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../FilterSidebar';
import { useEffect, useState } from 'react';
import { LESSON_TYPE_VALUES } from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

const Lessons = () => {
    const navigate = useNavigate();

    const [filterQuery, setFilterQuery] = useState('');
    const [url, setUrl] = useState(`${API_URL}/lessons`);

    const { data: lessons, isLoading, error } = useFetchData(url);

    const handleCreateLesson = () => {
        navigate('/lessons/create');
    };

    const { data: subjects } = useFetchData(`${API_URL}/subjects`);
    const subjectOptions = subjects
        ? subjects.map(subject => ({
            value: subject._id,
            label: subject.name
        }))
        : [];

    const { data: users } = useFetchData(`${API_URL}/users`);
    const userOptions = users
        ? users.map(user => ({
            value: user._id,
            label: `${user.surname} ${user.name}`
        }))
        : [];

    const fields = [
        { name: 'subject', label: 'Subject', options: subjectOptions },
        { name: 'user', label: 'User', options: userOptions },
        { name: 'type', label: 'Lesson Type', options: LESSON_TYPE_VALUES },
        { type: 'date', name: 'startsAt', label: 'Lesson Date' }
    ];

    const handleSearch = (query) => {
        setFilterQuery(query);
    };

    useEffect(() => {
        const newUrl = `${API_URL}/lessons${filterQuery ? `?${filterQuery}` : ''}`;
        setUrl(newUrl);
    }, [filterQuery]);

    return (
        <div className="lessons">
            <FilterSidebar fields={fields} onSearch={handleSearch} />
            <button className="create-button" onClick={handleCreateLesson}>
                Add lesson
            </button>

            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {lessons && <CalendarView lessons={lessons} />}
        </div>
    );
};

export default Lessons;