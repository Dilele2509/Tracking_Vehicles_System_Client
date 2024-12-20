import { AdminSidebar, AdminHeader, AdminFooter } from "../../Components";
import './AdminDefault.css'

function AdminDefault({ children }) {
    return ( 
        <div style={{ display: "flex", width: '100%', height: '100%'}}>
            <AdminSidebar/>
            <div className="admin-container">
                <AdminHeader/>
                <div className="content">
                    {children}
                </div>
                <AdminFooter/>
            </div>
        </div >
     );
}

export default AdminDefault;
