import { useLocation } from 'react-router-dom';
import { Footer, DefaultNavbar } from '../../Components';
import './Default.css';

function DefaultLayout({ children }) {
    const location = useLocation();

    const images = [
        {
            route: '/',
            image: 'main-banner.png',
            haveContent: true
        },
        {
            route: '/vehicles',
            image: 'list-banner.png',
            haveContent: false
        },
        {
            route: '/devices',
            image: 'device-banner.png',
            haveContent: false
        },
        {
            route: '/blog',
            image: 'blog-banner.png',
            haveContent: false
        },
        {
            route: '/contact',
            image: 'contact-banner.png',
            haveContent: false
        },
    ];

    // Find the current route's image and content properties
    const currentRouteData = images.find(img => img.route === location.pathname) || { image: 'default-banner.png', haveContent: false };

    return (
        <div style={{ display: 'block' }}>
            <DefaultNavbar haveContent={currentRouteData.haveContent} image={currentRouteData.image} />
            <div className="body-container">
                <div className="content">{children}</div>
            </div>

            <Footer />
        </div>
    );
}

export default DefaultLayout;
