import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
    return ( 
        <div className="item-list">
            { users.map((user) => (
                <div className="preview" key={user._id}>
                    <Link to={`/users/${user._id}`}>
                        <h2>{user.surname} {user.name}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default UserList;