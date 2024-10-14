//import layouts
import { DefaultLayout, Blank } from "../Layouts";

//import pages
//Owner website
import Authentication from "../Pages/Authentication";
import HomePage from "../Pages/Owners/HomePage";
import Vehicles from "../Pages/Owners/Vehicles";
import Devices from "../Pages/Owners/Devices";
import Blog from "../Pages/Owners/Blog";
import Contact from "../Pages/Owners/Contact";
import Profile from "../Pages/Owners/Profile";
import Account from "../Pages/Owners/Account";
import Information from "../Pages/Owners/Account/Information";
import Password from "../Pages/Owners/Account/Password";

//Owner mobile



const publicRoutes = [
    {path: '/', component: Authentication, layout: Blank}
]

const ownerRoutes = [
    {path: '/', component: HomePage, layout: DefaultLayout},
    {path: '/vehicles', component: Vehicles, layout: DefaultLayout},
    {path: '/devices', component: Devices, layout: DefaultLayout},
    {path: '/blog', component: Blog, layout: DefaultLayout},
    {path: '/contact', component: Contact, layout: DefaultLayout},
    {path: '/profile', component: Profile, layout: DefaultLayout},
    {path: '/account', component: Account, layout: DefaultLayout},
]

const ownerAccountRoutes = [
    { path: 'information', component: Information, layout: DefaultLayout },
    { path: 'password', component: Password, layout: DefaultLayout },
];

const driverRoutes = [
    {path: '/', component: HomePage, layout: DefaultLayout}
]

export {publicRoutes, ownerRoutes, ownerAccountRoutes, driverRoutes} 