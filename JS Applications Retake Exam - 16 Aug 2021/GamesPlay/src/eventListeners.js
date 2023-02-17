import authService from "../services/authService.js";
import router from "./router.js";
import gameService from "../services/gameService.js";


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

    let title = formData.get('title');
    let category = formData.get('category');
    let maxLevel = formData.get('maxLevel');
    let imageUrl = formData.get('imageUrl');
    let summary = formData.get('summary');

    gameService.create(title, category, maxLevel, imageUrl, summary)
        .then(data => {
            router('/')
        })
}

export const onEditSubmit = (e, id) => {
    e.preventDefault();

    // console.log(params)
    let formData = new FormData(e.target);

    let title = formData.get('title');
    let category = formData.get('category');
    let maxLevel = formData.get('maxLevel');
    let imageUrl = formData.get('imageUrl');
    let summary = formData.get('summary');

    gameService.edit(id, {title, category, maxLevel, imageUrl, summary})
        .then(data => {
            router(`/details/${id}`)
        })
}

export const onDeleteSubmit = (e, id) => {
    e.preventDefault();

    let gameId = id;
    gameService.deleteGame(gameId)
        .then(res => {
            router('/')
        })
}