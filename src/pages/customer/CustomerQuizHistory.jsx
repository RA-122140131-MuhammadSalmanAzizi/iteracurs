import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';

const CustomerQuizHistory = () => {
    return (
        <div className="admin-page">
            <CustomerSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Quiz History</h1>
                        <p>View your past quiz results</p>
                    </div>
                </header>
                <div className="content-section">
                    <p>No quiz history available.</p>
                </div>
            </main>
        </div>
    );
};

export default CustomerQuizHistory;
