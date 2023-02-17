import { html, render } from "./node_modules/lit-html/lit-html.js";


import layout from "./views/layout.js";
import home from "./views/home.js";
import login from "./views/login.js"
import register from "./views/register.js";
import details from "./views/details.js"
import create from "./views/create.js";
import edit from "./views/edit.js";
import notFound from "./views/not-found.js";

import authService from "./services/authService.js";
import { onLoginSubmit, onRegisterSubmit, onCreateSubmit, onEditSubmit } from "./eventListeners.js";
import bookService from "./services/bookService.js";


const routes = [
    {
        path: '/',
        template: (props) => {
            let execute = home;
            let url = '/'
            if (!props.isAutheticated) {
                execute = login;
                url = '/login'
            }
            history.pushState({}, '', url);
            return execute(props);
        },
        getData: bookService.getAll
    },
    {
        path: '/login',
        template: login,
        context: {
            onLoginSubmit
        }
    },
    {
        path: '/register',
        template: register,
        context: {
            onRegisterSubmit
        }
    },
    {
        path: '/details/(?<id>\.+)',
        template: (props) => {
            let execute = details
            return execute(props)
        },
        getData: bookService.getOne
    },
    {
        path: '/create',
        template: create,
        context: {
            onCreateSubmit
        }
    },
    {
        path: '/edit/(?<id>\.+)', // to do
        template: (props) => {
            let execute = edit
            return execute(props)
        },
        getData: bookService.getOne,
        
    },
    {
        path: '/logout',
        template: (props) => {
            authService.logout();
            history.pushState({}, '', '/');
            return login(props)
        }
    },
    {
        path: '/not-found',
        template: notFound
    }
]

const router = (path) => {
    history.pushState({}, '', path);

    let route = routes.find(x => new RegExp(`^${x.path}$`, 'i').test(path)) || routes.find(x => x.template == notFound);

    let context = route.context;

    let params = new RegExp(`^${route.path}$`, 'i').exec(path).groups;

    let userData =  authService.getData();

    if(route.getData) {
        route.getData(params).then(data => {
            render(layout(route.template, {navigationHandler, onLoginSubmit, onEditSubmit, ...context, ...userData, data, params }), document.getElementById('container'))
        })
    } else {
        render(layout(route.template, {navigationHandler, onLoginSubmit, ...context, ...userData}), document.getElementById('container'))
    }

}

function navigationHandler(e) {
    if(e.target.tagName == 'A') {
        e.preventDefault();
        let url = new URL(e.target.href);
        router(url.pathname)
    }
}

export default router