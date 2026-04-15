import { Link } from 'react-router-dom';

const SubjectList = ({ subjects }) => {
    return ( 
        <div className="item-list">
            {subjects.map((subject) => (
                <div className="preview" key={subject._id}>
                    <Link to={`/subjects/${subject._id}`}>
                        <h2>{subject.name}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default SubjectList;