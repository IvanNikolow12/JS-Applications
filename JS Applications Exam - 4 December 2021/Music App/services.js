
const apiKey = `AIzaSyBKRfBr7VaAwyJMEa2T-WXoTiB0jiZdtdg`

const endPoints = {
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
}

const baseUrl = `https://my-music-app-63db4-default-rtdb.europe-west1.firebasedatabase.app`

const authService = {
    async login(email, password) {
        let response = await fetch(endPoints.login, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        let data = await response.json();
        console.log(data.email)
        localStorage.setItem('auth', JSON.stringify(data))
        return data;
    },
    async register(email, password, repeatPassword) {
        let response = await fetch(endPoints.register, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                repeatPassword
            })
        })
        let data = await response.json();
        localStorage.setItem('auth', JSON.stringify(data));
        return data;
    },
    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'))
            return {
                 isAutheticated: Boolean(data.idToken),
                 email: data.email || ''
            }
        } catch(err) {
            return {
                isAutheticated: false,
                email: ''
            }
        }
    },
    logout() {
        localStorage.setItem('auth', '');
    }
}

const musicService = {
    async addAlbum(name, imgUrl, price, releaseDate, artist, genre, description) {
        let response = await fetch(`${baseUrl}/albums.json`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                imgUrl,
                price,
                releaseDate,
                artist,
                genre,
                description
            })
        })
        let data = await response.json();
        return data;
    },
    async getAll() {
        try {
            let response = await fetch(`${baseUrl}/albums.json`, {
            method: 'GET',
            })
            let album = await response.json();
            return Object.keys(album).map(key => ({key, ...album[key]}));
        } 
        catch (err) {
            return null;
        }
    },
    async getOne(id) {
        let response = await fetch(`${baseUrl}/albums/${id}.json`,{
            method: 'GET',
        })
        let detail = await response.json()
        return detail;
    },
    async editAlbum(id, {name, imgUrl, price, releaseDate, artist, genre, description}) {
        let response = await fetch(`${baseUrl}/albums/${id}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name,
                imgUrl,
                price,
                releaseDate,
                artist,
                genre,
                description
            })
        })
        let result = await response.json()
        return result
    },
    async deleteAlbum(id) {
        let response = await fetch(`${baseUrl}/albums/${id}.json`, {
            method: 'DELETE'
        })
        return response;
    }
}