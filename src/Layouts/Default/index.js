import {Footer, DefaultNavbar } from '../../Components';
import { ownerRoutes } from '../../Routes';
import './Default.css'

function DefaultLayout({ children }) {
    return (
        <div style={{ display: "block" }}>
            <DefaultNavbar/>
            <div className="body-container">
                <div className="content">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;