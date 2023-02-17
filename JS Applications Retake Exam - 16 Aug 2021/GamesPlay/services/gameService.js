import request from "./request.js";
import authService from "./authService.js";

const baseUrl = `https://game-world-a66a1-default-rtdb.europe-west1.firebasedatabase.app`

const albumsUrl = `${baseUrl}/games`

const allCreatedGames = []   //array with all created games ID's using for nested fetch request for home page (need the last 3 added Games)

const urlBuilder = (resource) => {
    return `${baseUrl}/${resource}.json?auth=${authService.getData().idToken}`
}



export default {
    async create(title, category, maxLevel, imageUrl, summary) {
        let data = await request.post(urlBuilder('games'), 
            {
                title,
                category,
                maxLevel,
                imageUrl,
                summary
            });
            allCreatedGames.push(data)
            // console.log(allCreatedGames)
    return data;
    },
    async edit(id, {title, category, maxLevel, imageUrl, summary}) {

        let data = await request.put(urlBuilder('games/' + id), {
            id,
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        })

        return data;
    },
    async getAll() {
        try {
            let games = await request.get(urlBuilder('games'));
  
            return Object.entries(games).map(([k, v]) => Object.assign({_id: k}, v));
        } catch(err) {
            console.log(err.message)
            return [];
        }
    },
    async getOne(params) {
            let detail = await request.get(urlBuilder('games/' + params.id))

            return {detail, gameId: params.id};
    },
   async deleteGame(id) {
        let game = await request.delete(urlBuilder('games/' + id))
        return game;
   }
}