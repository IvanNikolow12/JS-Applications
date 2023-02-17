import { html, render } from "../node_modules/lit-html/lit-html.js";

import layout from '../viewss/layout.js'
import home from '../viewss/home.js'
import login from '../viewss/login.js'
import register from '../viewss/register.js'
import details from '../viewss/details.js'
import editGame from '../viewss/editGame.js'
import createGame from '../viewss/createGame.js'
import catalog from '../viewss/catalog.js'
import notFound from '../viewss/not-found.js'

import authService from "../services/authService.js";
import gameService from "../services/gameService.js";

import { onLoginSubmit, onRegisterSubmit, onCreateSubmit, onEditSubmit } from "./eventListeners.js";



const routes = [
    {
        path: '/',
        template: (props) => {
            let execute = home;
            let url = '/';
            if(!props.isAutheticated) {
                execute = login;
                url = '/login';
            }
            history.pushState({},'', url)
            return execute(props)
        },
        getData: gameService.getAll
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
        path: '/logout',
        template: (props) => {
            history.pushState({}, '', '/')
            authService.logout()
            router('/login');
            return login(props)
        }
    },
    {
        path: '/catalog',
        template: catalog,
        getData: gameService.getAll
        
    },
    {
        path: '/create',
        template: createGame,
        context: {
            onCreateSubmit
        }
    },
    {
        path: '/details/(?<id>\.+)',
        template: (props) => {
            let execute = details;
            return execute(props)
        },
        getData: gameService.getOne
    },
    {
        path: '/edit/(?<id>\.+)', 
        template: (props) => {
            let execute = editGame;
            return execute(props)
        },
        getData: gameService.getOne
    },
    {
        path: '/not-found',
        template: notFound
    }
]

const router = (path) => {
    history.pushState({}, '', path)
    

    let route = routes.find(x => new RegExp(`^${x.path}$`, 'i').test(path)) || routes.find(x => x.template == notFound);

    let context = route.context;

    let params = new RegExp(`^${route.path}$`, 'i').exec(path).groups;

    let userData = authService.getData()
    

    if(route.getData) {
        route.getData(params).then(data => {
            let gameData = data
            render(layout(route.template, { navigationHandler, onLoginSubmit, onEditSubmit, ...userData, ...context, data, params, gameData }), document.getElementById('box'));

        })
    } else {
        render(layout(route.template, {navigationHandler, onLoginSubmit, ...userData, ...context, params }), document.getElementById('box'));
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