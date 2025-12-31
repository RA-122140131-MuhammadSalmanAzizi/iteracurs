import { useState } from 'react';
import {
    CheckCircle, XCircle, Eye, AlertCircle, Search, Filter,
    BookOpen, User, MessageSquare, Star
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { courses, reviews } from '../../data/courses';
import './AdminPages.css';

const AdminCourseApproval = () => {
    const [activeTab, setActiveTab] = useState('courses');

    // Mock pending courses (extending the data structure slightly for demo)
    const [pendingCourses, setPendingCourses] = useState([
        {
            id: 101,
            title: 'Advanced React Patterns',
            instructor: 'Dr. New Lecturer',
            category: 'Development',
            submittedDate: '2024-12-30',
            status: 'pending',
            thumbnail: 'https://placehold.co/600x400/2563eb/white?text=React+Patterns',
            price: 499000
        },
        {
            id: 102,
            title: 'Digital Marketing Fundamentals',
            instructor: 'Sarah Market',
            category: 'Marketing',
            submittedDate: '2024-12-29',
            status: 'pending',
            thumbnail: 'https://placehold.co/600x400/db2777/white?text=Marketing',
            price: 0
        }
    ]);

    // Pending Reviews - enrich with course name
    const [pendingReviews, setPendingReviews] = useState(
        reviews.filter(r => r.status === 'pending').map(review => {
            const course = courses.find(c => c.id === review.courseId);
            return { ...review, courseName: course?.title || 'Unknown Course' };
        })
    );

    const handleApprove = (id) => {
        if (window.confirm('Are you sure you want to approve this course?')) {
            setPendingCourses(pendingCourses.filter(c => c.id !== id));
            // In a real app, you would make an API call here
            alert('Course approved successfully!');
        }
    };

    const handleReject = (id) => {
        const reason = window.prompt('Please provide a reason for rejection:');
        if (reason) {
            setPendingCourses(pendingCourses.filter(c => c.id !== id));
            alert('Course rejected. Feedback sent to instructor.');
        }
    };

    const handleApproveReview = (id) => {
        setPendingReviews(pendingReviews.filter(r => r.id !== id));
        alert('Review approved and published.');
    };

    const handleRejectReview = (id) => {
        if (window.confirm('Reject and delete this review?')) {
            setPendingReviews(pendingReviews.filter(r => r.id !== id));
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Approvals & Reviews</h1>
                        <p>Manage pending course submissions and user reviews</p>
                    </div>
                </header>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        <BookOpen size={18} />
                        Course Approvals
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        <MessageSquare size={18} />
                        Reviews ({pendingReviews.length})
                    </button>
                </div>

                <div className="content-section">
                    {activeTab === 'courses' && (
                        <>
                            <div className="section-header">
                                <h2>Pending Approval ({pendingCourses.length})</h2>
                            </div>

                            {pendingCourses.length > 0 ? (
                                <div className="table-container">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Course</th>
                                                <th>Instructor</th>
                                                <th>Category</th>
                                                <th>Submitted</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingCourses.map(course => (
                                                <tr key={course.id}>
                                                    <td>
                                                        <div className="course-cell">
                                                            <div className="course-thumb-sm">
                                                                <img src={course.thumbnail} alt={course.title} />
                                                            </div>
                                                            <span className="course-name">{course.title}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="user-cell">
                                                            <div className="user-avatar-sm">
                                                                <User size={14} />
                                                            </div>
                                                            <span>{course.instructor}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-secondary">{course.category}</span>
                                                    </td>
                                                    <td>{course.submittedDate}</td>
                                                    <td>
                                                        {course.price === 0 ? (
                                                            <span className="badge badge-success">Free</span>
                                                        ) : (
                                                            `Rp ${course.price.toLocaleString('id-ID')}`
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button
                                                                className="btn-icon text-primary"
                                                                title="Preview"
                                                                onClick={() => alert(`Previewing course: ${course.title}`)}
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button
                                                                className="btn-icon text-success"
                                                                title="Approve"
                                                                onClick={() => handleApprove(course.id)}
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button
                                                                className="btn-icon text-error"
                                                                title="Reject"
                                                                onClick={() => handleReject(course.id)}
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <CheckCircle size={48} className="text-success" />
                                    <h3>No Pending Courses</h3>
                                    <p>All submitted courses have been reviewed.</p>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'reviews' && (
                        <>
                            <div className="section-header">
                                <h2>Pending Reviews ({pendingReviews.length})</h2>
                            </div>

                            {pendingReviews.length > 0 ? (
                                <div className="table-container">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Course</th>
                                                <th>Rating</th>
                                                <th>Review</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingReviews.map(review => (
                                                <tr key={review.id}>
                                                    <td>
                                                        <div className="user-cell">
                                                            <div className="user-avatar-sm">
                                                                {review.userAvatar || <User size={14} />}
                                                            </div>
                                                            <span>{review.user}</span>
                                                        </div>
                                                    </td>
                                                    <td>{review.courseName}</td>
                                                    <td>
                                                        <div className="rating">
                                                            <Star size={14} fill="#eab308" color="#eab308" />
                                                            <span>{review.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p style={{ maxWidth: '300px', margin: 0, fontSize: '0.9rem' }}>{review.comment}</p>
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button
                                                                className="btn-icon text-success"
                                                                title="Approve"
                                                                onClick={() => handleApproveReview(review.id)}
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button
                                                                className="btn-icon text-error"
                                                                title="Reject"
                                                                onClick={() => handleRejectReview(review.id)}
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <MessageSquare size={48} className="text-primary" />
                                    <h3>No Pending Reviews</h3>
                                    <p>All reviews have been processed.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminCourseApproval;
