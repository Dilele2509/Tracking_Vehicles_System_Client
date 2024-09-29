import Header from '../../Components/Header';
import Footer from "../../Components/Footer";

function DefaultLayout({children}) {
    return ( 
        <div style={{ display: "block" }}>
            <Header/>
            <div className="body-container">
                <div className="content">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
     );
}

export default DefaultLayout;