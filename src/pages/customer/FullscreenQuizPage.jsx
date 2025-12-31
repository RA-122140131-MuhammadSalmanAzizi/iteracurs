import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses, getAllContents } from '../../data/courses';
import ExerciseQuiz from '../../components/ExerciseQuiz';
import { useAuth } from '../../App';
import { ChevronLeft } from 'lucide-react';
import './WatchCoursePage.css'; // Reuse styles or create new one

const FullscreenQuizPage = () => {
    const { courseId, contentId } = useParams();
    const navigate = useNavigate();
    const { user, completeCourse, completedCourses } = useAuth();
    const [score, setScore] = useState(0);

    // Find course and content
    const course = courses.find(c => c.id === parseInt(courseId));
    const allContents = course ? getAllContents(course) : [];
    const quizContent = allContents.find(c => c.id === parseInt(contentId));

    if (!course || !quizContent || quizContent.type !== 'exercise') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2>Quiz not found</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate(`/watch/${courseId}`)}>
                    Back to Course
                </button>
            </div>
        );
    }

    const handleComplete = (finalScore) => {
        if (finalScore >= (quizContent.passingScore || 80)) {
            // Find current chapter
            const chapter = course.chapters.find(ch => ch.contents.some(c => c.id === quizContent.id));
            if (chapter) {
                // Get existing progress
                const savedProgress = localStorage.getItem(`course_progress_${courseId}`);
                let currentProgress = savedProgress ? JSON.parse(savedProgress) : [];

                // Add all content IDs from this chapter
                const chapterContentIds = chapter.contents.map(c => c.id);
                const newProgress = [...new Set([...currentProgress, ...chapterContentIds])];

                localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(newProgress));
            }

            // Save score
            const savedScores = localStorage.getItem(`course_scores_${courseId}`);
            let currentScores = savedScores ? JSON.parse(savedScores) : {};
            currentScores[quizContent.id] = finalScore;
            localStorage.setItem(`course_scores_${courseId}`, JSON.stringify(currentScores));
        }

        navigate(`/watch/${courseId}`);
    };

    const handleBack = () => {
        navigate(`/watch/${courseId}`);
    };

    return (
        <div className="fullscreen-quiz-page" style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <button onClick={handleBack} className="btn btn-ghost mb-4">
                    <ChevronLeft size={20} />
                    Back to Lesson
                </button>
                <div style={{ background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                    <ExerciseQuiz
                        exercise={quizContent}
                        onComplete={handleComplete}
                        passingScore={quizContent.passingScore || 80}
                        autoStart={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default FullscreenQuizPage;
