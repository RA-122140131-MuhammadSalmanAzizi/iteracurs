import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Users, TrendingUp, DollarSign, BookOpen, MessageSquare, Award, Settings, X, PlusCircle,
    Star, User, Database
} from 'lucide-react';
import { useAuth } from '../../App';
import { stats } from '../../data/courses';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [isEditingActions, setIsEditingActions] = useState(false);
    const [activeActions, setActiveActions] = useState([
        { id: 'data', label: 'Data Management', path: '/admin/data', icon: Database, visible: true },
        { id: 'reviews', label: 'Reviews', path: '/admin/reviews', icon: Star, visible: true },
        { id: 'settings', label: 'Course Settings', path: '/admin/settings', icon: Settings, visible: true },
        { id: 'profile', label: 'My Profile', path: '/profile', icon: User, visible: false }
    ]);

    const toggleAction = (id) => {
        const action = activeActions.find(a => a.id === id);
        const activeCount = activeActions.filter(a => a.visible).length;

        if (!action.visible && activeCount >= 4) {
            alert('You can only pin up to 4 quick actions.');
            return;
        }

        setActiveActions(activeActions.map(action =>
            action.id === id ? { ...action, visible: !action.visible } : action
        ));
    };

    const dashboardStats = [
        { label: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: Users, color: 'primary', change: '+12%' },
        { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'secondary', change: '+5%' },
        { label: 'Instructors', value: stats.totalInstructors, icon: Users, color: 'warning', change: '+3%' },
        { label: 'Revenue', value: 'Rp 125M', icon: DollarSign, color: 'success', change: '+18%' },
    ];

    const recentActivities = [
        { type: 'user', text: 'New user registered: John Doe', time: '5 minutes ago' },
        { type: 'course', text: 'New course published: React Advanced', time: '1 hour ago' },
        { type: 'review', text: 'New review pending approval', time: '2 hours ago' },
        { type: 'certificate', text: 'Certificate claimed by Jane Smith', time: '3 hours ago' },
    ];

    return (
        <div className="admin-page">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Dashboard Overview</h1>
                        <p>Welcome back, {user?.name}!</p>
                    </div>
                    <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="date-display">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </header>

                <div className="stats-grid">
                    {dashboardStats.map((stat, index) => (
                        <div key={index} className={`stat-card ${stat.color}`}>
                            <div className="stat-header">
                                <div className="stat-icon">
                                    <stat.icon size={24} />
                                </div>
                                <span className="stat-change positive">{stat.change}</span>
                            </div>
                            <p className="stat-value">{stat.value}</p>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="dashboard-grid">
                    {/* Recent Activity */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Recent Activity</h2>
                        </div>
                        <div className="activity-list">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className={`activity-dot ${activity.type}`}></div>
                                    <div className="activity-content">
                                        <p>{activity.text}</p>
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Quick Actions</h2>
                            <button
                                className="btn-icon"
                                onClick={() => setIsEditingActions(!isEditingActions)}
                                title={isEditingActions ? "Done Editing" : "Customize Actions"}
                            >
                                <Settings size={18} color={isEditingActions ? 'var(--primary-500)' : 'var(--text-muted)'} />
                            </button>
                        </div>

                        {isEditingActions ? (
                            <div className="quick-actions-editor" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                                {activeActions.map(action => (
                                    <button
                                        key={action.id}
                                        onClick={() => toggleAction(action.id)}
                                        className={`quick-action-btn ${action.visible ? 'active' : ''}`}
                                        style={{
                                            opacity: action.visible ? 1 : 0.5,
                                            border: action.visible ? '1px solid var(--primary-500)' : '1px dashed var(--border-color)',
                                            position: 'relative',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: action.visible ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                            {action.visible ? <X size={14} /> : <PlusCircle size={14} />}
                                        </div>
                                        <action.icon size={20} />
                                        <span style={{ fontSize: '0.8rem' }}>{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="quick-actions">
                                {activeActions.filter(a => a.visible).map(action => (
                                    <Link key={action.id} to={action.path} className="quick-action-btn">
                                        <action.icon size={20} />
                                        <span>{action.label}</span>
                                    </Link>
                                ))}
                                {activeActions.filter(a => a.visible).length === 0 && (
                                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', width: '100%' }}>No quick actions pinned.</p>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

