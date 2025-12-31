import { useState } from 'react';
import {
    Bell, Send, Users, Mail, Megaphone, Info, User, Search, X
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';

const AdminNotifications = () => {
    const [activeTab, setActiveTab] = useState('broadcast'); // broadcast or personal
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [target, setTarget] = useState('all');
    const [type, setType] = useState('system');

    // Personal message state
    const [selectedUser, setSelectedUser] = useState(null);
    const [personalMessage, setPersonalMessage] = useState('');
    const [userSearch, setUserSearch] = useState('');

    // Mock users list
    const usersList = [
        { id: 1, name: 'John Customer', email: 'john@demo.com', role: 'customer' },
        { id: 2, name: 'Jane Learner', email: 'jane@demo.com', role: 'customer' },
        { id: 3, name: 'Dr. Ahmad Lecturer', email: 'ahmad@demo.com', role: 'dosen' },
        { id: 4, name: 'Sarah Instructor', email: 'sarah@demo.com', role: 'dosen' },
        { id: 5, name: 'Mike Student', email: 'mike@demo.com', role: 'customer' },
    ];

    const filteredUsers = usersList.filter(u =>
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase())
    );

    const [pastBroadcasts, setPastBroadcasts] = useState([
        { id: 1, title: 'System Maintenance', target: 'All Users', time: '2 days ago', type: 'system' },
        { id: 2, title: 'Happy New Year Promo', target: 'Students', time: '1 week ago', type: 'email' },
        { id: 3, title: 'New Instructor Guidelines', target: 'Instructors', time: '2 weeks ago', type: 'both' }
    ]);

    const handleSendBroadcast = (e) => {
        e.preventDefault();

        const newBroadcast = {
            id: Date.now(),
            title,
            target: target === 'all' ? 'All Users' : (target === 'instructors' ? 'Instructors' : 'Students'),
            time: 'Just Now',
            type
        };

        setPastBroadcasts([newBroadcast, ...pastBroadcasts]);

        // Reset form
        setTitle('');
        setMessage('');
        setTarget('all');
        setType('system');

        alert('Broadcast sent successfully!');
    };

    const handleSendPersonal = (e) => {
        e.preventDefault();
        if (!selectedUser) {
            alert('Please select a user first');
            return;
        }

        const newMessage = {
            id: Date.now(),
            title: `Personal: ${personalMessage.substring(0, 30)}...`,
            target: selectedUser.name,
            time: 'Just Now',
            type: 'personal'
        };

        setPastBroadcasts([newMessage, ...pastBroadcasts]);
        setPersonalMessage('');
        setSelectedUser(null);
        setUserSearch('');

        alert(`Message sent to ${selectedUser.name}!`);
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Broadcast & Notifications</h1>
                        <p>Send announcements to users</p>
                    </div>
                </header>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'broadcast' ? 'active' : ''}`}
                        onClick={() => setActiveTab('broadcast')}
                    >
                        <Megaphone size={18} />
                        Broadcast
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        <User size={18} />
                        Personal Message
                    </button>
                </div>

                <div className="admin-grid-layout">
                    {/* Broadcast Tab */}
                    {activeTab === 'broadcast' && (
                        <div className="content-section">
                            <div className="section-header">
                                <h2>Create New Broadcast</h2>
                            </div>
                            <form onSubmit={handleSendBroadcast}>
                                <div className="form-group">
                                    <label>Target Audience</label>
                                    <div className="grid-options">
                                        <label className={`option-card ${target === 'all' ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="target"
                                                checked={target === 'all'}
                                                onChange={() => setTarget('all')}
                                                hidden
                                            />
                                            <Users size={24} />
                                            <span>All Users</span>
                                        </label>
                                        <label className={`option-card ${target === 'instructors' ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="target"
                                                checked={target === 'instructors'}
                                                onChange={() => setTarget('instructors')}
                                                hidden
                                            />
                                            <Megaphone size={24} />
                                            <span>Instructors Only</span>
                                        </label>
                                        <label className={`option-card ${target === 'students' ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="target"
                                                checked={target === 'students'}
                                                onChange={() => setTarget('students')}
                                                hidden
                                            />
                                            <Users size={24} />
                                            <span>Students Only</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Notification Title</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="e.g., Platform Maintenance, New Features"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Message Content</label>
                                    <textarea
                                        className="input"
                                        rows={5}
                                        placeholder="Type your message here..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label>Delivery Method</label>
                                    <select
                                        className="input"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="system">System Notification Only</option>
                                        <option value="email">Email Blast Only</option>
                                        <option value="both">Both System & Email</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <Send size={20} />
                                        Send Broadcast
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Personal Message Tab */}
                    {activeTab === 'personal' && (
                        <div className="content-section">
                            <div className="section-header">
                                <h2>Send Personal Message</h2>
                            </div>
                            <form onSubmit={handleSendPersonal}>
                                <div className="form-group">
                                    <label>Select User</label>
                                    <div className="user-selector">
                                        <div className="search-minimal" style={{ marginBottom: '1rem' }}>
                                            <Search size={16} />
                                            <input
                                                type="text"
                                                placeholder="Search users..."
                                                value={userSearch}
                                                onChange={(e) => setUserSearch(e.target.value)}
                                            />
                                            {userSearch && (
                                                <button type="button" className="clear-btn" onClick={() => setUserSearch('')}>
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>

                                        {selectedUser && (
                                            <div className="selected-user-card">
                                                <div className="user-avatar-sm"><User size={14} /></div>
                                                <div>
                                                    <strong>{selectedUser.name}</strong>
                                                    <span>{selectedUser.email}</span>
                                                </div>
                                                <button type="button" className="btn-icon" onClick={() => setSelectedUser(null)}>
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}

                                        {!selectedUser && (
                                            <div className="users-list-compact">
                                                {filteredUsers.map(user => (
                                                    <button
                                                        type="button"
                                                        key={user.id}
                                                        className="user-list-item"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setUserSearch('');
                                                        }}
                                                    >
                                                        <div className="user-avatar-sm"><User size={14} /></div>
                                                        <div className="user-info">
                                                            <span className="user-name">{user.name}</span>
                                                            <span className="user-email">{user.email}</span>
                                                        </div>
                                                        <span className={`badge badge-${user.role === 'dosen' ? 'warning' : 'secondary'}`}>
                                                            {user.role}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        className="input"
                                        rows={5}
                                        placeholder="Type your personal message here..."
                                        value={personalMessage}
                                        onChange={(e) => setPersonalMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={!selectedUser}>
                                        <Send size={20} />
                                        Send to {selectedUser ? selectedUser.name : 'User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Recent History */}
                    <div className="content-section">
                        <div className="section-header">
                            <h2>Recent Messages</h2>
                        </div>
                        <div className="notifications-list">
                            {pastBroadcasts.map(broadcast => (
                                <div key={broadcast.id} className="notification-item">
                                    <div className={`notif-icon ${broadcast.type}`}>
                                        {broadcast.type === 'system' ? <Info size={20} /> :
                                            broadcast.type === 'email' ? <Mail size={20} /> :
                                                broadcast.type === 'personal' ? <User size={20} /> : <Bell size={20} />}
                                    </div>
                                    <div className="notif-content">
                                        <h4>{broadcast.title}</h4>
                                        <p>Sent to {broadcast.target} • {broadcast.time}</p>
                                        <span className={`badge badge-${broadcast.type === 'system' ? 'secondary' :
                                                broadcast.type === 'email' ? 'primary' :
                                                    broadcast.type === 'personal' ? 'success' : 'warning'
                                            }`}>
                                            {broadcast.type === 'both' ? 'Email & System' :
                                                broadcast.type === 'personal' ? 'Personal' :
                                                    broadcast.type.charAt(0).toUpperCase() + broadcast.type.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminNotifications;
