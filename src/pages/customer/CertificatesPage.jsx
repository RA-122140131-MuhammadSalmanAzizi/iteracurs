import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, Calendar, BookOpen, Copy, Search } from 'lucide-react';
import { useAuth } from '../../App';
import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';
import './CertificatesPage.css'; // Keep custom styles for certificate card if needed

const CertificatesPage = () => {
    const { user, certificates } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCertificates = certificates.filter(cert =>
        cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCopyId = (certId) => {
        navigator.clipboard.writeText(certId);
        alert(`Certificate ID "${certId}" copied to clipboard!`);
    };

    return (
        <div className="admin-page">
            <CustomerSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>My Certificates</h1>
                        <p>Your achievements and earned certificates</p>
                    </div>
                    <div className="header-actions">
                        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '0.5rem 1rem', width: '300px' }}>
                            <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Search certificates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none' }}
                            />
                        </div>
                    </div>
                </header>

                <div className="content-section">
                    {filteredCertificates && filteredCertificates.length > 0 ? (
                        <div className="certificates-grid">
                            {filteredCertificates.map((cert) => (
                                <div key={cert.id} className="certificate-card">
                                    <div className="certificate-badge">
                                        <Award size={48} />
                                    </div>

                                    <div className="certificate-content">
                                        <h3>{cert.courseName}</h3>

                                        <div className="certificate-meta">
                                            <div className="meta-item">
                                                <Calendar size={16} />
                                                <span>Issued: {formatDate(cert.issuedDate)}</span>
                                            </div>
                                            <div className="meta-item cert-id-row">
                                                <BookOpen size={16} />
                                                <span>ID: {cert.id}</span>
                                                <button
                                                    className="copy-btn"
                                                    onClick={() => handleCopyId(cert.id)}
                                                    title="Copy Certificate ID"
                                                >
                                                    <Copy size={14} />
                                                    {/* Copy text is hidden on small screens in CSS usually, but icon is fine */}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="certificate-recipient">
                                            <p>Awarded to</p>
                                            <h4>{cert.userName}</h4>
                                        </div>

                                        <div className="certificate-actions">
                                            <button className="btn btn-primary">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </div>
                                    </div>

                                    <div className="certificate-decoration">
                                        <div className="decoration-circle"></div>
                                        <div className="decoration-circle"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Award size={64} />
                            </div>
                            <h2>No Certificates Yet</h2>
                            <p>Complete a course to earn your first certificate!</p>
                            <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CertificatesPage;
