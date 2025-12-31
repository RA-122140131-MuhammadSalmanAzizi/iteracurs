import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight, Check, Sun, Moon } from 'lucide-react';
import { useAuth, useTheme } from '../../App';
import './AuthPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const result = login(email, password);
            if (result.success) {
                // Redirect based on role
                switch (result.user.role) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'dosen':
                        navigate('/dosen');
                        break;
                    default:
                        navigate('/customer/dashboard');
                }
            } else {
                setError(result.error);
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <Link to="/" className="auth-logo" style={{ marginBottom: 0 }}>
                            <div className="logo-icon">
                                <BookOpen size={24} />
                            </div>
                            <span>ITERA Course</span>
                        </Link>
                        <button
                            onClick={toggleTheme}
                            type="button"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <div className="auth-header">
                        <h1>Welcome back</h1>
                        <p>Sign in to continue your learning journey</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <div className="demo-accounts">
                        <p>Demo Accounts:</p>
                        <div className="demo-list">
                            <button
                                type="button"
                                className="demo-btn"
                                onClick={() => { setEmail('customer@demo.com'); setPassword('demo123'); }}
                            >
                                Customer
                            </button>
                            <button
                                type="button"
                                className="demo-btn"
                                onClick={() => { setEmail('dosen@demo.com'); setPassword('demo123'); }}
                            >
                                Dosen
                            </button>
                            <button
                                type="button"
                                className="demo-btn"
                                onClick={() => { setEmail('admin@demo.com'); setPassword('demo123'); }}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>

            <div className="auth-visual">
                <div className="visual-content">
                    <h2>Start Learning Today</h2>
                    <p>Access hundreds of courses from industry experts and advance your career.</p>
                    <div className="visual-features">
                        <div className="feature"><Check size={16} /> 800+ Courses</div>
                        <div className="feature"><Check size={16} /> Expert Instructors</div>
                        <div className="feature"><Check size={16} /> Lifetime Access</div>
                        <div className="feature"><Check size={16} /> Certificates</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

