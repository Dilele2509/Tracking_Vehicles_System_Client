//import layouts
import { DefaultLayout, Blank } from "../Layouts";

//import pages
import Authentication from "../Pages/Authentication";
import HomePage from "../Pages/Owners/HomePage";

const publicRoutes = [
    {path: '/', component: Authentication, layout: Blank}
]

const ownerRoutes = [
    {path: '/', component: HomePage, layout: DefaultLayout}
]

const driverRoutes = [
    {path: '/', component: HomePage, layout: DefaultLayout}
]

export {publicRoutes, ownerRoutes, driverRoutes} 