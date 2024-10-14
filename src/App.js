import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, ownerRoutes, ownerAccountRoutes } from './Routes';
import { DefaultLayout } from './Layouts/';
import Account from './Pages/Owners/Account';

function App() {
  return (
    <Router>
      <div className="App blankPage">
        <Routes>
          {ownerRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
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
          {/* Thêm route cho Account */}
          <Route path="/account/*" element={<DefaultLayout><Account /></DefaultLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
