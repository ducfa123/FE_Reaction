import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { Fragment } from 'react';
import Header from './components/Header';
import RequiredAuth from './components/RequiredAuth';
// import './App.scss'
const ROLES = {
    'User': 0,
    'Admin': 1,
};

function App() {
    return (
       
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Fragment>
                                        <Page />
                                    </Fragment>
                                }
                            ></Route>
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        // eslint-disable-next-line no-lone-blocks
                        {
                            const Page = route.component;
                            return (
                                <Route key={index} element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
                                    <Route
                                        path={route.path}
                                        element={
                                            <Fragment>
                                                <Page />
                                            </Fragment>
                                        }
                                    ></Route>
                                </Route>
                            );
                        }
                    })}
                </Routes>
            </div>
    );
}

export default App;
