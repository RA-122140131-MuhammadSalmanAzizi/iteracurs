import { useState } from 'react';
import {
    User, Mail, Lock, Camera
} from 'lucide-react';
import { useAuth } from '../../App';
import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="admin-page">
            <CustomerSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>My Profile</h1>
                        <p>Manage your personal information</p>
                    </div>
                </header>

                <div className="content-section">
                    <div className="profile-form-container" style={{ maxWidth: '600px' }}>
                        <div className="profile-header-section" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="avatar-large" style={{ width: '100px', height: '100px', fontSize: '2rem', background: 'var(--gradient-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {user?.avatar}
                            </div>
                            <div>
                                <button className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Camera size={16} />
                                    Change Avatar
                                </button>
                            </div>
                        </div>
                        <form className="settings-form">
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
                                <div className="input-with-icon" style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--border-radius-md)',
                                    background: 'var(--bg-primary)',
                                    overflow: 'hidden'
                                }}>
                                    <User size={18} style={{ margin: '0 0.75rem', color: 'var(--text-muted)', flexShrink: 0 }} />
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue={user?.name}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 0.75rem 0.75rem 0',
                                            border: 'none',
                                            background: 'transparent',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                                <div className="input-with-icon" style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--border-radius-md)',
                                    background: 'var(--bg-secondary)',
                                    overflow: 'hidden'
                                }}>
                                    <Mail size={18} style={{ margin: '0 0.75rem', color: 'var(--text-muted)', flexShrink: 0 }} />
                                    <input
                                        type="email"
                                        className="input"
                                        defaultValue={user?.email}
                                        readOnly
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 0.75rem 0.75rem 0',
                                            border: 'none',
                                            background: 'transparent',
                                            color: 'var(--text-muted)',
                                            cursor: 'not-allowed',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Current Password</label>
                                <div className="input-with-icon" style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--border-radius-md)',
                                    background: 'var(--bg-primary)',
                                    overflow: 'hidden'
                                }}>
                                    <Lock size={18} style={{ margin: '0 0.75rem', color: 'var(--text-muted)', flexShrink: 0 }} />
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Enter current password"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 0.75rem 0.75rem 0',
                                            border: 'none',
                                            background: 'transparent',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>New Password</label>
                                <div className="input-with-icon" style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--border-radius-md)',
                                    background: 'var(--bg-primary)',
                                    overflow: 'hidden'
                                }}>
                                    <Lock size={18} style={{ margin: '0 0.75rem', color: 'var(--text-muted)', flexShrink: 0 }} />
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Enter new password"
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem 0.75rem 0.75rem 0',
                                            border: 'none',
                                            background: 'transparent',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
