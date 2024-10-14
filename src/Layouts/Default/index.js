import { useLocation } from 'react-router-dom';
import { Footer, DefaultNavbar } from '../../Components';
import './Default.css';

function DefaultLayout({ children }) {
    const location = useLocation();

    const images = [
        {
            route: '/',
            image: 'main-banner.png',
            noBanner: false,
            haveContent: true
        },
        {
            route: '/vehicles',
            image: 'list-banner.png',
            noBanner: false,
            haveContent: false
        },
        {
            route: '/devices',
            image: 'device-banner.png',
            noBanner: false,
            haveContent: false
        },
        {
            route: '/blog',
            image: 'blog-banner.png',
            noBanner: false,
            haveContent: false
        },
        {
            route: '/contact',
            image: 'contact-banner.png',
            noBanner: false,
            haveContent: false
        },
        {
            route: '/profile',
            image: null,
            noBanner: true,
            haveContent: false
        },
        {
            route: '/account',
            image: null,
            noBanner: true,
            haveContent: false
        },
        {
            route: '/account/information',
            image: null,
            noBanner: true,
            haveContent: false
        },
        {
            route: '/account/password',
            image: null,
            noBanner: true,
            haveContent: false
        },
    ];

    // Find the current route's image and content properties
    const currentRouteData = images.find(img => img.route === location.pathname) || { image: 'default-banner.png', haveContent: false };

    return (
        <div style={{ display: 'block' }}>
            <DefaultNavbar 
                haveContent={currentRouteData.haveContent} 
                image={currentRouteData.image} 
                noBanner={currentRouteData.noBanner}/>
            <div className="body-container">
                <div className="content">{children}</div>
            </div>

            <Footer />
        </div>
    );
}

export default DefaultLayout;
