import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, BookOpen, ArrowRight, Check, Sun, Moon } from 'lucide-react';
import { useAuth, useTheme } from '../../App';
import './AuthPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const result = register(name, email, password);
            if (result.success) {
                navigate('/');
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
                        <h1>Create an account</h1>
                        <p>Start your learning journey today</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-with-icon">
                                <User size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a password"
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

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <label className="checkbox-label terms">
                            <input type="checkbox" required />
                            <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                        </label>

                        <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create Account'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>

            <div className="auth-visual">
                <div className="visual-content">
                    <h2>Join Our Community</h2>
                    <p>Connect with thousands of learners and unlock your potential.</p>
                    <div className="visual-features">
                        <div className="feature"><Check size={16} /> Free Courses Available</div>
                        <div className="feature"><Check size={16} /> Learn at Your Pace</div>
                        <div className="feature"><Check size={16} /> Mobile Friendly</div>
                        <div className="feature"><Check size={16} /> 24/7 Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

