import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Eye, Search, Edit, Trash2, Star
} from 'lucide-react';
import { courses } from '../../data/courses';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';

const AdminCourses = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [coursesList, setCoursesList] = useState(courses);

    const formatPrice = (price) => {
        if (price === 0) return 'Free';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };

    const handleView = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleEdit = (courseId) => {
        alert(`Edit mode for course ID: ${courseId}\n\nThis would open an edit form in a real application.`);
    };

    const handleDelete = (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCoursesList(coursesList.filter(c => c.id !== courseId));
            alert('Course deleted successfully!');
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Courses Management</h1>
                        <p>Manage all courses on the platform</p>
                    </div>
                </header>

                <section className="content-section">
                    <div className="filter-bar">
                        <div className="search-input">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Instructor</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Students</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesList.map(course => (
                                    <tr key={course.id}>
                                        <td>
                                            <div className="course-info-admin">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="course-thumb"
                                                />
                                                <span className="course-title-admin">{course.title}</span>
                                            </div>
                                        </td>
                                        <td>{course.instructor}</td>
                                        <td>{course.category}</td>
                                        <td>{formatPrice(course.price)}</td>
                                        <td>{formatNumber(course.students)}</td>
                                        <td>
                                            <div className="rating">
                                                <Star size={14} fill="#eab308" color="#eab308" />
                                                <span>{course.rating}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-btn"
                                                    onClick={() => handleView(course.id)}
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="action-btn"
                                                    onClick={() => handleEdit(course.id)}
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="action-btn reject"
                                                    onClick={() => handleDelete(course.id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
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

export default AdminCourses;

