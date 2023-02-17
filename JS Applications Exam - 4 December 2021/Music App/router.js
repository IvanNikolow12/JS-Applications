const routes = {
    'home': 'home-template',
    'login': 'login-template',
    'register': 'register-template',
    'create': 'create-template',
    'catalog': 'catalog-template',
    'details': 'details-template',
    'search': 'search-template'
}

const router = async (fullpath) => {
    let [path, id, param] = fullpath.split('/');
    let app = document.getElementById('app');
    let templateData = authService.getData()
    let templateId = routes[path];
    switch(path) {
        case 'catalog':
            templateData.albums = await musicService.getAll()
            break;
            case 'details':
                let albumDetails = await musicService.getOne(id);
                Object.assign(templateData, albumDetails, {id});
                
                if(param == 'edit') {
                    templateId = 'edit-template'
                }
                break;
        case 'logout':
            authService.logout()
            return navigate('login')
            default:
                break;
    }

    let template = Handlebars.compile(document.getElementById(templateId).innerHTML);

    app.innerHTML = template(templateData)
}

const navigate = (path) => {
    history.pushState({}, '', '/' + path);
    router(path)
}