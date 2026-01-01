import { useState } from 'react';
import { Save, Plus, Trash2, Edit, Video, FileText, HelpCircle, Clock } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';
import { categories } from '../../data/courses';

const AdminCourseSettings = () => {
    // Categories
    const [courseCategories, setCourseCategories] = useState(categories);

    // Levels
    const [levels, setLevels] = useState([
        { id: 1, name: 'Beginner', description: 'For those new to the subject' },
        { id: 2, name: 'Intermediate', description: 'Some prior knowledge required' },
        { id: 3, name: 'Advanced', description: 'For experienced learners' }
    ]);

    // Content Types allowed
    const [contentTypes, setContentTypes] = useState([
        { id: 1, name: 'Video', icon: 'Video', enabled: true },
        { id: 2, name: 'Article/Text', icon: 'FileText', enabled: true },
        { id: 3, name: 'Quiz', icon: 'HelpCircle', enabled: true },
        { id: 4, name: 'Exercise', icon: 'FileText', enabled: true }
    ]);

    // Upload & Course Settings
    const [settings, setSettings] = useState({
        maxVideoSize: 500, // MB
        maxThumbnailSize: 5, // MB
        allowedVideoFormats: ['mp4', 'webm', 'mov'],
        allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
        minLessonsPerCourse: 3,
        maxLessonsPerCourse: 100,
        minQuizQuestions: 3,
        maxQuizQuestions: 50,
        allowGuestPreview: true,
        requireCourseDescription: true,
        minDescriptionLength: 100,
        defaultCurrency: 'IDR',
        minPrice: 0,
        maxPrice: 5000000
    });

    // Edit modes
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingLevel, setEditingLevel] = useState(null);

    const handleAddCategory = () => {
        const name = prompt('Enter new category name:');
        if (name) {
            setCourseCategories([...courseCategories, { id: Date.now(), name, icon: 'Folder', count: 0 }]);
        }
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Delete this category? Courses using this category may be affected.')) {
            setCourseCategories(courseCategories.filter(c => c.id !== id));
        }
    };

    const handleEditCategory = (id, newName) => {
        setCourseCategories(courseCategories.map(c =>
            c.id === id ? { ...c, name: newName } : c
        ));
        setEditingCategory(null);
    };

    const handleAddLevel = () => {
        const name = prompt('Enter new level name:');
        const description = prompt('Enter level description:');
        if (name) {
            setLevels([...levels, { id: Date.now(), name, description: description || '' }]);
        }
    };

    const handleDeleteLevel = (id) => {
        if (window.confirm('Delete this level?')) {
            setLevels(levels.filter(l => l.id !== id));
        }
    };

    const toggleContentType = (id) => {
        setContentTypes(contentTypes.map(ct =>
            ct.id === id ? { ...ct, enabled: !ct.enabled } : ct
        ));
    };

    const handleSettingChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    const handleSave = () => {
        // In real app, save to backend
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Course Settings</h1>
                        <p>Configure options for course creation and management</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} />
                        Save All Changes
                    </button>
                </header>

                <div className="settings-grid">
                    {/* Categories Section */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Course Categories</h2>
                            <button className="btn btn-outline btn-sm" onClick={handleAddCategory}>
                                <Plus size={16} />
                                Add Category
                            </button>
                        </div>
                        <div className="settings-list">
                            {courseCategories.map(cat => (
                                <div key={cat.id} className="settings-item">
                                    {editingCategory === cat.id ? (
                                        <input
                                            type="text"
                                            className="input"
                                            defaultValue={cat.name}
                                            autoFocus
                                            onBlur={(e) => handleEditCategory(cat.id, e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleEditCategory(cat.id, e.target.value)}
                                        />
                                    ) : (
                                        <>
                                            <span className="settings-item-name">{cat.name}</span>
                                            <span className="settings-item-count">{cat.count} courses</span>
                                            <div className="settings-item-actions">
                                                <button className="btn-icon" onClick={() => setEditingCategory(cat.id)}>
                                                    <Edit size={14} />
                                                </button>
                                                <button className="btn-icon text-error" onClick={() => handleDeleteCategory(cat.id)}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Levels Section */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Course Levels</h2>
                            <button className="btn btn-outline btn-sm" onClick={handleAddLevel}>
                                <Plus size={16} />
                                Add Level
                            </button>
                        </div>
                        <div className="settings-list">
                            {levels.map(level => (
                                <div key={level.id} className="settings-item">
                                    <div>
                                        <span className="settings-item-name">{level.name}</span>
                                        <span className="settings-item-desc">{level.description}</span>
                                    </div>
                                    <button className="btn-icon text-error" onClick={() => handleDeleteLevel(level.id)}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Content Types */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Allowed Content Types</h2>
                        </div>
                        <div className="content-types-grid">
                            {contentTypes.map(ct => (
                                <label key={ct.id} className={`content-type-card ${ct.enabled ? 'enabled' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={ct.enabled}
                                        onChange={() => toggleContentType(ct.id)}
                                        hidden
                                    />
                                    <div className="content-type-icon">
                                        {ct.icon === 'Video' && <Video size={24} />}
                                        {ct.icon === 'FileText' && <FileText size={24} />}
                                        {ct.icon === 'HelpCircle' && <HelpCircle size={24} />}
                                    </div>
                                    <span>{ct.name}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Upload Settings */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Upload Limits</h2>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Max Video Size (MB)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.maxVideoSize}
                                    onChange={(e) => handleSettingChange('maxVideoSize', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Max Thumbnail Size (MB)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.maxThumbnailSize}
                                    onChange={(e) => handleSettingChange('maxThumbnailSize', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Allowed Video Formats</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={settings.allowedVideoFormats.join(', ')}
                                    onChange={(e) => handleSettingChange('allowedVideoFormats', e.target.value.split(', '))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Allowed Image Formats</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={settings.allowedImageFormats.join(', ')}
                                    onChange={(e) => handleSettingChange('allowedImageFormats', e.target.value.split(', '))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Course Requirements */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Course Requirements</h2>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Min Lessons per Course</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.minLessonsPerCourse}
                                    onChange={(e) => handleSettingChange('minLessonsPerCourse', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Max Lessons per Course</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.maxLessonsPerCourse}
                                    onChange={(e) => handleSettingChange('maxLessonsPerCourse', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Min Quiz Questions</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.minQuizQuestions}
                                    onChange={(e) => handleSettingChange('minQuizQuestions', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Max Quiz Questions</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.maxQuizQuestions}
                                    onChange={(e) => handleSettingChange('maxQuizQuestions', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Min Description Length (chars)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.minDescriptionLength}
                                    onChange={(e) => handleSettingChange('minDescriptionLength', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing Settings */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Pricing Settings</h2>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Currency</label>
                                <select
                                    className="input"
                                    value={settings.defaultCurrency}
                                    onChange={(e) => handleSettingChange('defaultCurrency', e.target.value)}
                                >
                                    <option value="IDR">IDR (Indonesian Rupiah)</option>
                                    <option value="USD">USD (US Dollar)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Minimum Price</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.minPrice}
                                    onChange={(e) => handleSettingChange('minPrice', parseInt(e.target.value))}
                                />
                                <span className="helper-text">Set to 0 to allow free courses</span>
                            </div>
                            <div className="form-group">
                                <label>Maximum Price</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={settings.maxPrice}
                                    onChange={(e) => handleSettingChange('maxPrice', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* General Settings */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>General Options</h2>
                        </div>
                        <div className="checkbox-list">
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={settings.allowGuestPreview}
                                    onChange={(e) => handleSettingChange('allowGuestPreview', e.target.checked)}
                                />
                                <span>Allow guest users to preview free course content</span>
                            </label>
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={settings.requireCourseDescription}
                                    onChange={(e) => handleSettingChange('requireCourseDescription', e.target.checked)}
                                />
                                <span>Require course description for all courses</span>
                            </label>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AdminCourseSettings;
