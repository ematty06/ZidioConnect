import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/Dashboard';
import RecruiterDashboard from './pages/recruiter/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import InternshipDetails from './pages/InternshipDetails';
import StudentProfile from './pages/student/Profile';
import RecruiterProfile from './pages/recruiter/Profile';
import PostInternship from './pages/recruiter/PostInternship';
import Applications from './pages/Applications';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/profile" element={<RecruiterProfile />} />
            <Route path="/recruiter/post-internship" element={<PostInternship />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/internship/:id" element={<InternshipDetails />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;