import { Link } from 'react-router-dom';
import {
    BookOpen, Award, Clock, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../App';
import { courses } from '../../data/courses';
import CustomerSidebar from '../../components/CustomerSidebar';
import NotificationBell from '../../components/NotificationBell';
import '../admin/AdminPages.css';

const CustomerDashboard = () => {
    const { user, enrolledCourses, completedCourses, certificates } = useAuth();

    const stats = [
        { label: 'Enrolled Courses', value: enrolledCourses.length, icon: BookOpen, color: 'primary' },
        { label: 'Completed Courses', value: completedCourses.length, icon: CheckCircle, color: 'success' },
        { label: 'Certificates', value: certificates.length, icon: Award, color: 'warning' },
        { label: 'Hours Learned', value: '12.5', icon: Clock, color: 'secondary' },
    ];

    const continueLearning = courses
        .filter(c => enrolledCourses.includes(c.id))
        .slice(0, 3)
        .map(c => ({
            id: c.id,
            title: c.title,
            subtitle: `${c.lessons} Lessons • ${c.duration}`,
            progress: completedCourses.includes(c.id) ? 100 : 10,
            image: c.thumbnail,
            status: completedCourses.includes(c.id) ? 'COMPLETED' : 'IN PROGRESS'
        }));

    return (
        <div className="admin-page">
            <CustomerSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>My Dashboard</h1>
                        <p>Welcome back, {user?.name}!</p>
                    </div>
                    <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <NotificationBell />
                        <span className="date-display">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </header>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className={`stat-card ${stat.color}`}>
                            <div className="stat-header">
                                <div className="stat-icon">
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <p className="stat-value">{stat.value}</p>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <section className="content-section">
                    <div className="section-header">
                        <h2>Continue Learning</h2>
                    </div>
                    <div className="continue-learning-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {continueLearning.map((course, index) => (
                            <div key={course.id} className="course-progress-card" style={{
                                display: 'flex',
                                gap: '1.5rem',
                                alignItems: 'center',
                                paddingBottom: index !== continueLearning.length - 1 ? '1.5rem' : 0,
                                borderBottom: index !== continueLearning.length - 1 ? '1px solid var(--border-color)' : 'none'
                            }}>
                                <div className="course-thumb" style={{ width: '240px', height: '135px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="course-info" style={{ flex: 1 }}>
                                    <div style={{ marginBottom: '0.25rem' }}>
                                        <span className={`status-badge active`} style={{ fontSize: '0.7rem' }}>{course.status}</span>
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{course.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                                        {course.subtitle}
                                    </p>

                                    <div className="progress-container" style={{ maxWidth: '600px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                            <span style={{ fontWeight: 500 }}>Progress</span>
                                            <span style={{ color: course.progress === 100 ? '#22c55e' : 'var(--primary-500)', fontWeight: 600 }}>{course.progress}%</span>
                                        </div>
                                        <div className="progress-bar-bg" style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div className="progress-bar-fill" style={{ width: `${course.progress}%`, height: '100%', background: course.progress === 100 ? '#22c55e' : 'var(--primary-500)', borderRadius: '4px' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        {course.progress === 100 ? (
                                            <>
                                                <Link to={`/watch/${course.id}`} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    Open
                                                </Link>
                                                <Link to="/customer/certificates" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    View Certificate
                                                    <Award size={18} />
                                                </Link>
                                            </>
                                        ) : (
                                            <Link to={`/watch/${course.id}`} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                Continue
                                                <Clock size={18} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CustomerDashboard;
