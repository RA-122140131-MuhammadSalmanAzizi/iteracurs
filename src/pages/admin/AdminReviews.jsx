import { useState } from 'react';
import {
    CheckCircle, XCircle, Star, MessageSquare, User, Search
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { courses, reviews } from '../../data/courses';
import './AdminPages.css';

const AdminReviews = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending');

    // Get all reviews with course names
    const allReviews = reviews.map(review => {
        const course = courses.find(c => c.id === review.courseId);
        return { ...review, courseName: course?.title || 'Unknown Course' };
    });

    const [reviewsList, setReviewsList] = useState(allReviews);

    // Filter reviews - use userName instead of user
    const filteredReviews = reviewsList.filter(r => {
        const userName = r.userName || '';
        const courseName = r.courseName || '';
        const comment = r.comment || '';

        const matchSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const pendingCount = reviewsList.filter(r => r.status === 'pending').length;
    const approvedCount = reviewsList.filter(r => r.status === 'approved').length;

    const handleApproveReview = (id) => {
        setReviewsList(reviewsList.map(r =>
            r.id === id ? { ...r, status: 'approved' } : r
        ));
        alert('Review approved and published.');
    };

    const handleRejectReview = (id) => {
        if (window.confirm('Reject and delete this review?')) {
            setReviewsList(reviewsList.filter(r => r.id !== id));
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Reviews Management</h1>
                        <p>Approve or reject user reviews for courses</p>
                    </div>
                </header>

                {/* Stats Summary */}
                <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                    <div className="stat-card warning" style={{ cursor: 'pointer' }} onClick={() => setFilterStatus('pending')}>
                        <div className="stat-header">
                            <div className="stat-icon"><MessageSquare size={24} /></div>
                        </div>
                        <p className="stat-value">{pendingCount}</p>
                        <p className="stat-label">Pending Reviews</p>
                    </div>
                    <div className="stat-card success" style={{ cursor: 'pointer' }} onClick={() => setFilterStatus('approved')}>
                        <div className="stat-header">
                            <div className="stat-icon"><CheckCircle size={24} /></div>
                        </div>
                        <p className="stat-value">{approvedCount}</p>
                        <p className="stat-label">Approved Reviews</p>
                    </div>
                    <div className="stat-card secondary" style={{ cursor: 'pointer' }} onClick={() => setFilterStatus('all')}>
                        <div className="stat-header">
                            <div className="stat-icon"><Star size={24} /></div>
                        </div>
                        <p className="stat-value">{reviewsList.length}</p>
                        <p className="stat-label">Total Reviews</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-bar-inline">
                    <div className="search-minimal">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="filter-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                    </select>
                </div>

                <div className="content-section">
                    <div className="section-header">
                        <h2>{filterStatus === 'all' ? 'All' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Reviews ({filteredReviews.length})</h2>
                    </div>

                    {filteredReviews.length > 0 ? (
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Course</th>
                                        <th>Rating</th>
                                        <th>Review</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReviews.map(review => (
                                        <tr key={review.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar-sm">
                                                        <User size={14} />
                                                    </div>
                                                    <span>{review.userName}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span style={{ fontSize: '0.9rem' }}>{review.courseName}</span>
                                            </td>
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
                                                <span className={`badge ${review.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                                    {review.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {review.status === 'pending' && (
                                                        <>
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
                                                        </>
                                                    )}
                                                    {review.status === 'approved' && (
                                                        <button
                                                            className="btn-icon text-error"
                                                            title="Remove"
                                                            onClick={() => handleRejectReview(review.id)}
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    )}
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
                            <h3>No Reviews Found</h3>
                            <p>No reviews match your current filters.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminReviews;
