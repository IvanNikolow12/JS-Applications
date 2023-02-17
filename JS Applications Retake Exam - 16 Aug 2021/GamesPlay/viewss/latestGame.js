import { html } from "../node_modules/lit-html/lit-html.js";

export default ({
    params,
    gameData,
    ...props
}) => {

     return html`
        <div class="game">
            <div class="data">
                <img src="${props.imageUrl}">
            </div>
            <h3>${props.title}</h3>
            <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div class="data-buttons">
                <a href="/details/${props._id}" class="btn details-btn">Details</a>
            </div>
        </div>
        `
}