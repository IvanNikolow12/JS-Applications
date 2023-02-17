import authService from "./authService.js";
import request from "./request.js";

const baseUrl = `https://online-books-9ec12-default-rtdb.europe-west1.firebasedatabase.app`
const albumUrl = `${baseUrl}/books`;

const urlBuilder = (resoure) => {
    return `${baseUrl}/${resoure}.json?auth=${authService.getData().idToken}`
}

export default {
    async create(title, description, imageUrl, type) {
        let data = request.post(urlBuilder('books'), {
            title,
            description, 
            imageUrl,
            type
        });
        return data
    },
    async getAll() {
        try {
            let books = await request.get(urlBuilder('books'));
            return Object.keys(books).map(key => ({_id: key, ...books[key]}))
        } 
        catch (err) {
            return null;
        }
    },
    async getOne(params) {
        let detail = await request.get(`${urlBuilder('books/' + params.id)}`);
        return {detail, gameId: params.id};
    },
    async edit(id, {title, description, imageUrl, type}) {
  
        let data = request.put(`${urlBuilder('books/' + id)}`, {
            id,
            title,
            description,
            imageUrl,
            type
        });
        return data;
    }
}

