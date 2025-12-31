import { useState } from 'react';
import {
    BookOpen, Users, Search, Eye, Trash2, User, Star, Edit, X
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { courses as coursesData, categories } from '../../data/courses';
import './AdminPages.css';

const AdminData = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const [searchTerm, setSearchTerm] = useState('');

    // Course filters
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');

    // User filters
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal states
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // view or edit

    // Edit form state
    const [editForm, setEditForm] = useState({});

    // Courses state
    const [coursesList, setCoursesList] = useState(coursesData);

    // Mock Users data
    const [usersList, setUsersList] = useState([
        { id: 1, name: 'John Customer', email: 'john@demo.com', role: 'customer', joinedDate: '2024-01-05', status: 'active' },
        { id: 2, name: 'Jane Learner', email: 'jane@demo.com', role: 'customer', joinedDate: '2024-01-10', status: 'active' },
        { id: 3, name: 'Dr. Ahmad Lecturer', email: 'ahmad@demo.com', role: 'dosen', joinedDate: '2023-06-15', status: 'active' },
        { id: 4, name: 'Sarah Instructor', email: 'sarah@demo.com', role: 'dosen', joinedDate: '2023-08-20', status: 'active' },
        { id: 5, name: 'Mike Student', email: 'mike@demo.com', role: 'customer', joinedDate: '2024-02-01', status: 'inactive' },
        { id: 6, name: 'Admin User', email: 'admin@demo.com', role: 'admin', joinedDate: '2023-01-01', status: 'active' },
    ]);

    // Get unique categories from courses
    const courseCategories = [...new Set(coursesData.map(c => c.category))];

    // Filter courses
    const filteredCourses = coursesList.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = categoryFilter === 'all' || c.category === categoryFilter;
        const matchPrice = priceFilter === 'all' ||
            (priceFilter === 'free' && c.isFree) ||
            (priceFilter === 'paid' && !c.isFree);
        return matchSearch && matchCategory && matchPrice;
    });

    // Filter users
    const filteredUsers = usersList.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        const matchStatus = statusFilter === 'all' || u.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
    });

    const getRoleBadge = (role) => {
        const badges = {
            admin: 'badge-error',
            dosen: 'badge-warning',
            customer: 'badge-secondary'
        };
        return badges[role] || 'badge-secondary';
    };

    const handleViewCourse = (course) => {
        setSelectedItem({ type: 'course', data: course });
        setModalMode('view');
        setShowModal(true);
    };

    const handleViewUser = (user) => {
        setSelectedItem({ type: 'user', data: user });
        setModalMode('view');
        setShowModal(true);
    };

    const handleEditCourse = (course) => {
        setSelectedItem({ type: 'course', data: course });
        setEditForm({ ...course });
        setModalMode('edit');
        setShowModal(true);
    };

    const handleEditUser = (user) => {
        setSelectedItem({ type: 'user', data: user });
        setEditForm({ ...user });
        setModalMode('edit');
        setShowModal(true);
    };

    const handleSaveEdit = () => {
        if (selectedItem.type === 'course') {
            setCoursesList(coursesList.map(c =>
                c.id === editForm.id ? editForm : c
            ));
        } else {
            setUsersList(usersList.map(u =>
                u.id === editForm.id ? editForm : u
            ));
        }
        closeModal();
        alert('Changes saved successfully!');
    };

    const handleDeleteCourse = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCoursesList(coursesList.filter(c => c.id !== id));
        }
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsersList(usersList.filter(u => u.id !== id));
        }
    };

    const handleToggleUserStatus = (id) => {
        setUsersList(usersList.map(u =>
            u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
        ));
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setEditForm({});
        setModalMode('view');
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Data Management</h1>
                        <p>Manage courses and users in one place</p>
                    </div>
                </header>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('courses'); setSearchTerm(''); }}
                    >
                        <BookOpen size={18} />
                        Courses ({filteredCourses.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('users'); setSearchTerm(''); }}
                    >
                        <Users size={18} />
                        Users ({filteredUsers.length})
                    </button>
                </div>

                {/* Search & Filters - Aligned in one row */}
                <div className="filters-bar-inline">
                    <div className="search-minimal">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder={activeTab === 'courses' ? 'Search courses...' : 'Search users...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="clear-btn" onClick={() => setSearchTerm('')}>
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Course Filters */}
                    {activeTab === 'courses' && (
                        <>
                            <select
                                className="filter-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {courseCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                className="filter-select"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            >
                                <option value="all">All Prices</option>
                                <option value="free">Free</option>
                                <option value="paid">Premium</option>
                            </select>
                        </>
                    )}

                    {/* User Filters */}
                    {activeTab === 'users' && (
                        <>
                            <select
                                className="filter-select"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="all">All Roles</option>
                                <option value="customer">Customer</option>
                                <option value="dosen">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <select
                                className="filter-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </>
                    )}
                </div>

                <div className="content-section">
                    {/* COURSES TAB */}
                    {activeTab === 'courses' && (
                        <>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th>Instructor</th>
                                            <th>Category</th>
                                            <th>Students</th>
                                            <th>Rating</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCourses.map(course => (
                                            <tr key={course.id}>
                                                <td>
                                                    <div className="course-cell">
                                                        <div className="course-thumb-sm">
                                                            <img src={course.thumbnail} alt={course.title} />
                                                        </div>
                                                        <span className="course-name">{course.title}</span>
                                                    </div>
                                                </td>
                                                <td>{course.instructor}</td>
                                                <td>
                                                    <span className="badge badge-secondary">{course.category}</span>
                                                </td>
                                                <td>{course.students?.toLocaleString()}</td>
                                                <td>
                                                    <div className="rating">
                                                        <Star size={14} fill="#eab308" color="#eab308" />
                                                        <span>{course.rating}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {course.isFree ? (
                                                        <span className="badge badge-success">Free</span>
                                                    ) : (
                                                        `Rp ${course.price.toLocaleString('id-ID')}`
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn-icon"
                                                            title="View Details"
                                                            onClick={() => handleViewCourse(course)}
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-icon text-primary"
                                                            title="Edit Course"
                                                            onClick={() => handleEditCourse(course)}
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-icon text-error"
                                                            title="Delete"
                                                            onClick={() => handleDeleteCourse(course.id)}
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
                            {filteredCourses.length === 0 && (
                                <div className="empty-state">
                                    <BookOpen size={48} />
                                    <h3>No courses found</h3>
                                    <p>Try adjusting your search or filters</p>
                                </div>
                            )}
                        </>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Joined</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map(user => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="user-cell">
                                                        <div className="user-avatar-sm">
                                                            <User size={14} />
                                                        </div>
                                                        <span className="font-medium">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`badge ${getRoleBadge(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td>{user.joinedDate}</td>
                                                <td>
                                                    <button
                                                        className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-secondary'}`}
                                                        onClick={() => handleToggleUserStatus(user.id)}
                                                        style={{ cursor: 'pointer', border: 'none' }}
                                                        title="Click to toggle status"
                                                    >
                                                        {user.status}
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn-icon"
                                                            title="View Details"
                                                            onClick={() => handleViewUser(user)}
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-icon text-primary"
                                                            title="Edit User"
                                                            onClick={() => handleEditUser(user)}
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-icon text-error"
                                                            title="Delete"
                                                            onClick={() => handleDeleteUser(user.id)}
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
                            {filteredUsers.length === 0 && (
                                <div className="empty-state">
                                    <Users size={48} />
                                    <h3>No users found</h3>
                                    <p>Try adjusting your search or filters</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Detail/Edit Modal */}
                {showModal && selectedItem && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}><X size={20} /></button>

                            {modalMode === 'view' && selectedItem.type === 'course' && (
                                <div className="modal-body">
                                    <img src={selectedItem.data.thumbnail} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
                                    <h2>{selectedItem.data.title}</h2>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{selectedItem.data.description}</p>
                                    <div className="modal-details">
                                        <p><strong>Instructor:</strong> {selectedItem.data.instructor}</p>
                                        <p><strong>Category:</strong> {selectedItem.data.category}</p>
                                        <p><strong>Level:</strong> {selectedItem.data.level}</p>
                                        <p><strong>Students:</strong> {selectedItem.data.students?.toLocaleString()}</p>
                                        <p><strong>Rating:</strong> {selectedItem.data.rating} / 5</p>
                                        <p><strong>Price:</strong> {selectedItem.data.isFree ? 'Free' : `Rp ${selectedItem.data.price.toLocaleString('id-ID')}`}</p>
                                    </div>
                                </div>
                            )}

                            {modalMode === 'view' && selectedItem.type === 'user' && (
                                <div className="modal-body">
                                    <div className="user-avatar-lg" style={{ margin: '0 auto 1rem', width: '80px', height: '80px', fontSize: '2rem' }}>
                                        <User size={40} />
                                    </div>
                                    <h2 style={{ textAlign: 'center' }}>{selectedItem.data.name}</h2>
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{selectedItem.data.email}</p>
                                    <div className="modal-details">
                                        <p><strong>Role:</strong> <span className={`badge ${getRoleBadge(selectedItem.data.role)}`}>{selectedItem.data.role}</span></p>
                                        <p><strong>Joined:</strong> {selectedItem.data.joinedDate}</p>
                                        <p><strong>Status:</strong> <span className={`badge ${selectedItem.data.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>{selectedItem.data.status}</span></p>
                                    </div>
                                </div>
                            )}

                            {modalMode === 'edit' && selectedItem.type === 'course' && (
                                <div className="modal-body">
                                    <h2 style={{ marginBottom: '1.5rem' }}>Edit Course</h2>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={editForm.title || ''}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Instructor</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={editForm.instructor || ''}
                                            onChange={(e) => setEditForm({ ...editForm, instructor: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            className="input"
                                            value={editForm.category || ''}
                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        >
                                            {courseCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Price (IDR)</label>
                                        <input
                                            type="number"
                                            className="input"
                                            value={editForm.price || 0}
                                            onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value), isFree: parseInt(e.target.value) === 0 })}
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                                        <button className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
                                    </div>
                                </div>
                            )}

                            {modalMode === 'edit' && selectedItem.type === 'user' && (
                                <div className="modal-body">
                                    <h2 style={{ marginBottom: '1.5rem' }}>Edit User</h2>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={editForm.name || ''}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="input"
                                            value={editForm.email || ''}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <select
                                            className="input"
                                            value={editForm.role || ''}
                                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="dosen">Instructor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            className="input"
                                            value={editForm.status || ''}
                                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                                        <button className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminData;
