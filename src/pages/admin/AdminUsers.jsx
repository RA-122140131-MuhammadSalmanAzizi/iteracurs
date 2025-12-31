import { useState } from 'react';
import {
    Search, Edit, UserX
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';

const AdminUsers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [usersList, setUsersList] = useState([
        { id: 1, name: 'John Customer', email: 'customer@demo.com', role: 'customer', status: 'active', joinDate: '2024-01-15' },
        { id: 2, name: 'Dr. Ahmad Lecturer', email: 'dosen@demo.com', role: 'dosen', status: 'active', joinDate: '2024-01-10' },
        { id: 3, name: 'Admin User', email: 'admin@demo.com', role: 'admin', status: 'active', joinDate: '2024-01-01' },
        { id: 4, name: 'Jane Learner', email: 'jane@example.com', role: 'customer', status: 'active', joinDate: '2024-01-20' },
        { id: 5, name: 'Prof. Sarah Chen', email: 'sarah@example.com', role: 'dosen', status: 'inactive', joinDate: '2024-01-05' },
    ]);

    const filteredUsers = usersList.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleEdit = (userId) => {
        alert(`Edit mode for user ID: ${userId}\n\nThis would open an edit form in a real application.`);
    };

    const handleDeactivate = (userId) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            setUsersList(usersList.map(u =>
                u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
            ));
            alert('User status updated!');
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Users Management</h1>
                        <p>Manage all users on the platform</p>
                    </div>
                </header>

                <section className="content-section">
                    <div className="filter-bar">
                        <div className="search-input">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                            <option value="all">All Roles</option>
                            <option value="customer">Customer</option>
                            <option value="dosen">Dosen</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Join Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-avatar">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="user-name">{user.name}</p>
                                                    <p className="user-email">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`role-badge ${user.role}`}>{user.role}</span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${user.status}`}>{user.status}</span>
                                        </td>
                                        <td>{user.joinDate}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-btn"
                                                    onClick={() => handleEdit(user.id)}
                                                    title="Edit User"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="action-btn reject"
                                                    onClick={() => handleDeactivate(user.id)}
                                                    title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                                                >
                                                    <UserX size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminUsers;

