
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Play, ChevronLeft, ChevronRight, CheckCircle,
    List, X, Award, PlayCircle, FileText, ExternalLink,
    ClipboardCheck, Download, Sun, Moon, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth, useTheme } from '../../App';
import { courses, getAllContents, getRequiredContents } from '../../data/courses';
import ExerciseQuiz from '../../components/ExerciseQuiz';
import './WatchCoursePage.css';

const WatchCoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user, completedCourses, completeCourse, claimCertificate, certificates } = useAuth();
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);
    const [completedContents, setCompletedContents] = useState(() => {
        const saved = localStorage.getItem(`course_progress_${id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [exerciseScores, setExerciseScores] = useState(() => {
        const saved = localStorage.getItem(`course_scores_${id}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [expandedChapters, setExpandedChapters] = useState([]);

    const course = courses.find(c => c.id === parseInt(id));
    const isCompleted = completedCourses?.includes(course?.id);
    const hasCertificate = certificates?.some(cert => cert.courseId === course?.id);

    const allContents = course ? getAllContents(course) : [];
    const requiredContents = course ? getRequiredContents(course) : [];
    const currentContent = allContents[currentContentIndex];

    // Initialize expanded chapters to include the one with the current content
    useEffect(() => {
        if (course && allContents.length > 0) {
            // Find which chapter the current content belongs to
            let contentCount = 0;
            for (let i = 0; i < course.chapters.length; i++) {
                const chapter = course.chapters[i];
                const chapterContentCount = chapter.contents?.length || 0;

                if (currentContentIndex >= contentCount && currentContentIndex < contentCount + chapterContentCount) {
                    if (!expandedChapters.includes(i)) {
                        setExpandedChapters(prev => [...prev, i]);
                    }
                    break;
                }
                contentCount += chapterContentCount;
            }
        }
    }, [currentContentIndex, course]);

    useEffect(() => {
        if (id) {
            localStorage.setItem(`course_progress_${id}`, JSON.stringify(completedContents));
        }
    }, [completedContents, id]);

    useEffect(() => {
        if (id) {
            localStorage.setItem(`course_scores_${id}`, JSON.stringify(exerciseScores));
        }
    }, [exerciseScores, id]);

    // Auto-complete non-exercise content when viewed
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!currentContent) return;

        // Auto-complete video, pdf, link when first viewed
        if (['video', 'pdf', 'link'].includes(currentContent.type)) {
            if (!completedContents.includes(currentContent.id)) {
                const newCompleted = [...completedContents, currentContent.id];
                setCompletedContents(newCompleted);
                checkCourseCompletion(newCompleted);
            }
        }
    }, [currentContentIndex, currentContent?.id]);

    const checkCourseCompletion = (completed) => {
        const allRequiredDone = requiredContents.every(c =>
            completed.includes(c.id) ||
            (c.type === 'exercise' && exerciseScores[c.id] >= 80)
        );

        // Check if all exercises passed
        const allExercisesPassed = requiredContents
            .filter(c => c.type === 'exercise')
            .every(c => exerciseScores[c.id] >= 80);

        if (allRequiredDone && allExercisesPassed) {
            completeCourse(course.id);
        }
    };

    if (!course) {
        return (
            <div className="watch-page">
                <div className="not-found">
                    <h2>Course not found</h2>
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                </div>
            </div>
        );
    }

    // Calculate progress based on required contents only
    const completedRequiredCount = requiredContents.filter(c =>
        completedContents.includes(c.id) ||
        (c.type === 'exercise' && exerciseScores[c.id] >= 80)
    ).length;
    const progress = requiredContents.length > 0
        ? (completedRequiredCount / requiredContents.length) * 100
        : 0;

    // Check if all exercises passed with >= 80%
    const allExercisesPassed = requiredContents
        .filter(c => c.type === 'exercise')
        .every(c => exerciseScores[c.id] >= 80);

    // Check if course can be completed
    const canComplete = completedRequiredCount === requiredContents.length && allExercisesPassed;

    const handleNextContent = () => {
        if (currentContentIndex < allContents.length - 1) {
            setCurrentContentIndex(currentContentIndex + 1);
        }
    };

    const handlePrevContent = () => {
        if (currentContentIndex > 0) {
            setCurrentContentIndex(currentContentIndex - 1);
        }
    };

    const toggleChapter = (index) => {
        if (expandedChapters.includes(index)) {
            setExpandedChapters(expandedChapters.filter(i => i !== index));
        } else {
            setExpandedChapters([...expandedChapters, index]);
        }
    };

    const handleExerciseComplete = (score) => {
        const newScores = {
            ...exerciseScores,
            [currentContent.id]: score
        };
        setExerciseScores(newScores);

        if (score >= 80) {
            const newCompleted = [...completedContents, currentContent.id];
            setCompletedContents(newCompleted);

            // Check if course is now complete
            const allRequiredDone = requiredContents.every(c =>
                newCompleted.includes(c.id) ||
                (c.type === 'exercise' && (newScores[c.id] >= 80 || c.id === currentContent.id))
            );

            const allExercisesPassed = requiredContents
                .filter(c => c.type === 'exercise')
                .every(c => newScores[c.id] >= 80 || c.id === currentContent.id);

            if (allRequiredDone && allExercisesPassed) {
                completeCourse(course.id);
            }
        }
    };

    const handleClaimCertificate = () => {
        const certId = claimCertificate(course.id, course.title);
        navigate('/my-certificates');
    };

    const handleContentClick = (globalIndex) => {
        setCurrentContentIndex(globalIndex);
    };

    const getContentIcon = (type) => {
        switch (type) {
            case 'video': return <PlayCircle size={18} />;
            case 'pdf': return <FileText size={18} />;
            case 'link': return <ExternalLink size={18} />;
            case 'exercise': return <ClipboardCheck size={18} />;
            default: return <PlayCircle size={18} />;
        }
    };

    const getContentTypeLabel = (type) => {
        switch (type) {
            case 'video': return 'Video';
            case 'pdf': return 'PDF';
            case 'link': return 'Link';
            case 'exercise': return 'Quiz';
            default: return 'Content';
        }
    };

    const renderContentViewer = () => {
        switch (currentContent?.type) {
            case 'video':
                return (
                    <div className="content-viewer-container">
                        <div className="content-preview video-preview">
                            <Play size={64} />
                            <h3>{currentContent.title}</h3>
                            <span className="content-duration">{currentContent.duration}</span>
                            <p className="auto-complete-notice">
                                This content is automatically marked as complete
                            </p>
                        </div>
                    </div>
                );

            case 'pdf':
                return (
                    <div className="content-viewer-container">
                        <div className="content-preview pdf-preview">
                            <FileText size={64} />
                            <h3>{currentContent.title}</h3>
                            <p className="file-size">{currentContent.fileSize}</p>
                            <a
                                href={currentContent.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Download PDF
                            </a>
                            <p className="auto-complete-notice">
                                This content is automatically marked as complete
                            </p>
                        </div>
                    </div>
                );

            case 'link':
                return (
                    <div className="content-viewer-container">
                        <div className="content-preview link-preview">
                            <ExternalLink size={64} />
                            <h3>{currentContent.title}</h3>
                            <p className="link-description">{currentContent.description}</p>
                            <a
                                href={currentContent.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Open Link
                            </a>
                            <p className="auto-complete-notice">
                                This content is automatically marked as complete
                            </p>
                        </div>
                    </div>
                );

            case 'exercise':
                return (
                    <div className="content-viewer-container">
                        <ExerciseQuiz
                            exercise={currentContent}
                            onComplete={handleExerciseComplete}
                            passingScore={currentContent.passingScore || 80}
                            onStart={() => navigate(`/course/quiz/${course.id}/${currentContent.id}`)}
                        />
                    </div>
                );

            default:
                return (
                    <div className="content-viewer-container">
                        <div className="content-preview">
                            <p>Content not available</p>
                        </div>
                    </div>
                );
        }
    };

    let contentIndex = 0;

    return (
        <div className="watch-page">
            {/* Header */}
            <header className="watch-header">
                <div className="header-left">
                    <Link to="/customer/dashboard" className="back-btn">
                        <ChevronLeft size={20} />
                    </Link>
                    <div className="course-info">
                        <h1>{course.title}</h1>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="progress-text">{Math.round(progress)}% complete</span>
                    </div>
                </div>
                <div className="header-right">
                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {canComplete && !hasCertificate && (
                        <button className="btn btn-primary" onClick={handleClaimCertificate}>
                            <Award size={18} />
                            Claim Certificate
                        </button>
                    )}
                    <button
                        className="toggle-sidebar-btn"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? <X size={20} /> : <List size={20} />}
                    </button>
                </div>
            </header>

            <div className="watch-content">
                {/* Content Viewer */}
                <main className="content-section">
                    {renderContentViewer()}

                    <div className="content-info">
                        <div className="content-header">
                            <div>
                                <div className="content-meta">
                                    <span className={`content-type-badge ${currentContent?.type}`}>
                                        {getContentIcon(currentContent?.type)}
                                        {getContentTypeLabel(currentContent?.type)}
                                    </span>
                                    <span className="content-number">
                                        {currentContentIndex + 1} of {allContents.length}
                                    </span>
                                </div>
                                <h2>{currentContent?.title}</h2>
                                <div className="content-navigation" style={{ marginTop: '1rem' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handlePrevContent}
                                        disabled={currentContentIndex === 0}
                                    >
                                        <ChevronLeft size={18} />
                                        Previous
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleNextContent}
                                        disabled={currentContentIndex === allContents.length - 1}
                                    >
                                        Next
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </main>

                {/* Sidebar */}
                <aside className={`lessons-sidebar ${showSidebar ? 'show' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Course Content</h3>
                        <span>{completedContents.length}/{allContents.length} completed</span>
                    </div>

                    <div className="passing-notice">
                        <AlertCircle size={16} />
                        <span>Pass all quizzes with ≥80% to complete</span>
                    </div>

                    <div className="chapters-list">
                        {course.chapters?.map((chapter, chapterIndex) => (
                            <div key={chapterIndex} className="chapter-group">
                                <button
                                    className="chapter-title"
                                    onClick={() => toggleChapter(chapterIndex)}
                                >
                                    <span>{chapter.title}</span>
                                    <div className="chapter-right-side">
                                        <span className="chapter-progress">
                                            {chapter.contents?.filter(c =>
                                                completedContents.includes(c.id) ||
                                                (c.type === 'exercise' && exerciseScores[c.id] >= 80)
                                            ).length}/{chapter.contents?.length}
                                            <CheckCircle size={14} className="chapter-check-icon" />
                                        </span>
                                        {expandedChapters.includes(chapterIndex) ?
                                            <ChevronUp size={16} /> :
                                            <ChevronDown size={16} />
                                        }
                                    </div>
                                </button>
                                {expandedChapters.includes(chapterIndex) && (
                                    <div className="contents-list">
                                        {chapter.contents?.map((content, idx) => {
                                            const globalIndex = contentIndex++;
                                            const isActive = globalIndex === currentContentIndex;
                                            const isContentCompleted = completedContents.includes(content.id) ||
                                                (content.type === 'exercise' && exerciseScores[content.id] >= 80);
                                            const exerciseScore = exerciseScores[content.id];

                                            return (
                                                <button
                                                    key={idx}
                                                    className={`content-item ${isActive ? 'active' : ''} ${isContentCompleted ? 'completed' : ''} ${content.type}`}
                                                    onClick={() => handleContentClick(globalIndex)}
                                                >
                                                    <div className="content-icon">
                                                        {isActive ? (
                                                            <div className="playing-indicator">
                                                                {getContentIcon(content.type)}
                                                            </div>
                                                        ) : (
                                                            getContentIcon(content.type)
                                                        )}
                                                    </div>
                                                    <div className="content-details">
                                                        <span className="content-title">{content.title}</span>
                                                        <div className="content-meta-info">
                                                            <span className={`type-label ${content.type}`}>
                                                                {getContentTypeLabel(content.type)}
                                                            </span>
                                                            {content.duration && (
                                                                <span className="content-duration">{content.duration}</span>
                                                            )}
                                                            {content.type === 'exercise' && exerciseScore !== undefined && (
                                                                <span className={`score-badge ${exerciseScore >= 80 ? 'passed' : 'failed'}`}>
                                                                    {exerciseScore}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                {/* If chapter is not expanded, we still need to increment the index counter without rendering */}
                                {!expandedChapters.includes(chapterIndex) && (
                                    <div style={{ display: 'none' }}>
                                        {chapter.contents?.map(() => { contentIndex++; return null; })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {/* Course Completed Modal */}
            {canComplete && !hasCertificate && completedRequiredCount === requiredContents.length && (
                <div className="completion-modal">
                    <div className="modal-content">
                        <div className="modal-icon">
                            <Award size={64} />
                        </div>
                        <h2>Congratulations!</h2>
                        <p>You've completed the course! Claim your certificate now.</p>
                        <button className="btn btn-primary btn-lg" onClick={handleClaimCertificate}>
                            <Award size={20} />
                            Claim Certificate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchCoursePage;
