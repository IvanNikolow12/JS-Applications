function addEventListeners() {
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    let albumTemplate = Handlebars.compile(document.getElementById('album-card').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('album-card', albumTemplate);

    navigate(location.pathname == '/' ? 'home' : location.pathname.slice(1))
}

addEventListeners()

function navigationHandler(e) {
    e.preventDefault();
    if(e.target.tagName !== 'A') {
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
            navigate('home');
        })
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeat-password')

    authService.register(email, password, repeatPassword)
        .then(data => {
            navigate('login');
        })
}

function onAddAlbumSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let name = formData.get('name');
    let imgUrl = formData.get('imgUrl');
    let price = formData.get('price');
    let releaseDate = formData.get('releaseDate');
    let artist = formData.get('artist');
    let genre = formData.get('genre');
    let description = formData.get('description');

    musicService.addAlbum(name, imgUrl, price, releaseDate, artist, genre, description)
        .then(data => {
            navigate('catalog')
        })
}

function onEditAlbumSubmit(e, id) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let name = formData.get('name');
    let imgUrl = formData.get('imgUrl');
    let price = formData.get('price');
    let releaseDate = formData.get('releaseDate');
    let artist = formData.get('artist');
    let genre = formData.get('genre');
    let description = formData.get('description');

    musicService.editAlbum(id, {name, imgUrl, price, releaseDate, artist, genre, description})
        .then(data => {
            navigate(`details/${id}`)
        })
}

function deleteAlbum(e) {
    e.preventDefault();

    let id = e.target.dataset.id

    musicService.deleteAlbum(id)
        .then(res => {
            navigate('home')
        })
}