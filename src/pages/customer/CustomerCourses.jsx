import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Play, Clock, Award, Search, BookOpen
} from 'lucide-react';
import { useAuth } from '../../App';
import { courses } from '../../data/courses';
import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';

const CustomerCourses = () => {
    const navigate = useNavigate();
    const { enrolledCourses, completedCourses } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter enrolled courses
    const myCourses = courses.filter(course => enrolledCourses.includes(course.id));

    // Filter by search
    const filteredCourses = myCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleContinue = (courseId) => {
        navigate(`/watch/${courseId}`);
    };

    return (
        <div className="admin-page">
            <CustomerSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Enrolled Courses</h1>
                        <p>Continue your learning journey</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/courses')}>
                            <BookOpen size={18} style={{ marginRight: '0.5rem' }} />
                            Browse More Courses
                        </button>
                    </div>
                </header>

                <div className="content-section">
                    <div style={{ marginBottom: '2rem', marginTop: '-1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '0.5rem 1rem', width: '100%', maxWidth: '400px' }}>
                            <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Search enrolled courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none' }}
                            />
                        </div>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {filteredCourses.map(course => {
                                const isCompleted = completedCourses.includes(course.id);
                                // Mock progress for demo purposes since we don't track explicit % yet, except for completion
                                const progress = isCompleted ? 100 : 35;

                                return (
                                    <div key={course.id} className="course-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                                        <div className="course-image" style={{ height: '160px', overflow: 'hidden' }}>
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="course-content" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ marginBottom: '0.5rem', color: 'var(--primary-500)', fontSize: '0.75rem', fontWeight: 600 }}>
                                                {course.category}
                                            </div>
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{course.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                                <Clock size={16} />
                                                <span>{course.duration}</span>
                                                <span style={{ margin: '0 0.25rem' }}>•</span>
                                                <span>{course.lessons} lessons</span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    <span>Progress</span>
                                                    <span style={{ color: isCompleted ? '#22c55e' : 'inherit', fontWeight: isCompleted ? 600 : 400 }}>{progress}%</span>
                                                </div>
                                                <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${progress}%`, height: '100%', background: isCompleted ? '#22c55e' : 'var(--primary-500)', borderRadius: '3px' }}></div>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                                {isCompleted ? (
                                                    <>
                                                        <button
                                                            className="btn btn-outline"
                                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem' }}
                                                            onClick={() => handleContinue(course.id)}
                                                        >
                                                            Open
                                                        </button>
                                                        <button
                                                            className="btn btn-primary"
                                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem' }}
                                                            onClick={() => navigate('/customer/certificates')}
                                                        >
                                                            <Award size={18} />
                                                            Cert
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary"
                                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                        onClick={() => handleContinue(course.id)}
                                                    >
                                                        <Play size={18} />
                                                        Continue Learning
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <BookOpen size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                            <h3>No courses found</h3>
                            <p>Try adjusting your search criteria or browse for new courses.</p>
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

export default CustomerCourses;
