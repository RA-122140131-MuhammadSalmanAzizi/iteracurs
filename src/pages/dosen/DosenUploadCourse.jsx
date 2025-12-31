import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Image, Video, Save, ArrowLeft, Plus, Trash2, FileText,
    ExternalLink, ClipboardCheck, GripVertical, ChevronDown, ChevronUp,
    PlayCircle, ImageIcon, AlertCircle, Edit
} from 'lucide-react';
import DosenSidebar from '../../components/DosenSidebar';
import './DosenPages.css';

const DosenUploadCourse = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: '',
        price: '',
        isFree: true,
    });

    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: 'Chapter 1: Introduction',
            expanded: true,
            contents: []
        }
    ]);

    const [showContentModal, setShowContentModal] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [editingQuiz, setEditingQuiz] = useState(null);
    const [editingContentId, setEditingContentId] = useState(null);

    // New content form
    const [newContent, setNewContent] = useState({
        type: 'video',
        title: '',
        duration: '',
        fileUrl: '',
        description: ''
    });

    // Quiz form
    const [quizForm, setQuizForm] = useState({
        title: '',
        duration: '10',
        passingScore: 80,
        questions: []
    });

    // Current question being edited
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        image: null,
        options: ['', '', '', ''],
        correctAnswer: 0
    });

    const categories = [
        'Web Development',
        'Programming',
        'Design',
        'Data Science',
        'Marketing',
        'Business'
    ];

    const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

    const contentTypes = [
        { type: 'video', label: 'Video', icon: Video, color: '#a78bfa' },
        { type: 'pdf', label: 'PDF Document', icon: FileText, color: '#ef4444' },
        { type: 'link', label: 'External Link', icon: ExternalLink, color: '#3b82f6' },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Chapter functions
    const addChapter = () => {
        const newChapter = {
            id: Date.now(),
            title: `Chapter ${chapters.length + 1}: New Chapter`,
            expanded: true,
            contents: []
        };
        setChapters([...chapters, newChapter]);
    };

    const removeChapter = (chapterId) => {
        setChapters(chapters.filter(ch => ch.id !== chapterId));
    };

    const updateChapterTitle = (chapterId, title) => {
        setChapters(chapters.map(ch =>
            ch.id === chapterId ? { ...ch, title } : ch
        ));
    };

    const toggleChapter = (chapterId) => {
        setChapters(chapters.map(ch =>
            ch.id === chapterId ? { ...ch, expanded: !ch.expanded } : ch
        ));
    };

    // Content functions
    const openContentModal = (chapterId) => {
        setSelectedChapterId(chapterId);
        setNewContent({
            type: 'video',
            title: '',
            duration: '',
            fileUrl: '',
            description: ''
        });
        setShowContentModal(true);
    };

    const openEditContentModal = (chapterId, content) => {
        setSelectedChapterId(chapterId);
        setEditingContentId(content.id);
        setNewContent({
            type: content.type,
            title: content.title,
            duration: content.duration || '',
            fileUrl: content.fileUrl || content.url || '',
            description: content.description || ''
        });
        setShowContentModal(true);
    };

    const addContent = () => {
        if (!newContent.title) return;

        if (editingContentId) {
            // Update existing content
            setChapters(chapters.map(ch =>
                ch.id === selectedChapterId
                    ? {
                        ...ch, contents: ch.contents.map(c =>
                            c.id === editingContentId
                                ? { ...c, ...newContent }
                                : c
                        )
                    }
                    : ch
            ));
            setEditingContentId(null);
        } else {
            // Add new content
            const content = {
                id: Date.now(),
                ...newContent,
                required: newContent.type === 'video'
            };

            setChapters(chapters.map(ch =>
                ch.id === selectedChapterId
                    ? { ...ch, contents: [...ch.contents, content] }
                    : ch
            ));
        }

        setShowContentModal(false);
    };

    const removeContent = (chapterId, contentId) => {
        setChapters(chapters.map(ch =>
            ch.id === chapterId
                ? { ...ch, contents: ch.contents.filter(c => c.id !== contentId) }
                : ch
        ));
    };

    // Quiz functions
    const openQuizModal = (chapterId) => {
        setSelectedChapterId(chapterId);
        setQuizForm({
            title: '',
            duration: '10',
            passingScore: 80,
            questions: []
        });
        setCurrentQuestion({
            question: '',
            image: null,
            options: ['', '', '', ''],
            correctAnswer: 0
        });
        setShowQuizModal(true);
    };

    const addQuestionToQuiz = () => {
        if (!currentQuestion.question || currentQuestion.options.some(o => !o.trim())) {
            alert('Please fill in all question fields');
            return;
        }

        setQuizForm(prev => ({
            ...prev,
            questions: [...prev.questions, { ...currentQuestion, id: Date.now() }]
        }));

        setCurrentQuestion({
            question: '',
            image: null,
            options: ['', '', '', ''],
            correctAnswer: 0
        });
    };

    const removeQuestionFromQuiz = (questionId) => {
        setQuizForm(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== questionId)
        }));
    };

    const handleQuestionImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentQuestion(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const saveQuiz = () => {
        if (!quizForm.title || quizForm.questions.length === 0) {
            alert('Please add a title and at least one question');
            return;
        }

        const quiz = {
            id: Date.now(),
            type: 'exercise',
            title: quizForm.title,
            duration: `${quizForm.duration} min`,
            passingScore: quizForm.passingScore,
            required: true,
            questions: quizForm.questions.map((q, idx) => ({
                ...q,
                id: idx + 1
            }))
        };

        setChapters(chapters.map(ch =>
            ch.id === selectedChapterId
                ? { ...ch, contents: [...ch.contents, quiz] }
                : ch
        ));

        setShowQuizModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate: each chapter must have at least 1 video and 1 exercise
        for (const chapter of chapters) {
            const hasVideo = chapter.contents.some(c => c.type === 'video');
            const hasExercise = chapter.contents.some(c => c.type === 'exercise');

            if (!hasVideo) {
                alert(`Chapter "${chapter.title}" must have at least 1 video`);
                return;
            }
            if (!hasExercise) {
                alert(`Chapter "${chapter.title}" must have at least 1 quiz/exercise`);
                return;
            }
        }

        // In real app, this would send to backend
        console.log('Course data:', { ...formData, chapters });
        alert('Course created successfully!');
        navigate('/dosen/courses');
    };

    const getContentIcon = (type) => {
        switch (type) {
            case 'video': return <PlayCircle size={16} />;
            case 'pdf': return <FileText size={16} />;
            case 'link': return <ExternalLink size={16} />;
            case 'exercise': return <ClipboardCheck size={16} />;
            default: return <PlayCircle size={16} />;
        }
    };

    return (
        <div className="dosen-page">
            <DosenSidebar />

            <main className="dosen-main">
                <header className="dosen-header">
                    <div>
                        <Link to="/dosen/courses" className="back-link">
                            <ArrowLeft size={18} />
                            Back to Courses
                        </Link>
                        <h1>Create New Course</h1>
                        <p>Fill in the details to create a new course</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit}>
                    <section className="form-section">
                        <h2>Basic Information</h2>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Course Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="input"
                                    placeholder="Enter a descriptive course title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Description *</label>
                                <textarea
                                    name="description"
                                    className="input"
                                    placeholder="Describe what students will learn in this course"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Level *</label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select level</option>
                                    {levels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>Pricing</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isFree"
                                        checked={formData.isFree}
                                        onChange={handleChange}
                                    />
                                    <span>This is a free course</span>
                                </label>
                            </div>

                            {!formData.isFree && (
                                <div className="form-group">
                                    <label>Price (IDR) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="input"
                                        placeholder="Enter price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required={!formData.isFree}
                                    />
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>Course Thumbnail</h2>
                        <div className="upload-area">
                            <div className="upload-icon">
                                <Image size={28} />
                            </div>
                            <h3>Upload Thumbnail</h3>
                            <p>Drag and drop or click to upload (1280x720 recommended)</p>
                        </div>
                    </section>

                    {/* Course Content Builder */}
                    <section className="form-section">
                        <div className="section-header-row">
                            <h2>Course Content</h2>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={addChapter}>
                                <Plus size={16} />
                                Add Chapter
                            </button>
                        </div>

                        <div className="content-requirement-notice">
                            <AlertCircle size={18} />
                            <span>Each chapter must have at least <strong>1 Video</strong> and <strong>1 Quiz</strong> (required)</span>
                        </div>

                        <div className="chapters-builder">
                            {chapters.map((chapter, chapterIdx) => (
                                <div key={chapter.id} className="chapter-builder-item">
                                    <div className="chapter-builder-header">
                                        <button
                                            type="button"
                                            className="chapter-expand-btn"
                                            onClick={() => toggleChapter(chapter.id)}
                                        >
                                            {chapter.expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </button>
                                        <input
                                            type="text"
                                            className="chapter-title-input"
                                            value={chapter.title}
                                            onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                                            placeholder="Chapter title"
                                        />
                                        <span className="chapter-content-count">
                                            {chapter.contents.length} items
                                        </span>
                                        {chapters.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn-icon delete"
                                                onClick={() => removeChapter(chapter.id)}
                                                style={{ width: '36px', height: '36px' }}
                                                title="Delete Chapter"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>

                                    {chapter.expanded && (
                                        <div className="chapter-contents">
                                            {chapter.contents.length === 0 ? (
                                                <div className="empty-content-notice">
                                                    <p>No content added yet</p>
                                                </div>
                                            ) : (
                                                <div className="content-list-builder">
                                                    {chapter.contents.map((content, idx) => (
                                                        <div key={content.id} className={`content-builder-item ${content.type}`}>
                                                            <div className="content-builder-info">
                                                                {getContentIcon(content.type)}
                                                                <span className="content-builder-title">{content.title}</span>
                                                                <span className={`content-type-tag ${content.type}`}>
                                                                    {content.type === 'exercise' ? 'Quiz' : content.type}
                                                                </span>
                                                                {content.type === 'exercise' && (
                                                                    <span className="question-count">
                                                                        {content.questions?.length} questions
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="content-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button
                                                                    type="button"
                                                                    className="btn-icon"
                                                                    onClick={() => openEditContentModal(chapter.id, content)}
                                                                    style={{ width: '32px', height: '32px' }}
                                                                    title="Edit Content"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn-icon delete"
                                                                    onClick={() => removeContent(chapter.id, content.id)}
                                                                    style={{ width: '32px', height: '32px' }}
                                                                    title="Delete Content"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="add-content-buttons">
                                                <button
                                                    type="button"
                                                    className="add-content-btn"
                                                    onClick={() => openContentModal(chapter.id)}
                                                >
                                                    <Plus size={16} />
                                                    Add Content
                                                </button>
                                                <button
                                                    type="button"
                                                    className="add-content-btn quiz"
                                                    onClick={() => openQuizModal(chapter.id)}
                                                >
                                                    <ClipboardCheck size={16} />
                                                    Add Quiz
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/dosen/courses')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} />
                            Save Course
                        </button>
                    </div>
                </form>

                {/* Add Content Modal */}
                {showContentModal && (
                    <div className="modal-overlay" onClick={() => setShowContentModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Add Content</h2>

                            <div className="content-type-selector">
                                {contentTypes.map(ct => (
                                    <button
                                        key={ct.type}
                                        type="button"
                                        className={`type-option ${newContent.type === ct.type ? 'active' : ''}`}
                                        onClick={() => setNewContent({ ...newContent, type: ct.type })}
                                    >
                                        <ct.icon size={20} style={{ color: ct.color }} />
                                        <span>{ct.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="modal-form">
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={newContent.title}
                                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                                        placeholder="Content title"
                                    />
                                </div>

                                {newContent.type === 'video' && (
                                    <>
                                        <div className="form-group">
                                            <label>Duration</label>
                                            <input
                                                type="text"
                                                className="input"
                                                value={newContent.duration}
                                                onChange={(e) => setNewContent({ ...newContent, duration: e.target.value })}
                                                placeholder="e.g., 15:00"
                                            />
                                        </div>
                                        <div className="upload-area small">
                                            <Video size={24} />
                                            <p>Upload video file</p>
                                        </div>
                                    </>
                                )}

                                {newContent.type === 'pdf' && (
                                    <div className="upload-area small">
                                        <FileText size={24} />
                                        <p>Upload PDF file</p>
                                    </div>
                                )}

                                {newContent.type === 'link' && (
                                    <>
                                        <div className="form-group">
                                            <label>URL *</label>
                                            <input
                                                type="url"
                                                className="input"
                                                value={newContent.fileUrl}
                                                onChange={(e) => setNewContent({ ...newContent, fileUrl: e.target.value })}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                className="input"
                                                value={newContent.description}
                                                onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                                                placeholder="Brief description"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowContentModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={addContent}>
                                    Add Content
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Quiz Modal */}
                {showQuizModal && (
                    <div className="modal-overlay" onClick={() => setShowQuizModal(false)}>
                        <div className="modal-content quiz-modal" onClick={e => e.stopPropagation()}>
                            <h2>Create Quiz</h2>

                            <div className="modal-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Quiz Title *</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={quizForm.title}
                                            onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                                            placeholder="e.g., Chapter 1 Quiz"
                                        />
                                    </div>
                                    <div className="form-group small">
                                        <label>Duration (min)</label>
                                        <input
                                            type="number"
                                            className="input"
                                            value={quizForm.duration}
                                            onChange={(e) => setQuizForm({ ...quizForm, duration: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group small">
                                        <label>Passing %</label>
                                        <input
                                            type="number"
                                            className="input"
                                            value={quizForm.passingScore}
                                            onChange={(e) => setQuizForm({ ...quizForm, passingScore: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                {/* Questions List */}
                                {quizForm.questions.length > 0 && (
                                    <div className="questions-list">
                                        <h4>Questions ({quizForm.questions.length})</h4>
                                        {quizForm.questions.map((q, idx) => (
                                            <div key={q.id} className="question-preview">
                                                <span className="q-number">{idx + 1}</span>
                                                <span className="q-text">{q.question.substring(0, 50)}...</span>
                                                {q.image && <ImageIcon size={14} className="has-image" />}
                                                <button
                                                    type="button"
                                                    className="btn-icon delete"
                                                    onClick={() => removeQuestionFromQuiz(q.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add New Question */}
                                <div className="add-question-form">
                                    <h4>Add Question</h4>

                                    <div className="form-group">
                                        <label>Question *</label>
                                        <textarea
                                            className="input"
                                            value={currentQuestion.question}
                                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                                            placeholder="Enter your question"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Image (optional)</label>
                                        <div className="image-upload-row">
                                            {currentQuestion.image ? (
                                                <div className="question-image-preview">
                                                    <img src={currentQuestion.image} alt="Question" />
                                                    <button
                                                        type="button"
                                                        className="remove-image"
                                                        onClick={() => setCurrentQuestion({ ...currentQuestion, image: null })}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="image-upload-btn">
                                                    <ImageIcon size={16} />
                                                    <span>Upload Image</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleQuestionImageUpload}
                                                        hidden
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div className="options-form">
                                        <label>Options * (Select correct answer)</label>
                                        {currentQuestion.options.map((opt, idx) => (
                                            <div key={idx} className="option-input-row">
                                                <input
                                                    type="radio"
                                                    name="correctAnswer"
                                                    checked={currentQuestion.correctAnswer === idx}
                                                    onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: idx })}
                                                />
                                                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                                <input
                                                    type="text"
                                                    className="input"
                                                    value={opt}
                                                    onChange={(e) => {
                                                        const newOptions = [...currentQuestion.options];
                                                        newOptions[idx] = e.target.value;
                                                        setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                                    }}
                                                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={addQuestionToQuiz}
                                    >
                                        <Plus size={16} />
                                        Add Question
                                    </button>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowQuizModal(false)}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={saveQuiz}
                                    disabled={quizForm.questions.length === 0}
                                >
                                    <Save size={16} />
                                    Save Quiz ({quizForm.questions.length} questions)
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DosenUploadCourse;
