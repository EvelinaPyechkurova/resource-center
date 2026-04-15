import { Link } from 'react-router-dom';
import { getSubjectDetails } from '../../utils/helperFunctions';
import { useState, useEffect } from 'react';

const LessonList = ({ lessons }) => {
    const [lessonSubjects, setLessonSubjects] = useState({});

    useEffect(() => {
        const fetchSubjectDetails = async () => {
            const subjects = {};

            for( const lesson of lessons){
                const subject = await getSubjectDetails(lesson.subject);
                subjects[lesson._id] = subject.name;
            }
            setLessonSubjects(subjects)
        }

        fetchSubjectDetails();
    }, [lessons]);

    return ( 
        <div className="item-list">
            {lessons.map((lesson) => (
                <div className="preview" key={lesson._id}>
                    <Link to={`/lesson/${lesson._id}`}>
                        Lesson on{' '}
                            <Link to={`/subjects/${lesson.subject}`}>
                                {lessonSubjects[lesson._id] || 'Loading...'}
                            </Link>{' '}
                        scheduled for {lesson.startsAt}
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default LessonList;