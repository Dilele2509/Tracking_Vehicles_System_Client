//import layouts
import { DefaultLayout, Blank } from "../Layouts";

//import pages
import Authentication from "../Pages/Authentication";
import HomePage from "../Pages/Owners/HomePage";
import Vehicles from "../Pages/Owners/Vehicles";
import Devices from "../Pages/Owners/Devices";
import Blog from "../Pages/Owners/Blog";
import Contact from "../Pages/Owners/Contact";

const publicRoutes = [
    {path: '/', component: Authentication, layout: Blank}
]

const ownerRoutes = [
    {path: '/', component: HomePage, layout: DefaultLayout},
    {path: '/vehicles', component: Vehicles, layout: DefaultLayout},
    {path: '/devices', component: Devices, layout: DefaultLayout},
    {path: '/blog', component: Blog, layout: DefaultLayout},
    {path: '/contact', component: Contact, layout: DefaultLayout},
]

const driverRoutes = [
    {path: '/', component: HomePage, layout: DefaultLayout}
]

export {publicRoutes, ownerRoutes, driverRoutes} 