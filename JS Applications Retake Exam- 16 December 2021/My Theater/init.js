function addEventListeners() {
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    let theaterCardTemplate = Handlebars.compile(document.getElementById('theater-card-template').innerHTML);
    
    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('theater-card', theaterCardTemplate);

    navigate(location.pathname == '/' ? 'home' : location.pathname.slice(1));

}

function navigationHandler(e) {
    e.preventDefault();

    if(e.target.tagName != 'A') {
        return;
    }

    let url = new URL(e.target.href);

    navigate(url.pathname.slice(1));
}

function onLoginSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    authService.login(email, password)
        .then(data => {
            navigate('home')
        })
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target)

    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword')

    authService.register(email, password, repeatPassword)
        .then(data => {
            navigate('login');
        })
}

function onAddTheaterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let title = formData.get('title')
    let date = formData.get('date')
    let author = formData.get('author')
    let description = formData.get('description')
    let imageUrl = formData.get('imageUrl')

    theaterSevrice.addTheater(title, date, author, description, imageUrl)
        .then(data => {
            navigate('home')
        })
}

function onEditTheaterSubmit(e, id) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let title = formData.get('title')
    let date = formData.get('date')
    let author = formData.get('author')
    let description = formData.get('description')
    let imageUrl = formData.get('imageUrl')

    theaterSevrice.editTheater(id, {title, date, author, description, imageUrl})
        .then(data => {
            navigate(`details/${id}`)
        })
}

function deleteTheater(e) {
    e.preventDefault();
    let id = e.target.dataset.id;

    theaterSevrice.deleteTheater(id)
        .then(res => {
            navigate('home');
        })
}

function likeTheater(e) {
    e.preventDefault()
    let id = e.target.dataset.id;
    let likes = 0;
    likes++;
}

addEventListeners()