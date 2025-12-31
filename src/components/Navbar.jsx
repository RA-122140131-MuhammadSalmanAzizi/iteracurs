import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useTheme } from '../App';
import {
    Menu, X, BookOpen, Award, User, LogOut,
    ChevronDown, ArrowLeft, Sun, Moon
} from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const isHomePage = location.pathname === '/';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (!user) return '/login';
        switch (user.role) {
            case 'admin': return '/admin';
            case 'dosen': return '/dosen';
            default: return '/customer/dashboard';
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        {isHomePage ? <BookOpen size={24} /> : <ArrowLeft size={24} />}
                    </div>
                    <span className="logo-text">{isHomePage ? 'ITERA Course' : 'Back to Site'}</span>
                </Link>

                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/courses" className="nav-link">Courses</Link>
                    {isHomePage && (
                        <a href="#why-section" className="nav-link">Why Us</a>
                    )}
                </div>

                <div className="navbar-actions">
                    {/* Theme Toggle Button */}
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        style={{ marginRight: user ? '0.5rem' : '0' }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {user ? (
                        <>
                            <Link to={getDashboardLink()} className="btn btn-ghost dashboard-nav-btn" style={{ color: 'var(--primary-500)' }}>
                                Dashboard
                            </Link>
                            <div className="profile-dropdown">
                                <button
                                    className="profile-trigger"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <div className="avatar">{user.avatar}</div>
                                    <span className="profile-name">{user.name}</span>
                                    <ChevronDown size={16} />
                                </button>

                                {isProfileOpen && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-header">
                                            <div className="avatar-lg">{user.avatar}</div>
                                            <div>
                                                <p className="dropdown-name">{user.name}</p>
                                                <p className="dropdown-role">{user.role}</p>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/profile" className="dropdown-item">
                                            <User size={16} />
                                            Profile
                                        </Link>
                                        {user.role === 'customer' && (
                                            <Link to="/my-certificates" className="dropdown-item">
                                                <Award size={16} />
                                                My Certificates
                                            </Link>
                                        )}
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item logout">
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-ghost">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
