import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    // Mock notifications
    const notifications = [
        { id: 1, title: 'Welcome to Platform', message: 'Start your learning journey today!', time: '2 days ago', read: true },
        { id: 2, title: 'System Update', message: 'We have updated our privacy policy.', time: '1 week ago', read: false }
    ];

    return (
        <div className="notification-wrapper" style={{ position: 'relative' }}>
            <button
                className="btn-icon"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                    position: 'relative',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px'
                }}
            >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                    <span style={{
                        position: 'absolute', top: 0, right: 0,
                        width: 10, height: 10, background: 'var(--error)',
                        borderRadius: '50%', border: '2px solid var(--bg-card)'
                    }}></span>
                )}
            </button>

            {showNotifications && (
                <div className="dropdown-menu notifications-dropdown" style={{
                    width: '320px', right: '0', top: '120%',
                    position: 'absolute', zIndex: 1000,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.5rem 0',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="dropdown-header" style={{
                        padding: '1rem', borderBottom: '1px solid var(--border-color)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <span style={{ fontWeight: 600 }}>Notifications</span>
                        <button
                            style={{ fontSize: '0.75rem', color: 'var(--primary-500)', background: 'none', border: 'none', cursor: 'pointer' }}
                            onClick={() => alert('Mark all read')}
                        >
                            Mark all read
                        </button>
                    </div>
                    <div className="notification-list" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        {notifications.map(notif => (
                            <div key={notif.id} className="dropdown-item" style={{
                                display: 'block', padding: '1rem', borderBottom: '1px solid var(--border-color)',
                                background: !notif.read ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{notif.title}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>{notif.message}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                        <Link to="/notifications" className="text-xs text-primary" style={{ fontSize: '0.8rem', color: 'var(--primary-500)', textDecoration: 'none' }}>View All</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
