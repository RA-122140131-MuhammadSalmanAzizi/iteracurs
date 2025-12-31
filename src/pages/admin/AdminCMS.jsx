import { useState } from 'react';
import {
    Layout, Type, Image, List, Save, Plus, Trash2, Edit, Star, Users, Quote
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import './AdminPages.css';

const AdminCMS = () => {
    const [activeTab, setActiveTab] = useState('hero');

    // Hero Section
    const [heroContent, setHeroContent] = useState({
        title: 'Unlock Your Potential with World-Class Courses',
        highlight: 'World-Class Courses',
        subtitle: 'Join millions of learners and gain in-demand skills with our expert-led courses. Start learning today with free and premium courses designed for your success.',
        ctaPrimary: 'Explore Courses',
        ctaSecondary: 'Start Free Trial'
    });

    // Stats Section (Hero stats)
    const [statsContent, setStatsContent] = useState({
        studentsLabel: 'Students',
        coursesLabel: 'Courses',
        certificatesLabel: 'Certificates'
    });

    // Categories Section
    const [categoriesSection, setCategoriesSection] = useState({
        title: 'Explore Categories',
        subtitle: 'Find the perfect course in your favorite category'
    });

    // Popular Courses Section
    const [coursesSection, setCoursesSection] = useState({
        badge: 'Trending Now',
        title: 'Popular Courses',
        subtitle: 'Discover our most popular courses loved by thousands'
    });

    // Testimonials Section
    const [testimonialsSection, setTestimonialsSection] = useState({
        title: 'Ulasan Pelanggan yang Puas',
        subtitle: 'Apa kata mereka tentang platform kami'
    });

    const [testimonials, setTestimonials] = useState([
        { id: 1, text: 'Materi yang dibahas sangat relevan dengan kebutuhan saat ini.', rating: 5 },
        { id: 2, text: 'Platform pembelajaran yang luar biasa!', rating: 5 },
        { id: 3, text: 'Kursus yang sangat komprehensif dan mudah dipahami.', rating: 5 },
        { id: 4, text: 'Performa yang baik dari semua pembicara.', rating: 5 },
        { id: 5, text: 'Materi relevan dengan perkembangan teknologi terkini.', rating: 5 },
    ]);

    // Registration Steps Section
    const [registerSection, setRegisterSection] = useState({
        title: 'Cara Mendaftar',
        subtitle: 'Mulai belajar dalam 4 langkah mudah'
    });

    const [registerSteps, setRegisterSteps] = useState([
        { id: 1, title: 'Buat Akun', desc: 'Daftar dengan email atau akun sosial media' },
        { id: 2, title: 'Pilih Kursus', desc: 'Temukan kursus yang sesuai kebutuhanmu' },
        { id: 3, title: 'Pembayaran', desc: 'Bayar jika diperlukan untuk kursus premium' },
        { id: 4, title: 'Mulai Belajar', desc: 'Akses materi kapan saja, di mana saja' },
    ]);

    // Why Choose Us Section
    const [whySection, setWhySection] = useState({
        title: 'Why Choose ITERA Course?',
        subtitle: 'We provide the best learning experience for our students'
    });

    const [whyUsItems, setWhyUsItems] = useState([
        { id: 1, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of real-world experience.' },
        { id: 2, title: 'Verified Certificates', desc: 'Earn certificates that are recognized by top companies worldwide.' },
        { id: 3, title: 'Lifetime Access', desc: 'Get unlimited access to course content and future updates.' },
        { id: 4, title: 'Community Support', desc: 'Join a thriving community of learners and get help when you need it.' },
    ]);

    // Top Instructors Section
    const [instructorsSection, setInstructorsSection] = useState({
        title: 'Meet Our Top Instructors'
    });

    const [topInstructors, setTopInstructors] = useState([
        { id: 1, name: 'Dr. Ans Lecturer', title: 'Web Development Expert', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        { id: 2, name: 'Prof. Habs Webdev', title: 'Data Science Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
        { id: 3, name: 'Mrs. W Design', title: 'UI/UX Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
        { id: 4, name: 'Dr. Alex AI', title: 'Machine Learning Expert', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
        { id: 5, name: 'James Backend', title: 'Backend Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
    ]);

    const tabs = [
        { id: 'hero', label: 'Hero', icon: <Layout size={18} /> },
        { id: 'categories', label: 'Categories', icon: <List size={18} /> },
        { id: 'courses', label: 'Courses', icon: <List size={18} /> },
        { id: 'testimonials', label: 'Testimonials', icon: <Quote size={18} /> },
        { id: 'register', label: 'Register Steps', icon: <Users size={18} /> },
        { id: 'why', label: 'Why Us', icon: <Star size={18} /> },
        { id: 'instructors', label: 'Instructors', icon: <Users size={18} /> },
    ];

    const handleSave = () => {
        alert('Homepage content saved!');
    };

    const handleDeleteTestimonial = (id) => {
        setTestimonials(testimonials.filter(t => t.id !== id));
    };

    const handleAddTestimonial = () => {
        const text = prompt('Enter testimonial text:');
        if (text) {
            setTestimonials([...testimonials, { id: Date.now(), text, rating: 5 }]);
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>HomePage CMS</h1>
                        <p>Manage all homepage sections and content</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} />
                        Save All Changes
                    </button>
                </header>

                <div className="admin-tabs" style={{ flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="content-section">
                    {/* HERO SECTION */}
                    {activeTab === 'hero' && (
                        <div className="form-layout">
                            <div className="section-header"><h2>Hero Section</h2></div>
                            <div className="form-group">
                                <label>Headline Title</label>
                                <textarea className="input" rows={2} value={heroContent.title}
                                    onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Highlight Text (colored part)</label>
                                <input type="text" className="input" value={heroContent.highlight}
                                    onChange={(e) => setHeroContent({ ...heroContent, highlight: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="input" rows={3} value={heroContent.subtitle}
                                    onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })} />
                            </div>
                            <div className="grid-layout two-columns">
                                <div className="form-group">
                                    <label>Primary Button</label>
                                    <input type="text" className="input" value={heroContent.ctaPrimary}
                                        onChange={(e) => setHeroContent({ ...heroContent, ctaPrimary: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Secondary Button</label>
                                    <input type="text" className="input" value={heroContent.ctaSecondary}
                                        onChange={(e) => setHeroContent({ ...heroContent, ctaSecondary: e.target.value })} />
                                </div>
                            </div>
                            <hr style={{ margin: '2rem 0', borderColor: 'var(--border-color)' }} />
                            <h3>Stats Labels</h3>
                            <div className="grid-layout three-columns">
                                <div className="form-group">
                                    <label>Students Label</label>
                                    <input type="text" className="input" value={statsContent.studentsLabel}
                                        onChange={(e) => setStatsContent({ ...statsContent, studentsLabel: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Courses Label</label>
                                    <input type="text" className="input" value={statsContent.coursesLabel}
                                        onChange={(e) => setStatsContent({ ...statsContent, coursesLabel: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Certificates Label</label>
                                    <input type="text" className="input" value={statsContent.certificatesLabel}
                                        onChange={(e) => setStatsContent({ ...statsContent, certificatesLabel: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CATEGORIES SECTION */}
                    {activeTab === 'categories' && (
                        <div className="form-layout">
                            <div className="section-header"><h2>Categories Section</h2></div>
                            <div className="form-group">
                                <label>Section Title</label>
                                <input type="text" className="input" value={categoriesSection.title}
                                    onChange={(e) => setCategoriesSection({ ...categoriesSection, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Section Subtitle</label>
                                <input type="text" className="input" value={categoriesSection.subtitle}
                                    onChange={(e) => setCategoriesSection({ ...categoriesSection, subtitle: e.target.value })} />
                            </div>
                            <p className="helper-text">Categories are managed in Course Settings.</p>
                        </div>
                    )}

                    {/* COURSES SECTION */}
                    {activeTab === 'courses' && (
                        <div className="form-layout">
                            <div className="section-header"><h2>Popular Courses Section</h2></div>
                            <div className="form-group">
                                <label>Badge Text</label>
                                <input type="text" className="input" value={coursesSection.badge}
                                    onChange={(e) => setCoursesSection({ ...coursesSection, badge: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Section Title</label>
                                <input type="text" className="input" value={coursesSection.title}
                                    onChange={(e) => setCoursesSection({ ...coursesSection, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Section Subtitle</label>
                                <input type="text" className="input" value={coursesSection.subtitle}
                                    onChange={(e) => setCoursesSection({ ...coursesSection, subtitle: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* TESTIMONIALS SECTION */}
                    {activeTab === 'testimonials' && (
                        <div>
                            <div className="section-header">
                                <h2>Testimonials Section</h2>
                                <button className="btn btn-outline btn-sm" onClick={handleAddTestimonial}>
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                            <div className="grid-layout two-columns mb-4">
                                <div className="form-group">
                                    <label>Section Title</label>
                                    <input type="text" className="input" value={testimonialsSection.title}
                                        onChange={(e) => setTestimonialsSection({ ...testimonialsSection, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Section Subtitle</label>
                                    <input type="text" className="input" value={testimonialsSection.subtitle}
                                        onChange={(e) => setTestimonialsSection({ ...testimonialsSection, subtitle: e.target.value })} />
                                </div>
                            </div>
                            <h3>Items</h3>
                            <div className="faqs-list">
                                {testimonials.map((t, i) => (
                                    <div key={t.id} className="faq-item">
                                        <div className="faq-content">
                                            <textarea className="input" rows={2} value={t.text}
                                                onChange={(e) => {
                                                    const newItems = [...testimonials];
                                                    newItems[i].text = e.target.value;
                                                    setTestimonials(newItems);
                                                }} />
                                        </div>
                                        <button className="btn-icon" onClick={() => handleDeleteTestimonial(t.id)}><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* REGISTER STEPS SECTION */}
                    {activeTab === 'register' && (
                        <div>
                            <div className="section-header"><h2>Registration Steps</h2></div>
                            <div className="grid-layout two-columns mb-4">
                                <div className="form-group">
                                    <label>Section Title</label>
                                    <input type="text" className="input" value={registerSection.title}
                                        onChange={(e) => setRegisterSection({ ...registerSection, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Section Subtitle</label>
                                    <input type="text" className="input" value={registerSection.subtitle}
                                        onChange={(e) => setRegisterSection({ ...registerSection, subtitle: e.target.value })} />
                                </div>
                            </div>
                            <h3>4 Steps</h3>
                            <div className="grid-layout two-columns">
                                {registerSteps.map((step, idx) => (
                                    <div key={step.id} className="card p-4 border" style={{ background: 'var(--bg-card)' }}>
                                        <div className="form-group">
                                            <label>Step {idx + 1} Title</label>
                                            <input type="text" className="input" value={step.title}
                                                onChange={(e) => {
                                                    const newSteps = [...registerSteps];
                                                    newSteps[idx].title = e.target.value;
                                                    setRegisterSteps(newSteps);
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input type="text" className="input" value={step.desc}
                                                onChange={(e) => {
                                                    const newSteps = [...registerSteps];
                                                    newSteps[idx].desc = e.target.value;
                                                    setRegisterSteps(newSteps);
                                                }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* WHY US SECTION */}
                    {activeTab === 'why' && (
                        <div>
                            <div className="section-header"><h2>Why Choose Us</h2></div>
                            <div className="grid-layout two-columns mb-4">
                                <div className="form-group">
                                    <label>Section Title</label>
                                    <input type="text" className="input" value={whySection.title}
                                        onChange={(e) => setWhySection({ ...whySection, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Section Subtitle</label>
                                    <input type="text" className="input" value={whySection.subtitle}
                                        onChange={(e) => setWhySection({ ...whySection, subtitle: e.target.value })} />
                                </div>
                            </div>
                            <h3>4 Features</h3>
                            <div className="grid-layout two-columns">
                                {whyUsItems.map((item, idx) => (
                                    <div key={item.id} className="card p-4 border" style={{ background: 'var(--bg-card)' }}>
                                        <div className="form-group">
                                            <label>Feature {idx + 1} Title</label>
                                            <input type="text" className="input" value={item.title}
                                                onChange={(e) => {
                                                    const newItems = [...whyUsItems];
                                                    newItems[idx].title = e.target.value;
                                                    setWhyUsItems(newItems);
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="input" rows={2} value={item.desc}
                                                onChange={(e) => {
                                                    const newItems = [...whyUsItems];
                                                    newItems[idx].desc = e.target.value;
                                                    setWhyUsItems(newItems);
                                                }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* INSTRUCTORS SECTION */}
                    {activeTab === 'instructors' && (
                        <div>
                            <div className="section-header"><h2>Top Instructors</h2></div>
                            <div className="form-group mb-4">
                                <label>Section Title</label>
                                <input type="text" className="input" value={instructorsSection.title}
                                    onChange={(e) => setInstructorsSection({ ...instructorsSection, title: e.target.value })} />
                            </div>
                            <h3>Featured Instructors</h3>
                            <div className="grid-layout three-columns">
                                {topInstructors.map((inst, idx) => (
                                    <div key={inst.id} className="card p-4 border" style={{ background: 'var(--bg-card)' }}>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="input" value={inst.name}
                                                onChange={(e) => {
                                                    const newInst = [...topInstructors];
                                                    newInst[idx].name = e.target.value;
                                                    setTopInstructors(newInst);
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <label>Title/Role</label>
                                            <input type="text" className="input" value={inst.title}
                                                onChange={(e) => {
                                                    const newInst = [...topInstructors];
                                                    newInst[idx].title = e.target.value;
                                                    setTopInstructors(newInst);
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <label>Image URL</label>
                                            <input type="text" className="input" value={inst.image}
                                                placeholder="https://..."
                                                onChange={(e) => {
                                                    const newInst = [...topInstructors];
                                                    newInst[idx].image = e.target.value;
                                                    setTopInstructors(newInst);
                                                }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminCMS;
