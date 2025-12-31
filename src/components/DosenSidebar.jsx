import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    BookOpen, Plus, Eye, LogOut, BarChart2, Sun, Moon
} from 'lucide-react';
import { useAuth, useTheme } from '../App';
import '../pages/dosen/DosenPages.css';

const DosenSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => {
        if (path === '/dosen') {
            return location.pathname === '/dosen';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="dosen-sidebar">
            <div className="sidebar-logo">
                <BookOpen size={24} />
                <span>Instructor</span>
            </div>

            <Link to="/profile" className="sidebar-profile">
                <div className="profile-avatar">
                    {user?.avatar || 'D'}
                </div>
                <div className="profile-info">
                    <span
                        className="profile-name"
                        style={{
                            fontSize: user?.name?.length > 20 ? '0.75rem' : user?.name?.length > 15 ? '0.8rem' : '0.875rem'
                        }}
                    >
                        {user?.name || 'Lecturer'}
                    </span>
                    <span className="profile-role">Lecturer</span>
                </div>
            </Link>

            <nav className="sidebar-nav">
                <Link to="/dosen" className={`nav-item ${isActive('/dosen') && location.pathname === '/dosen' ? 'active' : ''}`}>
                    <BarChart2 size={20} />
                    Dashboard
                </Link>
                <Link to="/dosen/courses" className={`nav-item ${isActive('/dosen/courses') ? 'active' : ''}`}>
                    <BookOpen size={20} />
                    My Courses
                </Link>
                <Link to="/dosen/upload" className={`nav-item ${isActive('/dosen/upload') ? 'active' : ''}`}>
                    <Plus size={20} />
                    Upload Course
                </Link>
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item theme-toggle" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Link to="/" className="nav-item">
                    <Eye size={20} />
                    View Site
                </Link>
                <button className="nav-item logout" onClick={handleLogout}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DosenSidebar;

