import { createFactory } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import Image from '../components/Image';
import Missing from '../components/Missing';
import Unauthorized from '../components/Unauthorized';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/unauthorized', component: Unauthorized },
    { path: '/*', component: Missing },
];

const privateRoutes = [
    { path: '/main', component: Home },
    { path: '/create', component: CreateForm },
    { path: '/image/:webId', component: Image },
    { path: '/update/:webId', component: UpdateForm },
];

export { publicRoutes, privateRoutes };
