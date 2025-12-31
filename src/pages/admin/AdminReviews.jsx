import { useState } from 'react';
import {
    MessageSquare, Check, X, Star
} from 'lucide-react';
import { reviews } from '../../data/courses';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';

const AdminReviews = () => {
    const [statusFilter, setStatusFilter] = useState('pending');
    const [reviewsList, setReviewsList] = useState(reviews);

    const filteredReviews = reviewsList.filter(review => {
        return statusFilter === 'all' || review.status === statusFilter;
    });

    const handleApprove = (reviewId) => {
        setReviewsList(reviewsList.map(r =>
            r.id === reviewId ? { ...r, status: 'approved' } : r
        ));
    };

    const handleReject = (reviewId) => {
        setReviewsList(reviewsList.map(r =>
            r.id === reviewId ? { ...r, status: 'rejected' } : r
        ));
    };

    const pendingCount = reviewsList.filter(r => r.status === 'pending').length;

    return (
        <div className="admin-page">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Reviews Management</h1>
                        <p>Approve or reject customer reviews</p>
                    </div>
                </header>

                <section className="content-section">
                    <div className="filter-bar">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All Reviews</option>
                            <option value="pending">Pending ({pendingCount})</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="reviews-list">
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <div className="user-avatar">
                                                {review.userName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="reviewer-details">
                                                <h4>{review.userName}</h4>
                                                <span className="review-course">Course ID: {review.courseId}</span>
                                            </div>
                                        </div>
                                        <div className="review-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < review.rating ? '#eab308' : 'none'}
                                                    color="#eab308"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="review-text">{review.comment}</p>

                                    <div className="review-footer">
                                        <div>
                                            <span className="review-date">{review.createdAt}</span>
                                            <span className={`status-badge ${review.status}`}>{review.status}</span>
                                        </div>

                                        {review.status === 'pending' && (
                                            <div className="review-actions">
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleApprove(review.id)}
                                                >
                                                    <Check size={16} />
                                                    Approve
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleReject(review.id)}
                                                >
                                                    <X size={16} />
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <MessageSquare size={48} />
                                <h3>No reviews found</h3>
                                <p>There are no reviews matching your filter.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminReviews;

