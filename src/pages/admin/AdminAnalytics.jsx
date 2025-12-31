import { useState } from 'react';
import {
    TrendingUp, Users, BookOpen, DollarSign, Star, BarChart2, PieChart, Award,
    Download, Calendar
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { courses, stats, reviews } from '../../data/courses';
import './AdminPages.css';

const AdminAnalytics = () => {
    const [periodType, setPeriodType] = useState('preset'); // preset or custom
    const [presetPeriod, setPresetPeriod] = useState('month');
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

    // Calculate analytics from data
    const totalRevenue = courses.reduce((sum, c) => sum + (c.price * (c.students || 0)), 0);
    const avgRating = (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1);
    const freeCourses = courses.filter(c => c.isFree).length;
    const paidCourses = courses.filter(c => !c.isFree).length;
    const approvedReviews = reviews.filter(r => r.status === 'approved').length;
    const pendingReviews = reviews.filter(r => r.status === 'pending').length;

    // Mock instructor performance data
    const instructorStats = [
        { name: 'Dr. Ahmad Lecturer', courses: 3, students: 15420, rating: 4.8, revenue: 'Rp 45M' },
        { name: 'Sarah Instructor', courses: 2, students: 8320, rating: 4.6, revenue: 'Rp 28M' },
        { name: 'Mike Teacher', courses: 4, students: 12100, rating: 4.7, revenue: 'Rp 38M' },
        { name: 'Lisa Expert', courses: 2, students: 6500, rating: 4.9, revenue: 'Rp 22M' },
    ];

    // Mock customer activity
    const customerActivity = [
        { period: 'This Week', newUsers: 342, enrollments: 856, completions: 124 },
        { period: 'Last Week', newUsers: 298, enrollments: 721, completions: 98 },
        { period: 'This Month', newUsers: 1256, enrollments: 3420, completions: 456 },
    ];

    // Course performance
    const topCourses = courses.slice(0, 5).map(c => ({
        title: c.title,
        students: c.students,
        rating: c.rating,
        revenue: c.isFree ? 'Free' : `Rp ${((c.price * c.students) / 1000000).toFixed(1)}M`
    }));

    const handleDownloadCSV = () => {
        // Generate CSV data
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Analytics Report\n";
        csvContent += `Period: ${periodType === 'preset' ? presetPeriod : `${startDate} to ${endDate}`}\n\n`;

        csvContent += "SUMMARY\n";
        csvContent += `Total Customers,${stats.totalStudents}\n`;
        csvContent += `Active Courses,${courses.length}\n`;
        csvContent += `Avg Rating,${avgRating}\n`;
        csvContent += `Certificates Issued,${stats.totalCertificates}\n\n`;

        csvContent += "INSTRUCTOR PERFORMANCE\n";
        csvContent += "Name,Courses,Students,Rating,Revenue\n";
        instructorStats.forEach(inst => {
            csvContent += `${inst.name},${inst.courses},${inst.students},${inst.rating},${inst.revenue}\n`;
        });

        csvContent += "\nTOP COURSES\n";
        csvContent += "Title,Students,Rating,Revenue\n";
        topCourses.forEach(c => {
            csvContent += `${c.title},${c.students},${c.rating},${c.revenue}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowDownloadMenu(false);
    };

    const handleDownloadPDF = () => {
        // Create a printable HTML version for PDF
        const period = periodType === 'preset' ? presetPeriod : `${startDate} to ${endDate}`;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Analytics Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    h1 { color: #7c2d12; margin-bottom: 5px; }
                    h2 { color: #333; margin-top: 30px; border-bottom: 2px solid #7c2d12; padding-bottom: 10px; }
                    .period { color: #666; margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background: #7c2d12; color: white; }
                    tr:nth-child(even) { background: #f9f9f9; }
                    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px 0; }
                    .summary-card { background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; }
                    .summary-value { font-size: 24px; font-weight: bold; color: #7c2d12; }
                    .summary-label { color: #666; }
                </style>
            </head>
            <body>
                <h1>Analytics Report</h1>
                <p class="period">Period: ${period} | Generated: ${new Date().toLocaleDateString()}</p>
                
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="summary-value">${stats.totalStudents.toLocaleString()}</div>
                        <div class="summary-label">Total Customers</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-value">${courses.length}</div>
                        <div class="summary-label">Active Courses</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-value">${avgRating}</div>
                        <div class="summary-label">Avg. Rating</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-value">${stats.totalCertificates.toLocaleString()}</div>
                        <div class="summary-label">Certificates Issued</div>
                    </div>
                </div>
                
                <h2>Instructor Performance</h2>
                <table>
                    <tr><th>Instructor</th><th>Courses</th><th>Students</th><th>Rating</th><th>Revenue</th></tr>
                    ${instructorStats.map(inst => `
                        <tr><td>${inst.name}</td><td>${inst.courses}</td><td>${inst.students.toLocaleString()}</td><td>${inst.rating}</td><td>${inst.revenue}</td></tr>
                    `).join('')}
                </table>
                
                <h2>Top Performing Courses</h2>
                <table>
                    <tr><th>Course Title</th><th>Students</th><th>Rating</th><th>Revenue</th></tr>
                    ${topCourses.map(c => `
                        <tr><td>${c.title}</td><td>${c.students.toLocaleString()}</td><td>${c.rating}</td><td>${c.revenue}</td></tr>
                    `).join('')}
                </table>
                
                <h2>Course Distribution</h2>
                <table>
                    <tr><th>Type</th><th>Count</th></tr>
                    <tr><td>Free Courses</td><td>${freeCourses}</td></tr>
                    <tr><td>Premium Courses</td><td>${paidCourses}</td></tr>
                    <tr><td>Approved Reviews</td><td>${approvedReviews}</td></tr>
                    <tr><td>Pending Reviews</td><td>${pendingReviews}</td></tr>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        setShowDownloadMenu(false);
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Analytics Dashboard</h1>
                        <p>Insights on instructors, courses, and customers</p>
                    </div>
                    <div className="download-dropdown">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                        >
                            <Download size={18} />
                            Download Report
                        </button>
                        {showDownloadMenu && (
                            <div className="dropdown-menu">
                                <button onClick={handleDownloadCSV}>
                                    <Download size={16} />
                                    Download CSV
                                </button>
                                <button onClick={handleDownloadPDF}>
                                    <Download size={16} />
                                    Download PDF
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Period Selector */}
                <div className="period-selector">
                    <div className="period-tabs">
                        <button
                            className={`period-tab ${periodType === 'preset' ? 'active' : ''}`}
                            onClick={() => setPeriodType('preset')}
                        >
                            Quick Select
                        </button>
                        <button
                            className={`period-tab ${periodType === 'custom' ? 'active' : ''}`}
                            onClick={() => setPeriodType('custom')}
                        >
                            <Calendar size={14} />
                            Custom Range
                        </button>
                    </div>

                    {periodType === 'preset' ? (
                        <div className="preset-options">
                            {['week', 'month', 'quarter', 'year'].map(p => (
                                <button
                                    key={p}
                                    className={`preset-btn ${presetPeriod === p ? 'active' : ''}`}
                                    onClick={() => setPresetPeriod(p)}
                                >
                                    {p === 'week' ? 'This Week' :
                                        p === 'month' ? 'This Month' :
                                            p === 'quarter' ? 'This Quarter' : 'This Year'}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="date-range">
                            <div className="date-input-group">
                                <label>From</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <span className="date-separator">—</span>
                            <div className="date-input-group">
                                <label>To</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-outline btn-sm">Apply</button>
                        </div>
                    )}
                </div>

                {/* Overview Stats */}
                <div className="stats-grid">
                    <div className="stat-card primary">
                        <div className="stat-header">
                            <div className="stat-icon"><Users size={24} /></div>
                            <span className="stat-change positive">+12%</span>
                        </div>
                        <p className="stat-value">{stats.totalStudents.toLocaleString()}</p>
                        <p className="stat-label">Total Customers</p>
                    </div>
                    <div className="stat-card secondary">
                        <div className="stat-header">
                            <div className="stat-icon"><BookOpen size={24} /></div>
                            <span className="stat-change positive">+8%</span>
                        </div>
                        <p className="stat-value">{courses.length}</p>
                        <p className="stat-label">Active Courses</p>
                    </div>
                    <div className="stat-card warning">
                        <div className="stat-header">
                            <div className="stat-icon"><Star size={24} /></div>
                        </div>
                        <p className="stat-value">{avgRating}</p>
                        <p className="stat-label">Avg. Rating</p>
                    </div>
                    <div className="stat-card success">
                        <div className="stat-header">
                            <div className="stat-icon"><Award size={24} /></div>
                            <span className="stat-change positive">+15%</span>
                        </div>
                        <p className="stat-value">{stats.totalCertificates.toLocaleString()}</p>
                        <p className="stat-label">Certificates Issued</p>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Instructor Performance */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Instructor Performance</h2>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Instructor</th>
                                        <th>Courses</th>
                                        <th>Students</th>
                                        <th>Rating</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {instructorStats.map((inst, idx) => (
                                        <tr key={idx}>
                                            <td><span className="font-medium">{inst.name}</span></td>
                                            <td>{inst.courses}</td>
                                            <td>{inst.students.toLocaleString()}</td>
                                            <td>
                                                <div className="rating">
                                                    <Star size={14} fill="#eab308" color="#eab308" />
                                                    <span>{inst.rating}</span>
                                                </div>
                                            </td>
                                            <td style={{ color: 'var(--success)' }}>{inst.revenue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Customer Activity */}
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Customer Activity</h2>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Period</th>
                                        <th>New Users</th>
                                        <th>Enrollments</th>
                                        <th>Completions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerActivity.map((act, idx) => (
                                        <tr key={idx}>
                                            <td><span className="font-medium">{act.period}</span></td>
                                            <td>{act.newUsers}</td>
                                            <td>{act.enrollments}</td>
                                            <td>{act.completions}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Course Performance */}
                <section className="content-section">
                    <div className="section-header">
                        <h2>Top Performing Courses</h2>
                    </div>
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Course Title</th>
                                    <th>Students Enrolled</th>
                                    <th>Rating</th>
                                    <th>Est. Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topCourses.map((course, idx) => (
                                    <tr key={idx}>
                                        <td><span className="font-medium">{course.title}</span></td>
                                        <td>{course.students.toLocaleString()}</td>
                                        <td>
                                            <div className="rating">
                                                <Star size={14} fill="#eab308" color="#eab308" />
                                                <span>{course.rating}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: course.revenue === 'Free' ? 'var(--text-muted)' : 'var(--success)' }}>
                                            {course.revenue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Quick Stats Grid */}
                <div className="grid-layout four-columns" style={{ marginTop: '2rem' }}>
                    <div className="card p-4 text-center" style={{ background: 'var(--bg-card)' }}>
                        <PieChart size={24} style={{ margin: '0 auto 0.5rem', color: 'var(--primary-500)' }} />
                        <p className="stat-value" style={{ fontSize: '1.5rem' }}>{freeCourses}</p>
                        <p className="stat-label">Free Courses</p>
                    </div>
                    <div className="card p-4 text-center" style={{ background: 'var(--bg-card)' }}>
                        <PieChart size={24} style={{ margin: '0 auto 0.5rem', color: 'var(--warning)' }} />
                        <p className="stat-value" style={{ fontSize: '1.5rem' }}>{paidCourses}</p>
                        <p className="stat-label">Premium Courses</p>
                    </div>
                    <div className="card p-4 text-center" style={{ background: 'var(--bg-card)' }}>
                        <Star size={24} style={{ margin: '0 auto 0.5rem', color: 'var(--success)' }} />
                        <p className="stat-value" style={{ fontSize: '1.5rem' }}>{approvedReviews}</p>
                        <p className="stat-label">Approved Reviews</p>
                    </div>
                    <div className="card p-4 text-center" style={{ background: 'var(--bg-card)' }}>
                        <Star size={24} style={{ margin: '0 auto 0.5rem', color: 'var(--error)' }} />
                        <p className="stat-value" style={{ fontSize: '1.5rem' }}>{pendingReviews}</p>
                        <p className="stat-label">Pending Reviews</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminAnalytics;
