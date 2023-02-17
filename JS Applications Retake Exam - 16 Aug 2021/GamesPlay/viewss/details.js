import { onDeleteSubmit } from '../src/eventListeners.js';
import {html, render} from '../node_modules/lit-html/lit-html.js';

export default ({
    navigationHandler,
    gameData,
    ...props
}) => {
    // console.log(props.data.detail)
return html `
        <!--Details Page-->
        <section id="game-details" @click=${navigationHandler}>
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${gameData.detail.imageUrl}" />
                    <h1>${gameData.detail.title}</h1>
                    <span class="levels">MaxLevel: ${gameData.detail.maxLevel}</span>
                    <p class="type">${gameData.detail.category}</p>
                </div>

                <p class="text">
                    ${gameData.detail.summary}
                </p>
                
                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                    <a href="/edit/${props.data.gameId}" class="button">Edit</a>
                    <a href="#" class="button" @click=${(event) => onDeleteSubmit(event, gameData.gameId)}>Delete</a>
                </div>
            </div>
        </section>
`}