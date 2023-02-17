const routes = {
    'home': 'home-template',
    'profile': 'profile-template',
    'login': 'login-template',
    'register': 'register-template',
    'create': 'add-theater-template',
    'details': 'theater-details-template'
}

const router = async (fullpath) => {
    let [path, id, params] = fullpath.split('/');
    let app = document.getElementById('app');
    let templateData = authService.getData();
    let templateId = routes[path];
    switch(path) {
        case 'home':
            templateData.theaters = await theaterSevrice.getAll();
            break;
        case 'details':
            let theaterDetails = await theaterSevrice.getOne(id);
            Object.assign(templateData, theaterDetails, {id})

            if (params == 'edit') {
                templateId = 'edit-theater-template';
            }
            break;
        case 'logout':
            authService.logout();
            return navigate('login');
        default:
            break;
    }
    // console.log(templateId)
    let template = Handlebars.compile(document.getElementById(templateId).innerHTML);

    app.innerHTML = template(templateData)
}

const navigate = (path) => {
    history.pushState({}, '', '/' + path);
    router(path)
}