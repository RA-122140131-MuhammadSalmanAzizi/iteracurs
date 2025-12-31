import { useState } from 'react';
import { Save, Plus, Trash2, Folder, Tag, AlertTriangle } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';
import { categories } from '../../data/courses';

const AdminCourseSettings = () => {
    const [courseCategories, setCourseCategories] = useState(categories);
    const [levels, setLevels] = useState(['Beginner', 'Intermediate', 'Advanced']);
    const [maxUploadSize, setMaxUploadSize] = useState(500); // MB
    const [allowGuestPreview, setAllowGuestPreview] = useState(true);

    const handleAddCategory = () => {
        const name = prompt('Enter new category name:');
        if (name) {
            setCourseCategories([...courseCategories, { id: Date.now(), name, icon: 'Folder', count: 0 }]);
        }
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Delete this category?')) {
            setCourseCategories(courseCategories.filter(c => c.id !== id));
        }
    };

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Course Settings</h1>
                        <p>Configure course options, allowed categories, and limits</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} />
                        Save Changes
                    </button>
                </header>

                <div className="admin-grid-layout two-columns">
                    {/* General Settings */}
                    <div className="content-section">
                        <div className="section-header">
                            <h2>General Configuration</h2>
                        </div>
                        <div className="form-group">
                            <label>Maximum Video Upload Size (MB)</label>
                            <input
                                type="number"
                                className="input"
                                value={maxUploadSize}
                                onChange={(e) => setMaxUploadSize(e.target.value)}
                            />
                            <p className="helper-text">Limit per video file for instructors.</p>
                        </div>
                        <div className="form-group">
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={allowGuestPreview}
                                    onChange={(e) => setAllowGuestPreview(e.target.checked)}
                                    style={{ width: '1.25rem', height: '1.25rem' }}
                                />
                                <span>Allow Guest Preview for Free Courses</span>
                            </label>
                        </div>
                    </div>

                    {/* Course Levels */}
                    <div className="content-section">
                        <div className="section-header">
                            <h2>Course Levels</h2>
                        </div>
                        <div className="tags-container">
                            {levels.map(level => (
                                <div key={level} className="tag-chip">
                                    {level}
                                </div>
                            ))}
                        </div>
                        <p className="helper-text mt-2">Standard difficulty levels available for courses.</p>
                    </div>

                    {/* Categories Management */}
                    <div className="content-section full-width">
                        <div className="section-header">
                            <h2>Course Categories</h2>
                            <button className="btn btn-outline btn-sm" onClick={handleAddCategory}>
                                <Plus size={16} />
                                Add Category
                            </button>
                        </div>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Icon</th>
                                        <th>Courses Count</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseCategories.map(cat => (
                                        <tr key={cat.id}>
                                            <td><span className="font-medium">{cat.name}</span></td>
                                            <td><code style={{ background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px' }}>{cat.icon}</code></td>
                                            <td>{cat.count}</td>
                                            <td>
                                                <button className="icon-btn danger" onClick={() => handleDeleteCategory(cat.id)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminCourseSettings;
