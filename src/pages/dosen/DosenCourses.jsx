import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus, Eye, Edit, Trash2, Star, Users, Search
} from 'lucide-react';
import DosenSidebar from '../../components/DosenSidebar';
import './DosenPages.css';

const DosenCourses = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [coursesList, setCoursesList] = useState([
        {
            id: 1,
            title: 'React Fundamentals: Build Modern Web Apps',
            students: 456,
            rating: 4.8,
            status: 'published',
            price: 0,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop'
        },
        {
            id: 2,
            title: 'Advanced JavaScript Patterns',
            students: 234,
            rating: 4.6,
            status: 'published',
            price: 199000,
            thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop'
        },
        {
            id: 3,
            title: 'Node.js Backend Masterclass',
            students: 0,
            rating: 0,
            status: 'draft',
            price: 299000,
            thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop'
        },
    ]);

    const filteredCourses = coursesList.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatPrice = (price) => {
        if (price === 0) return 'Free';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleEdit = (courseId) => {
        alert(`Edit mode for course ID: ${courseId}\n\nThis would open an edit form in a real application.`);
    };

    const handlePreview = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleDelete = (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            setCoursesList(coursesList.filter(c => c.id !== courseId));
            alert('Course deleted successfully!');
        }
    };

    return (
        <div className="dosen-page">
            <DosenSidebar />

            <main className="dosen-main">
                <header className="dosen-header">
                    <div>
                        <h1>My Courses</h1>
                        <p>Manage and organize your courses</p>
                    </div>
                    <Link to="/dosen/upload" className="btn btn-primary">
                        <Plus size={18} />
                        Create Course
                    </Link>
                </header>

                <div className="content-section">
                    <div style={{ marginBottom: '2rem', marginTop: '-1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '0.5rem 1rem', width: '100%', maxWidth: '400px' }}>
                            <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Search my courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div className="courses-grid-dosen">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="course-card-dosen">
                                <div className="course-thumbnail">
                                    <img src={course.thumbnail} alt={course.title} />
                                    <span className={`status-badge ${course.status}`}>
                                        {course.status}
                                    </span>
                                </div>
                                <div className="course-info-dosen">
                                    <h3>{course.title}</h3>
                                    <p className="course-price-dosen">{formatPrice(course.price)}</p>

                                    <div className="course-stats">
                                        <div className="stat">
                                            <Users size={14} />
                                            <span>{course.students} students</span>
                                        </div>
                                        {course.rating > 0 && (
                                            <div className="stat">
                                                <Star size={14} fill="#eab308" color="#eab308" />
                                                <span>{course.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="course-actions-dosen">
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleEdit(course.id)}
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => handlePreview(course.id)}
                                        >
                                            <Eye size={16} />
                                            Preview
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-sm danger"
                                            onClick={() => handleDelete(course.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DosenCourses;

