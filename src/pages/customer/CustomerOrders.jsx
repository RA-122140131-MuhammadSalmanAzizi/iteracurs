import CustomerSidebar from '../../components/CustomerSidebar';
import '../admin/AdminPages.css';

const CustomerOrders = () => {
    return (
        <div className="admin-page">
            <CustomerSidebar />
            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Order History</h1>
                        <p>View your purchase history</p>
                    </div>
                </header>
                <div className="content-section">
                    <p>No orders found.</p>
                </div>
            </main>
        </div>
    );
};

export default CustomerOrders;
