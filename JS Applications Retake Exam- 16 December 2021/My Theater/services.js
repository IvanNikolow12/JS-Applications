const apiKey = `AIzaSyAJYB1BhpsBImZGnVE7648HO9eWkHCRjWw`;

const endPoints = {
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    baseUrl: `https://new-theater-default-rtdb.europe-west1.firebasedatabase.app`
}

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
        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    },

    async register(email, password, repeatPassword){
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
            let data = JSON.parse(localStorage.getItem('auth'));
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
        localStorage.setItem('auth', '')
    }
}

const theaterSevrice = {
    async addTheater(title, date, author, description, imageUrl) {
        let response = await fetch(`${endPoints.baseUrl}/theaters.json`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                date,
                author,
                description,
                imageUrl
            })
        })
        let data = await response.json();

        return data;
    },
    async getAll() {
        try {let response = await fetch(`${endPoints.baseUrl}/theaters.json`,{
            method: 'GET'
        })
        let theater = await response.json();
        return Object.keys(theater).map(key => ({key, ...theater[key]}));
    } catch (err) {
        // console.log(err.message)
        return null
    }
    },
    async getOne(id) {
        let response = await fetch(`${endPoints.baseUrl}/theaters/${id}.json`, {
            method: 'GET'
        })
        let detail = await response.json();
        return detail;
    },
    async editTheater(id, {title, date, author, description, imageUrl}) {
        let response = await fetch(`${endPoints.baseUrl}/theaters/${id}.json`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify({
                id,
                title,
                date,
                author,
                description,
                imageUrl
            })
        })
        let result = await response.json();
        return result;
    },
    async deleteTheater(id) {
        let response = await fetch(`${endPoints.baseUrl}/theaters/${id}.json`, {
            method: 'DELETE'
        })
        return response;
    }
}