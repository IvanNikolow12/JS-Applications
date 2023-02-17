import authService from "./services/authService.js";
import router from "./router.js";
import bookService from "./services/bookService.js";

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    authService.login(email, password)
        .then(data => {
            router('/')
        })
}

export const onRegisterSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let confirmPassword = formData.get('confirm-password');

    authService.register(email, password, confirmPassword)
        .then(data => {
            router('/login');
        })
}

export const onCreateSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let title = formData.get('title')
    let description = formData.get('description')
    let imageUrl = formData.get('imageUrl')
    let type = formData.get('type')

    bookService.create(title, description, imageUrl, type)
        .then(data => {
            router('/')
        })
}

export const onEditSubmit = (e, id) => {
    e.preventDefault()
    let formData = new FormData(e.target);

    let title = formData.get('title')
    let description = formData.get('description')
    let imageUrl = formData.get('imageUrl')
    let type = formData.get('type')

    bookService.edit(id, {title,description,imageUrl,type})
        .then(data => {
            router(`/details/${id}`)
        })
}

