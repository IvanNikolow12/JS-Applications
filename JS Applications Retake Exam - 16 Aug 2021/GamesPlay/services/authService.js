import request from "./request.js";

let apiKey = `AIzaSyDw4xWbC11MjR8DNzV5RUi8lnBexxQ9_4k`

let endpoints = {
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
}

export default {
    async login(email, password) {
        let data = await request.post(endpoints.login, 
            {
                email,
                password
            });

            localStorage.setItem('auth', JSON.stringify(data));

    return data;
    },
    async register(email, password, repeatPassword) {

        let data = await request.post(endpoints.register, {
            email,
            password,
            repeatPassword
        })
        if(password != repeatPassword) {
            return;
        }

        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    },
    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));
            return {
                isAutheticated: Boolean(data.idToken),
                email: data.email,
                idToken: data.idToken
            }
        } catch (error) {
            return {
                isAutheticated: false,
                email: ''
            }
        }
       
    },
    logout() {
        localStorage.setItem('auth', '')
    }
}