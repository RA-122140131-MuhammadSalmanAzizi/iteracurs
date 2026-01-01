import { Link } from 'react-router-dom';
import {
    BookOpen, Users, Star, TrendingUp,
    Plus, Edit
} from 'lucide-react';
import { useAuth } from '../../App';
import DosenSidebar from '../../components/DosenSidebar';
import './DosenPages.css';

const DosenDashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Courses', value: 5, icon: BookOpen, color: 'primary' },
        { label: 'Total Students', value: 1234, icon: Users, color: 'secondary' },
        { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'warning' },
        { label: 'Total Revenue', value: 'Rp 12.5M', icon: TrendingUp, color: 'success' },
    ];

    const recentCourses = [
        { id: 1, title: 'React Fundamentals', students: 456, rating: 4.8, status: 'published' },
        { id: 2, title: 'Advanced JavaScript', students: 234, rating: 4.6, status: 'published' },
        { id: 3, title: 'Node.js Masterclass', students: 0, rating: 0, status: 'draft' },
    ];

    return (
        <div className="dosen-page">
            <DosenSidebar />

            <main className="dosen-main">
                <header className="dosen-header">
                    <div>
                        <h1>Welcome back, {user?.name}!</h1>
                        <p>Manage your courses and track your performance</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/dosen/upload" className="btn btn-primary">
                            <Plus size={18} />
                            Create Course
                        </Link>
                    </div>
                </header>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className={`stat-card ${stat.color}`}>
                            <div className="stat-icon">
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-info">
                                <p className="stat-value">{stat.value}</p>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="content-section">
                    <div className="section-header">
                        <h2>Recent Courses</h2>
                        <Link to="/dosen/courses" className="btn btn-secondary btn-sm">
                            View All
                        </Link>
                    </div>

                    <div className="courses-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Students</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCourses.map(course => (
                                    <tr key={course.id}>
                                        <td>
                                            <span className="course-title">{course.title}</span>
                                        </td>
                                        <td>{course.students}</td>
                                        <td>
                                            {course.rating > 0 && (
                                                <div className="rating">
                                                    <Star size={14} fill="#eab308" color="#eab308" />
                                                    <span>{course.rating}</span>
                                                </div>
                                            )}
                                            {course.rating === 0 && <span className="no-rating">-</span>}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${course.status}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="action-btn">
                                                <Edit size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DosenDashboard;

