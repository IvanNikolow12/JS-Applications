import { html } from "../node_modules/lit-html/lit-html.js";

export default ({
    navigationHandler,
    _id,
    title,
    imageUrl,
    type
}) => html `
    <li class="otherBooks">
        <h3>${title}</h3>
        <p>Type: ${type}</p>
        <p class="img"><img src="${imageUrl}"></p>
        <a class="button" href="/details/${_id}"  @click=${navigationHandler}>Details</a>
    </li>
` 