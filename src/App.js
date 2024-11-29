import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './Routes';
import { DefaultLayout, Blank, AdminDefault } from './Layouts/';
import Account from './Pages/Owners/Account';
import axios from './api/axios';


function App() {
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/login/check-status/', config);
        const { status } = response.data;

        console.log(status);

        if (status) {
          setIsLogged(status);
        } else {
          console.log('no logged in yet');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [])
  return (
    <Router>
      <div className="App blankPage">
        {isLogged ? (
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
        ) : (
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = Blank;
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
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
