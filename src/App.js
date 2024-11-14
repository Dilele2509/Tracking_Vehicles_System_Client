import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, ownerRoutes, privateRoutes } from './Routes';
import { DefaultLayout, Blank, AdminDefault } from './Layouts/';
// import {HomePageAdmin} from './Pages/Admin/HomePageAdmin';
import Account from './Pages/Owners/Account';

function App() {
  return (
    <Router>
      <div className="App blankPage">
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = AdminDefault;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {/* Thêm dấu * để cho phép các route con */}
          <Route path="/account/*" element={
            <DefaultLayout>
              <Account />
            </DefaultLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
