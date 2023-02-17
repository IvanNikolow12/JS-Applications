import {html, render} from '../node_modules/lit-html/lit-html.js';


export default ({
    navigationHandler,
    _id,
    title,
    category,
    imageUrl,
}) => {
    return html `
            <div class="allGames" @click=${navigationHandler}>
                <div class="allGames-info">
                    <img src="${imageUrl}">
                    <h6>${category}</h6>
                    <h2>${title}</h2>
                    <a href="/details/${_id}" class="details-button">Details</a>
                </div>
            </div>
`
}