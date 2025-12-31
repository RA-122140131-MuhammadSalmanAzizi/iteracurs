import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Clock, Play, Trash2, Search } from 'lucide-react';
import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';
import { useAuth } from '../../App';
import { courses } from '../../data/courses';

const CustomerWishlist = () => {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const wishlistCourses = courses.filter(course =>
        wishlist.includes(course.id) &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <CustomerSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>My Wishlist</h1>
                        <p>Courses you saved for later</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/courses')}>
                            <BookOpen size={18} style={{ marginRight: '0.5rem' }} />
                            Browse Courses
                        </button>
                    </div>
                </header>
                <div className="content-section">
                    <div style={{ marginBottom: '2rem', marginTop: '-1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '0.5rem 1rem', width: '100%', maxWidth: '400px' }}>
                            <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Search wishlist..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none' }}
                            />
                        </div>
                    </div>

                    {wishlistCourses.length > 0 ? (
                        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {wishlistCourses.map(course => (
                                <div key={course.id} className="course-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                                    <div className="course-image" style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div className="course-badge" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--bg-card)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                                            {course.level}
                                        </div>
                                    </div>
                                    <div className="course-content" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '0.5rem', color: 'var(--primary-500)', fontSize: '0.75rem', fontWeight: 600 }}>
                                            {course.category}
                                        </div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{course.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                            <Clock size={16} />
                                            <span>{course.duration}</span>
                                            <span style={{ margin: '0 0.25rem' }}>•</span>
                                            <span>{course.price === 0 ? 'Free' : `Rp ${course.price.toLocaleString()} `}</span>
                                        </div>

                                        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="btn btn-primary"
                                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                onClick={() => navigate(`/ course / ${course.id} `)}
                                            >
                                                <Play size={18} />
                                                View Course
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => removeFromWishlist(course.id)}
                                                title="Remove from wishlist"
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <Heart size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                            <h3>Your wishlist is empty</h3>
                            <p>Save courses you are interested in here.</p>
                            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/courses')}>
                                Browse Courses
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CustomerWishlist;
