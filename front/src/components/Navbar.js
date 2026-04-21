import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Student Organizer</h1>
            <div className="links">
                {/* <Link to="/users">Users</Link> */}
                <Link to="/subjects">Subjects</Link>
                <Link to="/lessons">Lessons</Link>
                <Link to="/users">Users</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;