import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useScrollTrigger, Slide } from '@mui/material';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';
import './DefaultNavbar.css';
import { Link, useLocation } from 'react-router-dom';

const logo_dark = '/assets/Logo/logo-dark.png';
const pages = [
    {
        id: 1,
        page_name: 'Vehicles List',
        route: '/vehicles'
    },
    {
        id: 2,
        page_name: 'Device Shop',
        route: '/devices'
    },
    {
        id: 3,
        page_name: 'Blog',
        route: '/blog'
    },
    {
        id: 4,
        page_name: 'Contact Us',
        route: '/contact'
    }

];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element,
    window: PropTypes.func,
};

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function DefaultNavbar(props) {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { haveContent, image } = props

    return (
        <div className="navbar-container">
            <HideOnScroll {...props}>
                <AppBar position="sticky" sx={{ backgroundColor: '#E9BD20', top: '1rem', width: { xs: '100%', md: '90%' }, zIndex: 999999, marginLeft: 'auto', marginRight: 'auto', borderRadius: { xs: '0', md: '.8rem' } }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Link to="/">
                                <img src={logo_dark} alt="logo" className="logo" />
                            </Link>

                            {/* Mobile Menu */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                                    <MenuIcon sx={{ color: '#3B3B3B' }} />
                                </IconButton>
                                <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                                    {pages.map((page) => (
                                        <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                            <Link to={page.route}>
                                                <Typography sx={{ textAlign: 'center', color: '#3B3B3B' }}>
                                                    {page.page_name}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            {/* Desktop Menu */}
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Link to={page.route} key={page.id}>
                                        <Button
                                            className={`btn-navbar ${location.pathname === page.route ? 'active' : ''}`}
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: '#3B3B3B', display: 'block' }}
                                        >
                                            {page.page_name}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>

                            {/* User Settings */}
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/assets/Images/chikawa.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>

            {/* Anchor for scrolling */}
            <div id="back-to-top-anchor" />

            <div
                className="banner"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Images/${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            </div>


            {haveContent ? <div className='banner-content'>
                <h2>Vehicle Tracking</h2>
                <h1>System</h1>
                <p>The system developed by HaLee Company helps users track their personal vehicles during rental, borrowing, as well as tracking location and other modern services.</p>
            </div> : null}

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div>
    );
}

export default DefaultNavbar;
