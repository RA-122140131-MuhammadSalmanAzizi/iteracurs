import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Play, Star, Users, Clock, BookOpen, Award,
    CheckCircle, ChevronDown, ChevronUp, Share2,
    Heart, ArrowLeft, Globe, PlayCircle, FileText,
    ExternalLink, ClipboardCheck
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../App';
import { courses, reviews, getContentCounts, getAllContents } from '../../data/courses';
import './CourseDetailPage.css';

const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, enrolledCourses, enrollCourse, wishlist, addToWishlist, removeFromWishlist } = useAuth();
    const [expandedChapters, setExpandedChapters] = useState([0]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const course = courses.find(c => c.id === parseInt(id));
    const isEnrolled = enrolledCourses?.includes(course?.id);
    const isInWishlist = wishlist?.includes(course?.id);
    const courseReviews = reviews.filter(r => r.courseId === parseInt(id) && r.status === 'approved');

    const handleToggleWishlist = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Prevent non-customers (dosen/admin) from using wishlist
        if (user.role !== 'customer') {
            return;
        }

        if (isInWishlist) {
            removeFromWishlist(course.id);
        } else {
            addToWishlist(course.id);
        }
    };

    if (!course) {
        return (
            <div className="course-detail-page">
                <Navbar />
                <div className="not-found">
                    <h2>Course not found</h2>
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const formatNumber = (num) => {
        // ...
        // ... (skipping unchanged lines)
        // ...
        <div className="sidebar-actions">
            <button
                className={`btn w - full ${isInWishlist ? 'btn-primary' : 'btn-secondary'} `}
                onClick={handleToggleWishlist}
                disabled={user && user.role !== 'customer'}
                title={user && user.role !== 'customer' ? "Only students can use wishlist" : ""}
                style={user && user.role !== 'customer' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
                <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
            <button className="btn btn-secondary w-full">
                <Share2 size={18} />
                Share
            </button>
        </div>
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };

    const formatPrice = (price) => {
        if (price === 0) return 'Free';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const toggleChapter = (index) => {
        if (expandedChapters.includes(index)) {
            setExpandedChapters(expandedChapters.filter(i => i !== index));
        } else {
            setExpandedChapters([...expandedChapters, index]);
        }
    };

    const handleEnroll = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        enrollCourse(course.id);
    };

    const handleStartWatching = () => {
        navigate(`/watch/${course.id}`);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        // In real app, this would send to backend
        setReviewSubmitted(true);
        setShowReviewForm(false);
        setTimeout(() => setReviewSubmitted(false), 5000);
    };

    const totalContents = course.chapters?.reduce((acc, ch) => acc + (ch.contents?.length || 0), 0) || 0;

    return (
        <div className="course-detail-page">
            <Navbar />

            {/* Course Header */}
            <section className="course-header">
                <div className="container">
                    <div className="course-header-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3rem', alignItems: 'start' }}>
                        <div className="course-header-content">
                            <Link to="/courses" className="back-link">
                                <ArrowLeft size={18} />
                                Back to Courses
                            </Link>

                            <div className="course-badges">
                                {course.isFree ? (
                                    <span className="badge badge-free">Free</span>
                                ) : (
                                    <span className="badge badge-premium">Premium</span>
                                )}
                                <span className="badge badge-level">{course.level}</span>
                            </div>

                            <h1>{course.title}</h1>
                            <p className="course-subtitle">{course.description}</p>

                            <div className="course-meta-row">
                                <div className="meta-item">
                                    <Star size={16} fill="#eab308" color="#eab308" />
                                    <span className="rating-value">{course.rating}</span>
                                    <span className="rating-count">({formatNumber(course.reviews)} reviews)</span>
                                </div>
                                <div className="meta-item">
                                    <Users size={16} />
                                    <span>{formatNumber(course.students)} students</span>
                                </div>
                                <div className="meta-item">
                                    <Globe size={16} />
                                    <span>English</span>
                                </div>
                                <div className="meta-item">
                                    <Clock size={16} />
                                    <span>Last updated {course.lastUpdated}</span>
                                </div>
                            </div>

                            <div className="instructor-row">
                                <div className="instructor-avatar">{course.instructorAvatar}</div>
                                <div>
                                    <p className="instructor-label">Created by</p>
                                    <p className="instructor-name">{course.instructor}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar moved to Header */}
                        <aside className="course-sidebar">
                            <div className="sidebar-card">
                                <div className="preview-video">
                                    <img src={course.thumbnail} alt={course.title} />
                                    <button className="preview-play">
                                        <Play size={24} fill="white" />
                                    </button>
                                </div>

                                <div className="sidebar-content">
                                    <div className="price-row">
                                        <span className="price">{formatPrice(course.price)}</span>
                                        {!course.isFree && (
                                            <span className="original-price">Rp {(course.price * 1.5).toLocaleString()}</span>
                                        )}
                                    </div>

                                    {isEnrolled ? (
                                        <button className="btn btn-primary btn-lg w-full" onClick={handleStartWatching}>
                                            <Play size={20} />
                                            Continue Learning
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary btn-lg w-full" onClick={handleEnroll}>
                                            {course.isFree ? 'Enroll for Free' : 'Enroll Now'}
                                        </button>
                                    )}

                                    <div className="sidebar-actions">
                                        <button
                                            className={`btn w-full ${isInWishlist ? 'btn-primary' : 'btn-secondary'}`}
                                            onClick={handleToggleWishlist}
                                            disabled={user && user.role !== 'customer'}
                                            title={user && user.role !== 'customer' ? "Only students can use wishlist" : ""}
                                            style={user && user.role !== 'customer' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                        >
                                            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                                            {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                                        </button>
                                        <button className="btn btn-secondary w-full">
                                            <Share2 size={18} />
                                            Share
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <main className="course-main">
                <div className="container">
                    <div className="course-layout" style={{ display: 'block' }}>
                        {/* Course Content */}
                        <section className="content-section">
                            <h2>Course Content</h2>
                            <div className="content-summary">
                                <span>{course.chapters?.length || 0} sections</span>
                                <span>•</span>
                                <span>{getAllContents(course).length} items</span>
                                <span>•</span>
                                <span>{course.duration} total length</span>
                            </div>

                            {/* Content Type Summary */}
                            {(() => {
                                const counts = getContentCounts(course);
                                return (
                                    <div className="content-types-summary">
                                        <div className="content-type-item video">
                                            <PlayCircle size={16} />
                                            <span>{counts.videos} Videos</span>
                                        </div>
                                        {counts.pdfs > 0 && (
                                            <div className="content-type-item pdf">
                                                <FileText size={16} />
                                                <span>{counts.pdfs} PDFs</span>
                                            </div>
                                        )}
                                        {counts.links > 0 && (
                                            <div className="content-type-item link">
                                                <ExternalLink size={16} />
                                                <span>{counts.links} Links</span>
                                            </div>
                                        )}
                                        <div className="content-type-item exercise">
                                            <ClipboardCheck size={16} />
                                            <span>{counts.exercises} Quizzes</span>
                                        </div>
                                    </div>
                                );
                            })()}

                            <div className="passing-score-notice">
                                <ClipboardCheck size={18} />
                                <span>Pass all quizzes with ≥80% to complete the course and earn certificate</span>
                            </div>

                            <div className="chapters-list">
                                {course.chapters?.map((chapter, index) => (
                                    <div key={index} className="chapter-group">
                                        <button
                                            className="chapter-title"
                                            onClick={() => toggleChapter(index)}
                                        >
                                            <span>{chapter.title}</span>
                                            <div className="chapter-right-side">
                                                <span className="chapter-meta">
                                                    {chapter.contents?.length || 0} items
                                                </span>
                                                {expandedChapters.includes(index) ? (
                                                    <ChevronUp size={16} />
                                                ) : (
                                                    <ChevronDown size={16} />
                                                )}
                                            </div>
                                        </button>

                                        {expandedChapters.includes(index) && (
                                            <div className="contents-list">
                                                {chapter.contents?.map((content, contentIndex) => (
                                                    <div
                                                        key={contentIndex}
                                                        className={`content-item ${content.type}`}
                                                        onClick={() => isEnrolled && handleStartWatching()}
                                                        style={{ cursor: isEnrolled ? 'pointer' : 'default' }}
                                                    >
                                                        <div className="content-icon">
                                                            {content.type === 'video' && <PlayCircle size={18} />}
                                                            {content.type === 'pdf' && <FileText size={18} />}
                                                            {content.type === 'link' && <ExternalLink size={18} />}
                                                            {content.type === 'exercise' && <ClipboardCheck size={18} />}
                                                        </div>
                                                        <div className="content-details">
                                                            <span className="content-title">{content.title}</span>
                                                            <span className="content-duration">
                                                                {content.duration || content.fileSize || ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section className="content-section">
                            <div className="reviews-header">
                                <h2>Reviews</h2>
                                {user && isEnrolled && !showReviewForm && (
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => setShowReviewForm(true)}
                                    >
                                        Write a Review
                                    </button>
                                )}
                            </div>

                            {reviewSubmitted && (
                                <div className="review-success">
                                    <CheckCircle size={20} />
                                    <span>Thank you! Your review has been submitted for approval.</span>
                                </div>
                            )}

                            {showReviewForm && (
                                <form className="review-form" onSubmit={handleSubmitReview}>
                                    <div className="rating-input">
                                        <label>Your Rating</label>
                                        <div className="stars-input">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    className={`star - btn ${star <= reviewRating ? 'active' : ''} `}
                                                    onClick={() => setReviewRating(star)}
                                                >
                                                    <Star size={24} fill={star <= reviewRating ? '#eab308' : 'none'} color="#eab308" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Your Review</label>
                                        <textarea
                                            className="input"
                                            rows={4}
                                            placeholder="Share your experience with this course..."
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="review-form-actions">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowReviewForm(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Submit Review
                                        </button>
                                    </div>
                                    <p className="review-note">Note: Reviews are subject to approval before being displayed.</p>
                                </form>
                            )}

                            <div className="reviews-list">
                                {courseReviews.length > 0 ? (
                                    courseReviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <div className="reviewer-avatar">
                                                    {review.userName.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="reviewer-name">{review.userName}</p>
                                                    <div className="review-rating">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                fill={i < review.rating ? '#eab308' : 'none'}
                                                                color="#eab308"
                                                            />
                                                        ))}
                                                        <span className="review-date">{review.createdAt}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="review-text">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                                )}
                            </div>
                        </section>
                        {/* Sidebar moved to header */}
                    </div>
                </div>
            </main >

            <Footer />
        </div >
    );
};

export default CourseDetailPage;

