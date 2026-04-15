import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

// import Users from './components/User/Users';
// import UserDetails from './components/User/UserDetails';
// import CreateUser from './components/User/CreateUser';

import Subjects from './components/Subject/Subjects';
import SubjectDetails from './components/Subject/SubjectDetails';
import CreateSubject from './components/Subject/CreateSubject';

// import Lessons from './components/Lesson/Lessons';
// import LessonDetails from './components/Lesson/LessonDetails';
// import CreateLesson from './components/Lesson/CreateLesson';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        {/* <Route path="/users" element={<Users />} />
                        <Route path="/users/create" element={<CreateUser />} />
                        <Route path="/users/:id" element={<UserDetails />} />*/}

                        <Route path="/subjects" element={<Subjects />} />
                        <Route path="/subjects/create" element={<CreateSubject />} />
                        <Route path="/subjects/:id" element={<SubjectDetails />} />

                        {/*<Route path="/lessons" element={<Lessons />} />
                        <Route path="/lessons/create" element={<CreateLesson />} />
                        <Route path="/lessons/:id" element={<LessonDetails />} /> */}

                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;