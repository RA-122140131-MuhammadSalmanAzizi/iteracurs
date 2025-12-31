import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';

const CustomerReviews = () => {
    return (
        <div className="admin-page">
            <CustomerSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>My Reviews</h1>
                        <p>Manage reviews you have posted</p>
                    </div>
                </header>
                <div className="content-section">
                    <p>You haven't posted any reviews yet.</p>
                </div>
            </main>
        </div>
    );
};

export default CustomerReviews;
